export type Context = {
  config: Object,
  resolver: Function,
};

export type TestFile = {
  path: string,
  context: Context,
};

export type Test = {
  duration: number,
  end: number,
  failed: number,
  passed: number,
  failureMessage: string,
  name: string,
};

export type TestResult = {
  ancestorTitles: Array<string>,
  duration: number,
  failureMessages: string,
  fullName: string,
  numPassingAsserts: number,
  status: string,
  title: string,
};
