const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;

const displayToolDocPath = require.resolve("@talentsoft-opensource/widget-display-tool/readme.md");
const hostApiPath = require.resolve("@talentsoft-opensource/integration-widget-contract/dist/doc/readme.md");

const destination = __dirname + '/doc';

rimraf.sync(destination);
fs.mkdirSync(destination);

fs.copyFile(displayToolDocPath, destination +'/display-tool.md', (err) => {
  if (err) throw err;
  console.log('display tool doc copied');
});

const hostApiDestination = destination + '/hostApi';
fs.mkdirSync(hostApiDestination)
ncp(path.dirname(hostApiPath), hostApiDestination, (err) => {
    if (err) throw err;
    console.log('host api doc copied');
});
