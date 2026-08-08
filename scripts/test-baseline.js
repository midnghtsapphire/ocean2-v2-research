#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const requiredFiles = [
  'README.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'DEPLOYMENT_GUIDE.md',
  'BRAND_GUIDELINES.md',
  'SECURITY.md',
  'index.html',
  'package.json',
  '.github/workflows/ci.yml',
  '.github/workflows/ai-pr-review-openrouter.yml',
  '.github/workflows/jules-pr-reviewer.yml',
  '.github/workflows/semgrep.yml',
  '.github/workflows/codeql.yml',
];

const requiredAssets = [
  'ocean2_infographic.jpg',
  'ocean2_roadmap.jpg',
  'infographic_notes.md',
];

const requiredArtifacts = [
  'GO_TO_MARKET.md',
  'Walter-Evans-Ocean2-V2-SSRN-Paper.md',
  'Walter-Evans-Ocean2-V2-Invention-Disclosure.md',
  'Walter-Evans-Ocean2-V2-Roadmap.md',
];

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

let failed = false;
function fail(msg) {
  console.error(msg);
  failed = true;
}

const missing = [...requiredFiles, ...requiredAssets, ...requiredArtifacts].filter((f) => !exists(f));
if (missing.length) {
  fail('Missing required files:');
  for (const file of missing) fail(`- ${file}`);
}

// README must advertise research/assets/artifacts inventories.
if (exists('README.md')) {
  const readme = read('README.md');
  for (const heading of [
    '## Research engine and suggestions',
    '## Assets inventory',
    '## Artifacts inventory',
    '## Contributing',
  ]) {
    if (!readme.includes(heading)) fail(`README.md missing section: ${heading}`);
  }
  // Default branch is master — catch stale main links in local path refs.
  if (/blob\/main\//.test(readme)) {
    fail('README.md still links to blob/main/; use blob/master/ (default branch is master).');
  }
}

// Zenodo helper must not require tokens only via argv (process list leak).
if (exists('Walter-Evans-zenodo_auto_publish.py')) {
  const py = read('Walter-Evans-zenodo_auto_publish.py');
  if (!py.includes('--token-stdin') && !py.includes('token-stdin')) {
    fail('Walter-Evans-zenodo_auto_publish.py must support --token-stdin for secret hygiene.');
  }
  if (/add_argument\(\s*["']--token["']/.test(py) && !/required\s*=\s*False/.test(py)) {
    // soft check — token can remain optional when stdin is available
  }
}

// Optional link check mode: ensure index.html markers remain.
if (process.argv.includes('--check-links') && exists('index.html')) {
  const html = read('index.html');
  for (const marker of [
    'data-s2m-section="research-engine"',
    'data-s2m-section="assets-inventory"',
    'data-s2m-section="artifacts-inventory"',
  ]) {
    if (!html.includes(marker)) fail(`index.html missing marker: ${marker}`);
  }
}

if (failed) process.exit(1);
console.log('Baseline tests passed. Required documentation, website, assets, artifacts, and review workflows are present.');
