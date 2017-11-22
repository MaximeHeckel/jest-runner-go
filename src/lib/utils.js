// @flow

/* eslint-disable no-plusplus */
import {
  Test,
  TestResult,
} from '../types';

// eslint-disable-next-line max-len
export const parseGoOutput = (relativeTestPath: string, start: number, output: Array<string>): Test => {
  const report = {
    passed: 0,
    failed: 0,
    failureMessage: '',
    duration: 0,
    end: 0,
    name: relativeTestPath,
  };

  output.forEach((line) => {
    if (line && line.indexOf('--- FAIL:') > -1) {
      report.failed++;
    }

    if (line && line.indexOf('.go:') > -1) {
      report.failureMessage = line;
    }

    if (line && line.indexOf('ok') > -1) {
      report.passed++;
    }
  });

  return report;
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
