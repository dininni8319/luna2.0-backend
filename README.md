<h1>Express setup with typescript</h1><br/>

mkdir node-express-typescript<br/>

cd node-express-typescript/ <br/>

sudo npm install -g typescript ---> if you dont have typescript installed run this command<br/>

tsc --init ---> initialize an env with typescript with a tsconfig.json file<br />
Uncomment these lines <br/>
"rootDir": "./src", <br/>                                
"moduleResolution": "node",<br/>   
"outDir": "./dist",  <br/>

pnpm install express ts-node ---> typescript enviromnet<br/> 

pnpm run build --> to compile typescript code run this command<br/> 

<h3>Add into the "devDependencies":</h3>
pnpm i -D nodemon @types/express typescript<br/>

The <b>-D</b>flag, also known as the --dev flag, is a specification for the package manager to install these libraries as devDependencies.<br/>
<h3>Generating tsconfig.json</h3><br/>
 --->>> The command above will generate a new <br/>file called tsconfig.json with the following default compiler options:<br/>
target: es2016<br/>
module: commonjs<br/>
strict: true<br/>
esModuleInterop: true<br/>
skipLibCheck: true<br/>
forceConsistentCasingInFileNames: true<br/>