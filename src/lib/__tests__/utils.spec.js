import {
  parseGoOutput,
  toTestResult,
} from '../utils';


const path = 'github.com/MaximeHeckel/go-test-runner/example/stringutil';
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