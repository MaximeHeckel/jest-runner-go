const run = require('./run');

it('Works when it has failing tests', () => {
  return expect(run('failing')).resolves.toMatchSnapshot();
});