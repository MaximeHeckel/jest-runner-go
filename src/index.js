// @flow

import { spawn } from 'child_process';
import throat from 'throat';
import {
  parseGoOutput,
  toTestResult,
} from './lib/utils';
import {
  TestFile,
} from './types';

class CancelRun extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CancelRun';
  }
}

class GoTestRunner {
  _globalConfig: Object;

  constructor(globalConfig: Object) {
    this._globalConfig = globalConfig;
  }

  // eslint-disable-next-line max-len
  async runTests(tests: Array<TestFile>, watcher: Object, onStart: Function, onResult: Function, onFailure: Function): Promise<any> {
    const mutex = throat(this._globalConfig.maxWorkers);
    return Promise.all(tests.map(test =>
      mutex(async () => {
        if (watcher.isInterrupted()) {
          throw new CancelRun('watcher interupted');
        }

        await onStart(test);

        return this._runTest(test.path)
          .then((result) => {
            onResult(test, result);
          })
          .catch(error => onFailure(test, error));
      })));
  }

  async _runTest(testPath: string) {
    if (!process.env.GOPATH) {
      throw new Error('This runner can only run if a GOPATH environment variable is defined');
    }

    // Note MaximeHeckel 11/23/2017
    // Current limitation: No support for multiple GOPATHs,
    // if multiple GOPATHs are defined take the first one

    // Workdir is $GOPATH/src, most of Golang setups require the go projects
    // to be under /src
    const workdir = process.env.GOPATH && `${process.env.GOPATH.split(':')[0]}/src/`;

    // Remove the GOPATH in the testPath
    const relativeTestPath = testPath.substring(0, testPath.lastIndexOf('/')).replace(workdir, '');
    const start = +new Date();

    return new Promise((resolve, reject) => {
      const child = spawn('go', ['test', `${relativeTestPath}/...`]);

      let stdout = '';
      child.stdout.setEncoding('utf-8');
      // eslint-disable-next-line no-return-assign
      child.stdout.on('data', data => stdout += data);
      child.stdout.on('error', error => reject(error));
      child.stdout.on('close', () => {
        let result = [];

        try {
          result = stdout.toString().split('\n');
        } catch (error) {
          reject(error);
        }

        const report = parseGoOutput(relativeTestPath, start, result);
        const end = +new Date();

        report.end = end;
        report.duration = end - start;

        resolve({
          console: null,
          failureMessage: report.failed > 0 ? report.failureMessage : null,
          numFailingTests: report.failed || 0,
          numPassingTests: report.passed || 0,
          numPendingTests: 0,
          perfStats: {
            end: report.end,
            start,
          },
          skipped: false,
          snapshot: {
            added: 0,
            fileDeleted: false,
            matched: 0,
            unchecked: 0,
            unmatched: 0,
            updated: 0,
          },
          sourceMaps: {},
          testExecError: null,
          testFilePath: relativeTestPath,
          testResults: [toTestResult(report)],
        });
      });
    });
  }
}

module.exports = GoTestRunner;
