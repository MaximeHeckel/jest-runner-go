[![Build Status](https://travis-ci.org/MaximeHeckel/jest-runner-go.svg?branch=master)](https://travis-ci.org/MaximeHeckel/jest-runner-go) [![npm version](https://badge.fury.io/js/jest-runner-go.svg)](https://badge.fury.io/js/jest-runner-go)

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

Install `jest` version 21 or above and `jest-runner-go`:

With `Yarn`

```bash

yarn add -D jest jest-runner-go
```


With `NPM`

```bash
npm install --save-dev jest jest-runner-go
```

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

Or to your `jest.config.js`
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

If you want to test your development version of `jest-runner-go` on another project do the following:

1. In the `jest-runner-go`folder run `yarn build && yarn link`
2. In your other projects run `yarn link jest-runner-go`

Your project will now use your local `jest-runner-go`.


### Known issues

#### Duplicated test failure (minor)

When a package contains multiple tests files, if one of them is failing, the error is reported multiple times, (as many times as their are test files in the package).
This is due to a conflict between the way Jest and Go define what a failing test is and how they report it: for Jest it's per file, for Go per package.

```bash

$ jest
 PASS  github.com/MaximeHeckel/go-test-runner/example/stringutil
 FAIL  github.com/MaximeHeckel/go-test-runner/example/stringutil2
  reverse3_test.go:15: Got dlro ,olleH expected dlrow ,olleH
 FAIL  github.com/MaximeHeckel/go-test-runner/example/stringutil2
  reverse3_test.go:15: Got dlro ,olleH expected dlrow ,olleH
Test Suites: 2 failed, 1 passed, 3 total
Tests:       2 failed, 1 passed, 3 total
Snapshots:   0 total
Time:        0.5s, estimated 1s
Ran all test suites.
error Command failed with exit code 1.
```

