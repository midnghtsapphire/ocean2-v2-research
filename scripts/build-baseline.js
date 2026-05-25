const fs = require('fs');

const docs = [
  'README.md',
  'GO_TO_MARKET.md',
  'DEPLOYMENT_GUIDE.md',
  'index.html'
];

const requiredPhrasesByFile = {
  'README.md': ['## Research engine and suggestions', '## Assets inventory', '## Artifacts inventory'],
  'index.html': ['Research Engine', 'Assets Inventory', 'Artifacts Inventory']
};

for (const doc of docs) {
  let content;
  try {
    content = fs.readFileSync(doc, 'utf8');
  } catch (error) {
    console.error(`Build validation failed: could not read ${doc}.`);
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
  if (!content.trim()) {
    console.error(`Build validation failed: ${doc} is empty.`);
    process.exit(1);
  }

  const requiredPhrases = requiredPhrasesByFile[doc] || [];
  const missingPhrases = requiredPhrases.filter((phrase) => !content.includes(phrase));
  if (missingPhrases.length > 0) {
    console.error(`Build validation failed: ${doc} is missing required section(s): ${missingPhrases.join(', ')}`);
    process.exit(1);
  }
}

console.log('Build baseline passed. Core docs and website sections are present.');
