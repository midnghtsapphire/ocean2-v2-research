const fs = require('fs');

const docs = [
  'README.md',
  'GO_TO_MARKET.md',
  'DEPLOYMENT_GUIDE.md'
];

for (const doc of docs) {
  const content = fs.readFileSync(doc, 'utf8');
  if (!content.trim()) {
    console.error(`Build validation failed: ${doc} is empty.`);
    process.exit(1);
  }
}

console.log('Build baseline passed. Core docs are non-empty.');
