// @flow

import {
  Test,
  TestResult,
} from '../types'

export const parseGoOutput = (relativeTestPath: string, start: number, output: Array<string>): Test => {
  let report = {
    passed: 0,
    failed: 0,
    failureMessage: '',
    duration: 0,
    end: 0,
    name: relativeTestPath,
  };

  output.forEach((line) => {
    if (line && line.indexOf('--- FAIL:') > -1) {
      return;
    }

    if (line && line.indexOf('.go:') > -1) {
      report.failureMessage = line;
    }

    if (line && line.indexOf(`FAIL\t${relativeTestPath}`) > -1) {
      report.failed++;
    }
    if (line && line.indexOf('ok') > -1) {
      report.passed++;
    }
  });

  const end = +new Date();

  report.end = end;
  report.duration = end - start;

  return report 
};

export const toTestResult = (test: Test): TestResult => ({
  ancestorTitles: [],
  duration: test.duration,
  failureMessages: test.failed > 0 ? test.failureMessage : '',
  fullName: test.name,
  numPassingAsserts: test.failed === 0 ? 1 : 0,
  status: test.failed === 0 ? 'passed' : 'failed',
  title: test.name,
});