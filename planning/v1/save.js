/* eslint-disable */

const fs = require('fs');

function writeMMD(inputname, outputname) {
  const file = fs.readFileSync(inputname, 'utf8');
  const start = file.indexOf('<div class="mermaid">') + '<div class="mermaid">'.length;
  const end = file.indexOf('</div>');
  const output = file.slice(start, end);
  // out = output.trim();
  fs.writeFileSync(outputname, output);
}
writeMMD('flow.html', 'flow.mmd');
writeMMD('collectionRelationship.html', 'collectionRelationship.mmd');
