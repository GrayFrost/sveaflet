function getType(value: unknown): string {
	return Object.prototype.toString.call(value);
}

export function isNil(value: unknown): boolean {
	return value === undefined || value === null || value === '';
}

export function isObject(value: unknown): boolean {
	return getType(value) === '[object Object]';
}

export function isArrayEqual<T>(prevArr: T[], curArr: T[]): boolean {
	if (prevArr.length !== curArr.length) {
		return false;
	}

	return curArr.every((element) => prevArr.includes(element));
}

export function isObjectEqual(
	prevObj: Record<string, unknown>,
	curObj: Record<string, unknown>
): boolean {
	const prevObjKeys = Object.keys(prevObj);
	const curObjKeys = Object.keys(curObj);

	if (prevObjKeys.length !== curObjKeys.length) {
		return false;
	}

	for (const key in curObjKeys) {
		if (curObj[key] !== prevObj[key]) {
			return false;
		}
	}

	return true;
}

export function isPrimitiveEqual(prevVal: unknown, curVal: unknown) {
	if (getType(prevVal) !== getType(curVal)) {
		return false;
	} else {
		return prevVal === curVal;
	}
}

export function isFunction(func: unknown) {
	return (
		typeof func === 'function' && typeof func.constructor === 'function' && func instanceof Function
	);
}
