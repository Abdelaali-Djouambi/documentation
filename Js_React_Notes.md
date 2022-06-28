# React and javascript notes.

### React :
##### Wrap multiple elements in a single one:
 Every react component needs to return a single html element, for that if dont want to add nesting elements to the tree, we just use the react fragment elements, and  wrap all our elements with a jsx empty tags <> </>
.To
##### Detect if you should create a component:
If items share similar DATA or BEHAVIOR, are condidates to become a component.

##### Unmounting components
In react we can unmount a component, and refresh it by dynamically changing its key property value, so if we want to reset a component, with a new state, the best way to do that is by unmounting the component (updating its key), and its state will be restaured rather than resetting all the state values.

##### Custom hooks
 1. Custom hooks label should start by "use", useGameState for example.
 2. Custom hooks can carry all of a component state
 3. Hooks can't be called inside loops or conditions, we should not define state inside if conditions for example.

##### Side Effects
1. Side effects can be defined within a component (or a custom hook) using the key word useEffect()
2. The instruction(s) inside a side effect are executed when a component is loaded, the instruction(s) in the return statement of a side effect are executed when the side effect is reloaded.
3. Side effects should be cleaned, and the mechanism to clean side effects is by giving it a return statement.
4. If we want to execute the effect hook function only once we add an empty array parameter in addition to the function of the side effect like so:
useEffect(() => {//timer effect instruction}, [])
5. If we want to execute an effect on state change, we can pass the state in the secound array parameter of the side effect like so

```js
function Counter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}
```
and here the effect will trigger each time the state count is updated

### Node + react environement installation:
##### Initializing and Installing main dependencies 
1. Create react app:
We can either npm install create-react-app package and then create our app with the name:
```console
$ npm i -g create-react-app && create-react-app cra-test
```
The better way is to use npx, with npx instead of creating and saving a certain version of the package create-react-app locally, it will use the latest release of the package from the node registry, and we can create a react app using the following command.
The x for npx is for execute, the command executes an npm package, it downloads it and chaches it, and if the next time you execute a new version is available it will use newest version of the package.
```console
$ npx create-react-app cra-test
```

2. package.json
npm init creates package.json file in a directory. This file is used in Nodejs projects to store general information about the project (like its name, version, etc) and track what dependencies the project needs (so that anyone can install them all at once).

3. Express
For a Nodejs web server, one popular option to use is Express. You can use it to serve dynamic content under your web server. (You can also use Express to serve static content, but you should consider using a better option for that, like NGINX or a CDN service.)
```console
$ npm i express
```
4. React and react-dom
These two dependencies are frontend dependencies, both packages are not really needed in production because they get bundled into a single file, if we want to bundle the application in developement and push the bundled files to production, we can install these pacakges as developement dependencies.
```console
$ npm i react react-dom
```
5. Webpack module bundler
Since an application will have code in multiple modules (files) and it will depend on other modules (like react), we need a module bundler to translate all modules into something that can work in the browser. The packages needed to be installed for that are webpack and webpack-cli.
```console
$ npm i webpack webpack-cli
```
```diff
+ The webpack-cli package provides the webpack command, which you can use to bundle your modules. The actual Webpack core code is hosted separately under the webpack packages.
```
6. Babel
Webpack is just a generic module bundler. You need to configure it with loaders to transform code from one state into the other. For example, you need to transform React's JSX code into React's API calls. The tool for that job is Babel. Besides JSX, Babel can also transform modern JavaScript features into code that can be understood in any execution environment. You need to install some presets as well to make all Babel transformations happen.
Here are the 5 packages that you need to make Babel do its magic:
```console
$ npm i babel-loader @babel/core @babel/node @babel/preset-env @babel/preset-react
```
babel preset-env : is for transpiling modern javascript for old browsers
@babel/preset-react: if for transpiling react
The babel-loader package provides the Webpack loader (which we’ll need to configure). The other @babel-scoped libraries are needed to run the Babel configurations for Nodejs and Reactjs.

##### Installing development dependencies
The dependencies that are not needed in production, they need to be tracked seperately, and we can use npm -D install flag to save them under a devDependencies section in package.json.

1. nodemon
When you run a Node server and then change the code of that server, you need to restart Node. 
```console
$ npm i -D nodemon
```
This package will make the nodemon command available in your project. Nodemon runs your Node server in a wrapper process that monitors the main process and automatically restarts it when files are saved to the disk.

2. ESLint
ESLint is a code quality tool and if you don't use it, your code will not be as good as it could be.
Since Babel is part of this stack, we need to configure ESLint to parse through what Babel is going to parse through. We should also use the main recommended ESLint configurations in addition to those recommended for React projects. Here are the packages we need for that:
```console
$ npm i -D eslint babel-eslint eslint-plugin-react eslint-plugin-react-hooks
```
To configure ESLint, you need to add a .eslintrc.js file in the root of the project. This file will naturally depend on your code style preferences, but definitely start it with the recommended configurations and then customize them as needed.
We should also add ESlint plugin to our IDE.
You should also make your editor auto-format code for you on save. Prettier is a great option for that and it works well with ESLint.
```js
module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",

    // You can do more rule customizations here...
  },
};
```
3. Testing: Jest
Jest is one of the best options for testing
```console
$ npm i -D jest babel-jest react-test-renderer
```
4. Initial directories
 . src : where we put our react application and all the other js files including the server files
 . dsit : directory for distribution, when we are ready for distribution, webpack is gonna take the source files and right them in the distribution directory
 . src/component : for all our react components
 . src/server : for our backend files

5. Configuring webpack and babel
To configure babel all we need to do is to add a new file on top of the project named babel.config.js and add the following
```js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
};
```
For configurating webpack, we also need to add a new file on top of the project named webpack.config.js
in this file we will tell webpack to invoke babel for every files with the js extension, and i need babel to run on those files (where on component files for example we have jsx), and compile any modern java script before bundeling our application.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            
          loader: "babel-loader",
        },
      },
    ],
  },
};
```
6. Creating npm scripts for development
after all this configuration we need a way to run webpack commands and also the web server for our application, and for that in the package.json file we need to add things under the scripts, where we can have multiple tasks, like running the webserver, the tests etc.
```json
// In package.json
scripts: {
    "test": "jest",
    "dev:server": "nodemon --exec babel-node src/server/server.js --ignore dist/",
    "dev:bundler": "webpack -w --mode=development"
    //w is for watch, a watch mode for webpack, and mode=development is to generate a developement friendly bundle
}
```
7. Testing the environement
Now we need to run both commands in different terminals:
$ npm run dev:server //

