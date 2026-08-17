#!/usr/bin/env python3
"""Publish research artifacts to Zenodo (sandbox by default).

Secret hygiene: prefer --token-stdin or ZENODO_TOKEN env. Do not pass live
tokens on argv (they leak via ps /proc and shell history).
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

import requests


class ZenodoAutoPublisher:
    def __init__(self, access_token: str, sandbox: bool = True) -> None:
        self.access_token = access_token
        self.base_url = (
            "https://sandbox.zenodo.org/api" if sandbox else "https://zenodo.org/api"
        )
        self.headers = {"Content-Type": "application/json"}
        self.params = {"access_token": self.access_token}

    def create_deposit(self):
        """Create a new deposition resource."""
        url = f"{self.base_url}/deposit/depositions"
        response = requests.post(url, params=self.params, json={}, headers=self.headers)
        if response.status_code == 201:
            return response.json()
        print(f"Error creating deposit: {response.status_code} - {response.text}")
        return None

    def upload_file(self, bucket_url: str, file_path: str):
        """Upload a file to the deposition bucket."""
        filename = os.path.basename(file_path)
        url = f"{bucket_url}/{filename}"
        with open(file_path, "rb") as fp:
            response = requests.put(url, data=fp, params=self.params)
        if response.status_code in (200, 201):
            print(f"Successfully uploaded {filename}")
            return response.json()
        print(f"Error uploading {filename}: {response.status_code} - {response.text}")
        return None

    def update_metadata(self, deposition_id, metadata):
        """Update the metadata for the deposition."""
        url = f"{self.base_url}/deposit/depositions/{deposition_id}"
        data = {"metadata": metadata}
        response = requests.put(
            url, params=self.params, data=json.dumps(data), headers=self.headers
        )
        if response.status_code == 200:
            print("Successfully updated metadata")
            return response.json()
        print(f"Error updating metadata: {response.status_code} - {response.text}")
        return None

    def publish(self, deposition_id):
        """Publish the deposition."""
        url = f"{self.base_url}/deposit/depositions/{deposition_id}/actions/publish"
        response = requests.post(url, params=self.params)
        if response.status_code == 202:
            print("Successfully published deposition")
            return response.json()
        print(f"Error publishing: {response.status_code} - {response.text}")
        return None


def resolve_token(args) -> str:
    """Resolve token from stdin, env, or optional argv (discouraged)."""
    if args.token_stdin:
        token = sys.stdin.read().strip()
        if token:
            return token
        raise SystemExit("No token received on stdin for --token-stdin.")
    env_token = os.environ.get("ZENODO_TOKEN", "").strip()
    if env_token:
        return env_token
    if args.token:
        print(
            "WARNING: passing --token on argv can leak via process listings. "
            "Prefer --token-stdin or ZENODO_TOKEN.",
            file=sys.stderr,
        )
        return args.token
    raise SystemExit(
        "Zenodo token required. Use --token-stdin, set ZENODO_TOKEN, or (discouraged) --token."
    )


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description="Auto-publish documents to Zenodo")
    parser.add_argument(
        "--token",
        required=False,
        help="(Discouraged) Zenodo API token on argv — prefer --token-stdin or ZENODO_TOKEN",
    )
    parser.add_argument(
        "--token-stdin",
        action="store_true",
        help="Read Zenodo API token from stdin (recommended)",
    )
    parser.add_argument("--file", required=True, help="Path to the main file to upload")
    parser.add_argument("--supp", nargs="*", help="Supplementary files to upload")
    parser.add_argument("--title", required=True, help="Title of the publication")
    parser.add_argument("--description", required=True, help="Description/Abstract")
    parser.add_argument(
        "--author", default="Audrey Walter-Evans", help="Author name (Family, Given)"
    )
    parser.add_argument(
        "--orcid", default="0009-0005-0663-7832", help="Author ORCID"
    )
    parser.add_argument("--keywords", nargs="*", help="Keywords")
    parser.add_argument(
        "--type", default="publication", help="Upload type (publication, poster, image, etc.)"
    )
    parser.add_argument(
        "--subtype",
        default="preprint",
        help="Publication subtype (preprint, article, report, etc.)",
    )
    parser.add_argument(
        "--live", action="store_true", help="Use live Zenodo instead of sandbox"
    )
    parser.add_argument(
        "--yes",
        action="store_true",
        help="Publish without interactive confirmation",
    )
    args = parser.parse_args(argv)

    if not Path(args.file).is_file():
        print(f"Main file not found: {args.file}", file=sys.stderr)
        return 1

    token = resolve_token(args)
    publisher = ZenodoAutoPublisher(token, sandbox=not args.live)

    print(f"Starting publication process for: {args.title}")
    deposit = publisher.create_deposit()
    if not deposit:
        return 1

    dep_id = deposit["id"]
    bucket_url = deposit["links"]["bucket"]

    publisher.upload_file(bucket_url, args.file)
    if args.supp:
        for s_file in args.supp:
            publisher.upload_file(bucket_url, s_file)

    metadata = {
        "title": args.title,
        "upload_type": args.type,
        "description": args.description,
        "creators": [{"name": args.author, "orcid": args.orcid}],
        "access_right": "open",
        "license": "cc-by-4.0",
    }
    if args.type == "publication":
        metadata["publication_type"] = args.subtype
    if args.keywords:
        metadata["keywords"] = args.keywords

    publisher.update_metadata(dep_id, metadata)

    print("Ready to publish. Note: Once published, it cannot be deleted.")
    if args.yes:
        confirm = "y"
    else:
        confirm = input("Publish now? (y/n): ")
    if confirm.lower() == "y":
        publisher.publish(dep_id)
    else:
        print(f"Draft saved at ID: {dep_id}. You can publish it manually later.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
