import * as R from 'ramda';

export const pipe = <T>(...fns) => (arg?: T) => (R as any).pipeP((arg) => Promise.resolve(arg), ...fns)(arg);
export const go = <T>(arg: T, ...fns) => pipe<T>(...fns)(arg);