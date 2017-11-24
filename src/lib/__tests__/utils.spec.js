import {
  parseGoOutput,
  toTestResult,
  pathContainsFailedTest,
} from '../utils';


const path = 'github.com/MaximeHeckel/go-test-runner/example/stringutil';
const testFile1 = 'github.com/MaximeHeckel/go-test-runner/example/stringutil2/reverse3_test.go';
const testFile2 = 'github.com/MaximeHeckel/go-test-runner/example/stringutil2/reverse2_test.go';
const mockedOutputLine = '      reverse3_test.go:14:failed test'
const start = 1510292283895;
const output = [ 'ok  \tgithub.com/MaximeHeckel/go-test-runner/example/stringutil\t0.007s','' ];

const test = {
  passed: 1,
  failed: 0,
  failureMessage: '',
  duration: 336,
  end: 1510292594284,
  name: 'github.com/MaximeHeckel/go-test-runner/example/stringutil2',
}

describe('parseGoOutput', () => {
  it('parses the golang test output accordingly', () => {
    expect(parseGoOutput(path, start, output)).toMatchSnapshot();
  });
});

describe('toTestResult', () => {
  it('returns a properly formatted test result', () => {
    expect(toTestResult(test)).toMatchSnapshot();
  });
});

describe('pathContainsFailedTest', () => {
  it('returns true when the line contains the file name present in the relative path of the test file', () => {
    expect(pathContainsFailedTest(mockedOutputLine, testFile1)).toBe(true);
  });

  it('returns false when the line doesn\'t contain the file name present in the relative path of the test file', () => {
    expect(pathContainsFailedTest(mockedOutputLine, testFile2)).toBe(false);
  });
});