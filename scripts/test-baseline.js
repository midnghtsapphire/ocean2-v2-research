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

let missing = [];
try {
  missing = requiredFiles.filter((file) => !fs.existsSync(file));
} catch (error) {
  console.error('Unable to validate required files due to a filesystem error.');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

if (missing.length > 0) {
  console.error('Missing required files:');
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log('Baseline tests passed. Required documentation files are present.');
