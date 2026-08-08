#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const docs = [
  'README.md',
  'GO_TO_MARKET.md',
  'DEPLOYMENT_GUIDE.md',
  'CONTRIBUTING.md',
  'index.html',
];

const requiredPatternsByFile = {
  'README.md': [
    { pattern: /^##\s+Research engine and suggestions$/m, description: 'Research engine and suggestions section heading' },
    { pattern: /^##\s+Assets inventory$/m, description: 'Assets inventory section heading' },
    { pattern: /^##\s+Artifacts inventory$/m, description: 'Artifacts inventory section heading' },
    { pattern: /^##\s+Contributing$/m, description: 'Contributing section heading' },
  ],
  'index.html': [
    { pattern: /data-s2m-section="research-engine"/, description: 'research-engine website marker' },
    { pattern: /data-s2m-section="assets-inventory"/, description: 'assets-inventory website marker' },
    { pattern: /data-s2m-section="artifacts-inventory"/, description: 'artifacts-inventory website marker' },
    { pattern: /blob\/master\//, description: 'default-branch master links' },
  ],
  'CONTRIBUTING.md': [
    { pattern: /Review jury/i, description: 'review jury documentation' },
  ],
};

for (const doc of docs) {
  const full = path.join(root, doc);
  let content;
  try {
    content = fs.readFileSync(full, 'utf8');
  } catch (error) {
    console.error(`Build validation failed: could not read ${doc}.`);
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
  if (!content.trim()) {
    console.error(`Build validation failed: ${doc} is empty.`);
    process.exit(1);
  }

  const requiredPatterns = requiredPatternsByFile[doc] || [];
  const missingPatterns = requiredPatterns.filter(({ pattern }) => !pattern.test(content));
  if (missingPatterns.length) {
    const missingDescriptions = missingPatterns.map(({ description }) => description);
    console.error(`Build validation failed: ${doc} is missing required section(s): ${missingDescriptions.join(', ')}`);
    process.exit(1);
  }
}

console.log('Build baseline passed. Core docs, website sections, and review-jury docs are present.');
