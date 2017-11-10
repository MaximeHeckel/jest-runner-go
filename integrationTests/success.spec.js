const run = require('./run');

it('Works when it has passing tests', () => {
  return expect(run('success')).resolves.toMatchSnapshot();
});