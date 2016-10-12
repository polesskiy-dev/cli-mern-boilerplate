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
  delete pkg.repository;

  return (
    askName()
      .then((name)=> pkg.author.name = name)
      .then(askEmail)
      .then((email)=>pkg.author.email = email)
      .then(askLooksPretty)
      //if answer not "yes" or empty - start init from beginning
      .then((answer)=>(answer.trim() === 'yes' || '\r' ? '' : init(appName)))
      .then(()=> {
        rl.close();
        process.stdin.destroy();
        console.log(pkg);
      })
      .then(()=>copyDirRecursively(boilerplateLink, destinationFolder, /^package.json$|^node_modules$|^cli$|^.git(?!.*ignore)|^.idea/))
      .then(()=>fs.writeFile(destinationFolder + '/package.json', JSON.stringify(pkg, null, ' ')))
  )
}

/**
 * Copy dir recursively
 *
 * @param {string} src - source folder
 * @param {string} dest - destination folder
 * @param {RegExp} filter - ignore this names
 */
function copyDirRecursively(src, dest, filter) {
  /** remove destination directory if exists and creates new one*/
  try {
    fs.accessSync(dest);
    fs.rmdirSync(dest);
    fs.mkdirSync(dest);
  } catch (e) {
    fs.mkdirSync(dest);
  }

  //obtain all file names from src directory
  const fileNames = fs.readdirSync(src);

  /** iterate through all files and folders in src dir */
  for (const fileName of fileNames) {
    if (filter instanceof RegExp && !filter.test(fileName)) {
      const filePath = src + '/' + fileName;
      const isFile = fs.statSync(filePath).isFile();

      console.log(`Copying ${isFile ? "file" : "dir"} ${fileName} to ${dest}`);

      if (isFile)
        fs.createReadStream(filePath).pipe(fs.createWriteStream(dest + '/' + fileName));
      else
        copyDirRecursively(filePath, dest + '/' + fileName, filter)
    }
  }
}




