<h1>Express setup with typescript</h1><br/>

mkdir node-express-typescript<br/>

cd node-express-typescript/ <br/>

sudo npm install -g typescript ---> if you dont have typescript installed run this command<br/>

tsc --init ---> initialize an env with typescript with a tsconfig.json file<br />
Uncomment these lines <br/>
"rootDir": "./src", <br/>                                
"moduleResolution": "node",<br/>   
"outDir": "./dist",  <br/>

pnpm install express ts-node ---> typescript environment<br/> 

pnpm run dev<br /> run environment
pnpm run build --> to compile typescript code run this command<br/> 

<h3>Add into the "devDependencies":</h3>
pnpm i -D nodemon @types/express typescript<br/>

packages: <br/>
pnpm i express body-parser cors dotenv helmet morgan mongoose nodemailer jsonwebtoken<br>

<h2>Install Types for the packages above</h2><br/><br/>

pnpm install --save-dev @types/body-parser @types/morgan @types/cors @types/helmet @types/mongoose @types/nodemailer @types/jsonwebtoken<br/>

The <b>-D</b>flag, also known as the --dev flag, is a specification for the package manager to install these libraries as devDependencies.<br/>


<h3>Cloudenery Installations:</h3>
- pnpm install cloudinary <br/>
