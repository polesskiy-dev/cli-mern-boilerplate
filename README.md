# cli-mern-boilerplate

[![Build Status](https://travis-ci.org/polesskiy-dev/mern-boilerplate.svg?branch=master)](https://travis-ci.org/polesskiy-dev/mern-boilerplate)

This is a MERN scaffolding cli boilerplate app(MongoDB, Express, React-Redux and Node.js) based on Express app skeleton. Helps you to quick start MERN project with deploy scripts, tests and code quality control.

## Quickstart

    $ sudo npm install @polesskiy/cli-mern-boilerplate -g
    $ cli-mern-boilerplate init -n --name <name of yor project>
    $ cd <name of yor project>
    $ npm install
    $ npm run start:dev
    $ start localhost:3000

## CLI commands

    #see help
    $ cli-mern-boilerplate -h --help
     
    #init your project in the current directory 
    $ cli-mern-boilerplate init --name <name of yor project>
    
## Available result app commands
    
    1. npm start - starts server by pm2 (for production)    
    2. npm stop - stop server by pm2 (for production)   
    3. npm run logs - see pm2 logs (for production)
    4. npm run start:dev - build client and run server with HMR    
    5. npm run start:server - starts server    
    6. npm run build:client - build client, pack js and css to separate files to public/bundle
    7. npm run build:client:production - same as build:client but minifies result
    8. npm run test:client - test client by karma runner
    9. npm run test:server - test server by mocha
    10. npm run docs:client - generate client code jsdoc
    11. npm run docs:server - generate server code jsdoc
    12. npm test - runs server and client test
    
## Stack        

| Server   	| Client        	| Test      	| Build             	| Code quality         	|
|----------	|---------------	|-----------	|-------------------	|----------------------	|
| nodejs   	| react         	| mocha     	| docker            	| eslint               	|
| express  	| redux         	| karma     	| pm2               	| editorconfig         	|
| mongodb  	| redux-saga    	| chai      	| babel             	| babel-preset-airbnb  	|
| mongoose 	| redux-actions 	| enzyme    	| travis            	| eslint-config-airbnb 	|
| winston   | router        	| supertest 	| webpack           	|                      	|
|          	| immutable     	| phantomjs 	| hmr               	|                      	|
|          	| less          	|           	| ExtractTextPlugin 	|                      	|
|          	|               	|           	| UglifyJsPlugin    	|                      	|

### Add code style to Webstorm

[https://www.jetbrains.com/help/webstorm/2016.2/copying-code-style-settings.html](https://www.jetbrains.com/help/webstorm/2016.2/copying-code-style-settings.html) 
 
### Docker reference

    #build all by Dockerfile instructions image named as "username/appname"
    $ docker build -t username/appname .
    
    #run on 3000 port to internal 3000 port with name "appname"     
    $ docker run -name appname -p 8080:3000 username/appname
    
    #stop docker process
    $ docker stop appname
    
    #save image to tarball
    $ docker save username/appname:my_latest > todo-table-redux-saga.tar.gz
    
    #load image
    $ docker load < todo-table-redux-saga.tar.gz
     
     


