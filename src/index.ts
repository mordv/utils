export const invokeAll = (...args: (() => void | never)[]): void => args.forEach((a) => a());

export const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const ObjectTyped = {
  keys: <T extends object>(obj: T): (keyof T)[] => Object.keys(obj) as (keyof T)[],
  values: <T extends object>(obj: T): T[keyof T][] => Object.values(obj) as T[keyof T][],
  entries: <T extends object>(obj: T): [keyof T, T[keyof T]][] => Object.entries(obj) as [keyof T, T[keyof T]][],
  fromEntries: <const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
      entries: T
  ): { [K in T[number] as K[0]]: K[1] } =>
      Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] },
  assign: <T extends object, Params>(t: T, factory: (t: T) => Params): T & Params =>
      Object.assign(t, factory(t))
};

export const sum = (numbers: Iterable<number>): number => {
  let res = 0;
  for (const number of numbers) {
    res += number;
  }
  return res;
};

export const avg = (numbers: number[]): number => {
  const s = sum(numbers);
  return numbers.length ? s / numbers.length : 0;
};

export function* iterate(count: number) {
  if (count <= 0) {
    return;
  }

  for (let i = 0; i < count; i++) {
    const first = i === 0;
    const last = i === count - 1;

    yield { i, count, first, last };
  }
}

export const intRange = (length: number): number[] => Array.from({ length }).map((_, idx) => idx);

export const randomFilter =
  <T extends unknown>(probability: number): ((val: T) => boolean) =>
  () =>
    Math.random() < probability / 100;

export const randomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomInRange = (rangeOrSymmetricalValue: [number, number] | number): number =>
  mapRange(
    Math.random(),
    [0, 1],
    Array.isArray(rangeOrSymmetricalValue)
      ? rangeOrSymmetricalValue
      : [-Math.abs(rangeOrSymmetricalValue), Math.abs(rangeOrSymmetricalValue)]
  );

export const randomElement = <T>(array: T[]): T => array[randomInt(0, array.length - 1)];

export const mapRange = (x: number, [a1, a2]: [number, number], [b1, b2]: [number, number]): number =>
  b1 + ((x - a1) * (b2 - b1)) / (a2 - a1 || 1);

export const modulo = (n: number, m: number) => ((n % m) + m) % m;

export const addInRing = (n: number, add: number, ringSize: number): number => modulo(n + add, ringSize);

export const isValued = <T extends unknown>(val?: T | null | undefined): val is T => val !== undefined && val !== null;

export const noop = (): void => {};

export type ExtractNullable<T> = (T extends undefined ? undefined : never) | (T extends null ? null : never);

export type OptionalType<T, Initial = never> = {
  map: <Result>(mapper: (value: NonNullable<T>) => Result) => OptionalType<Result, Initial>;
  get: () => T | ExtractNullable<Initial>;
};

export const optional = <T, Initial = T>(value: T): OptionalType<T, Initial> => {
  const map = <Result>(mapper: (value: NonNullable<T>) => Result): OptionalType<Result, Initial> => {
    return optional(isValued(value) ? mapper(value!) : value);
  };

  return { map, get: () => value };
};

export type RequireFields<T extends unknown, K extends keyof T> = T & {
  [R in K]-?: NonNullable<T[R]>;
};

export type RequireAllFields<T extends unknown> = {
  [R in keyof T]-?: NonNullable<T[R]>;
};

export type ChangeReturnTypes<T extends object, NewReturnType> = {
  [K in keyof T]: NewReturnType;
};

export type PickRequire<T extends unknown, K extends keyof T> = {
  [R in K]-?: NonNullable<T[R]>;
};

export type ChangeReturnType<F extends (...p: never) => unknown, NewReturnType> = (
  ...p: Parameters<F>
) => NewReturnType;

export type OmitKeys<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type FunctionType = (...args: never[]) => unknown;

export type PickFunctions<T> = {
  [K in keyof T as T[K] extends FunctionType ? K : never]: T[K];
};

export type Functionalize<T, A = void> = { [K in keyof T]: A extends void ? () => T[K] : (a: A) => T[K] };

export type Defunctionalize<T> = { [K in keyof T]: T[K] extends FunctionType ? ReturnType<T[K]> : T[K] };
