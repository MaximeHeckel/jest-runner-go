// eslint-disable-next-line import/no-extraneous-dependencies
const execa = require('execa');
const path = require('path');

const normalize = output => {
  return output
    .replace(/\(?\d*\.?\d+m?s\)?/g, '')
    .replace(/, estimated/g, '')
    .replace(new RegExp('github.com', 'g'), 'mockedpath')
    .replace(/(mockedpath)\/([[A-Z])\w+/g, 'project')
    .replace(new RegExp('Time:','g'), '')
    .replace(new RegExp('.*at .*\\n', 'g'), 'mocked-stack-trace')
    .replace(/.*at .*\\n/g, 'mocked-stack-trace')
    .replace(/(mocked-stack-trace)+/, '      at mocked-stack-trace')
    .replace(/\s+\n/g, '\n');
}

const run = (project, options = []) => {
  return execa(
    'jest',
    [
      '--useStderr',
      '--no-watchman',
      '--no-cache',
      '--projects',
      path.join(__dirname, 'fixtures', project),
    ].concat(options),
    {
      env: process.env,
    },
  ).then(({ stderr }) => normalize(stderr))
  .catch(({ stderr }) => normalize(stderr));
}

module.exports = run;
