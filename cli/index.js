#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const program = require('commander');
let pkg = require('../package.json');
const boilerplateLink = "/usr/local/lib/node_modules/" + Object.keys(pkg.bin)[0];

/** init node readline*/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "cli-mern-boilerplate: "
});

const askName = ()=> new Promise((resolve)=> rl.question("What's your name? ", answer => resolve(answer)));
const askEmail = ()=> new Promise((resolve)=> rl.question("What's your email? ", answer => resolve(answer)));
const askGit = ()=> new Promise((resolve)=> rl.question("What's your git url? ", answer => resolve(answer)));
const askLooksPretty = ()=> new Promise((resolve)=> rl.question(JSON.stringify(pkg, null, " ") + "\r\nIs it looks pretty Yes/no?", answer => resolve(answer)));

/**
 * Add CLI arguments
 */
program
  .command('init [directory]')
  .option('-n, --name', 'Create application with name')
  .action(init);

program
  .parse(process.argv); // end with parse to parse through the input

/**
 * Init app in directory appName
 *
 * @param appName
 * @returns {Promise.<TResult>}
 */
function init(appName) {
  const destinationFolder = `${path.resolve()}/${appName}/`;
  console.log("MERN boilerplate will be initialized in directory: %s", destinationFolder);
  pkg.name = appName;

  // return askName()
  //   .then((name)=> pkg.author.name = name)
  //   .then(askEmail)
  //   .then((email)=>pkg.author.email = email)
  //   .then(askGit)
  //   .then((git)=>pkg.repository.url = git)
  //   .then(askLooksPretty)
  //   //if answer not "yes" or empty - start init from beginning
  //   .then((answer)=>(answer.trim() === 'yes' || '\r' ? '' : init(appName)))
  //   .then(()=> {
  //     rl.close();
  //     process.stdin.destroy();
  //     console.log(pkg);
  //   })
  //   .then(()=>copyDirRecursively(destinationFolder))

  copyDirRecursively(boilerplateLink, destinationFolder)
}

function copyDirRecursively(src, dest, filter) {
  fs.rmdirSync(dest);
  fs.mkdirSync(dest);

  const fileNames = fs.readdirSync(src);

  for (const fileName of fileNames) {
    const filePath = src + '/' + fileName;
    const isFile = fs.statSync(filePath).isFile();
    console.log(`Copying ${isFile ? "file" : "dir"} ${fileName} to ${dest}`);

    if (!isFile) copyDirRecursively(filePath, dest + '/' + fileName)
  }

  // var exists = fs.existsSync(src);

  //console.log("Destination folder: %s", destinationFolder);

  // fs.createReadStream(boilerplateLink, {flags: 'r'}).pipe(fs.createWriteStream(destinationFolder));
}




