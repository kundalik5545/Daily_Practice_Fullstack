# Setup Backend

## Create project run this

```
npm init .
```

Choose options to create package.json file

## Create src, Public folders

```
mkdir src, public
```

## Now run this to install dependencies

```
 npm i express mongoose dotenv cors cookie-parser bcryptjs jsonwebtoken
```

### Now run this to install Dev-dependencies

```
npm i -D nodemon prettier
```

## Update package.json

Add above main

```
  "type": "module",
```

Add inside script

```
  "scripts": {
    "server": "nodemon index.js"
  },
```

## package.json will look like this

```
{
  "name": "server",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "server": "nodemon index.js"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.8.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.7",
    "prettier": "^3.3.3"
  }
}
```

## Create app.js and index.js file under src
