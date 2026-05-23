const fs = require('fs');

const requiredFiles = [
  'README.md',
  'CHANGELOG.md',
  'DEPLOYMENT_GUIDE.md',
  'GO_TO_MARKET.md',
  'BRAND_GUIDELINES.md',
  'SECURITY.md',
  'Walter-Evans-Ocean2-V2-SSRN-Paper.md',
  'Walter-Evans-Ocean2-V2-Invention-Disclosure.md',
  'Walter-Evans-Ocean2-V2-Roadmap.md'
];

const missing = requiredFiles.filter((file) => !fs.existsSync(file));

if (missing.length > 0) {
  console.error('Missing required files:');
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log('Baseline tests passed. Required documentation files are present.');
