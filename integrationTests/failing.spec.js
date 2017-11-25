const run = require('./run');

it('Works when it has failing tests', () =>
  expect(run('failing')).resolves.toMatchSnapshot());
