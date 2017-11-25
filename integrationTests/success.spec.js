const run = require('./run');

it('Works when it has passing tests', () =>
  expect(run('success')).resolves.toMatchSnapshot());
