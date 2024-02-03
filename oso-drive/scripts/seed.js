'use strict';

const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const oso = require('../oso');

main().catch(error => {
  console.error(error);
  process.exit(-1);
});

async function main() {
  const policy = fs.readFileSync('./scripts/main.polar', 'utf8');
  await oso.policy(policy);

  const res = await oso.tell(
    'has_relation',
    { type: 'File', id: 'tps-report.txt' },
    'owner',
    { type: 'User', id: 'Bill' }
  );

  await oso.bulk(
    [['is_public', { type: 'File', id: 'test.txt' }, { type: 'Boolean', id: 'true' }]]
  );

  console.log('Done');
}