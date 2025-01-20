import { describe, expect, test } from 'vitest';
import {
	isNil,
	isObject,
	isArrayEqual,
	isObjectEqual,
	isPrimitiveEqual
} from '../../lib/utils/equal';

describe('utils/equal', () => {
	describe('isNil', () => {
		test("'' is true", () => {
			expect(isNil('')).toBeTruthy();
		});
		test('undefined is true', () => {
			expect(isNil(undefined)).toBeTruthy();
		});
		test('null is true', () => {
			expect(isNil(null)).toBeTruthy();
		});
		test("' ' is false", () => {
			expect(isNil(' ')).toBeFalsy();
		});
	});

	describe('isObject', () => {
		test('{} is true', () => {
			expect(isObject({})).toBeTruthy();
		});
		test('null is false', () => {
			expect(isObject(null)).toBeFalsy();
		});
		test('1 is false', () => {
			expect(isObject(1)).toBeFalsy();
		});
	});

	describe('isArrayEqual', () => {
		test('[] equals []', () => {
			expect(isArrayEqual([], [])).toBeTruthy();
		});
		test('[] not equals [1]', () => {
			expect(isArrayEqual([], [1])).toBeFalsy();
		});
		test('[1,2] equals [1,2]', () => {
			expect(isArrayEqual([1, 2], [1, 2])).toBeTruthy();
		});
		// TODO: two dimension array compare?
	});

	describe('isObjectEqual', () => {
		test('{} equals {}', () => {
			expect(isObjectEqual({}, {})).toBeTruthy();
		});
		test('{a: 1} equals {a: 1}', () => {
			expect(isObjectEqual({ a: 1 }, { a: 1 })).toBeTruthy();
		});
		test('{} not equals {a: 1}', () => {
			expect(isObjectEqual({}, { a: 1 })).toBeFalsy();
		});
		test('{a: 1, b: 2} equals {b: 2, a: 1}', () => {
			expect(isObjectEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBeTruthy();
		});
		test('{lat: 50.01, lng: 12} not equals { lat: 50, lng: 12 }', () => {
			expect(isObjectEqual({ lat: 50.01, lng: 12 }, { lat: 50, lng: 12 })).toBeFalsy();
		});
		// cursive object compare?
	});

	describe('isPrimitiveEqual', () => {
		test('1 equals 1', () => {
			expect(isPrimitiveEqual(1, 1)).toBeTruthy();
		});
		test("1 not equals '1'", () => {
			expect(isPrimitiveEqual(1, '1')).toBeFalsy();
		});
		test('1 not equals true', () => {
			expect(isPrimitiveEqual(1, true)).toBeFalsy();
		});
		test("'1' not equals true", () => {
			expect(isPrimitiveEqual('1', true)).toBeFalsy();
		});
		test('false equals false', () => {
			expect(isPrimitiveEqual(false, false)).toBeTruthy();
		});
		test('undefined equals undefined', () => {
			expect(isPrimitiveEqual(undefined, undefined)).toBeTruthy();
		});
	});
});
