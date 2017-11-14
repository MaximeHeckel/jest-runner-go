<div align="center">
  <img width="150" height="150" src="https://newrelic.com/assets/pages/golang/go-mascot.svg">
  <a href="https://facebook.github.io/jest/">
	<img width="150" height="150" vspace="" hspace="25" src="https://cdn.worldvectorlogo.com/logos/jest.svg">
  </a>
  <h1>Jest-Runner-Go</h1>
  <p>Go runner for Jest</p>
</div>


<div align="center">
  <img src="https://i.imgur.com/xMJ6Agb.gif">
</div>

## Usage

### Install

Coming soon to NPM

### Add it to your project

Add the following to your `package.json`
```json
"jest": {
	"moduleFileExtensions": [
	  "go"
	],
	"runner": "jest-runner-go",
	"testMatch": [
	  "**/?(*_)test.go"
	]
},
```

Or to your `jest.config.json`
```js
module.exports = {
  runner: 'jest-runner-go',
  moduleFileExtensions: ["go"],
  testMatch: ['**/?(*_)test.go'],
};
```

Then simply run Jest
```
yarn jest
```

### Contribute

1. `git pull git@github.com:MaximeHeckel/jest-runner-go.git` (preferably in your GOPATH if you want to run the examples on your machine)
2. Run `npm install` or `yarn` to install the dependencies of the project
3. To build the project run `yarn build`
4. To run the tests (unit and integration) `yarn test` or
   you can also run them using Docker with the `Dockerfile` provided in this project:
   ```bash
   docker build -t jest-runner-go .
   docker run jest-runner-go
   ```
5. To run the example `cd example && yarn test` or
   you can also run it using Docker by running this command
   ```bash
   docker run -it jest-runner-go sh -c "cd example && yarn test"
   ```

