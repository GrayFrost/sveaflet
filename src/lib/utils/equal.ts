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

export function isObjectEqual(prevObj: any, curObj: any): boolean {
	if (prevObj === curObj) {
		return true;
	}
	// 检查两个对象是否为对象，并且不为 null
	if (
		typeof prevObj !== 'object' ||
		prevObj === null ||
		typeof curObj !== 'object' ||
		curObj === null
	) {
		return false;
	}
	// 获取对象的键列表
	const prevKeys = Object.keys(prevObj);
	const curKeys = Object.keys(curObj);
	// 检查键的数量是否相同
	if (prevKeys.length !== curKeys.length) {
		return false;
	}
	// 遍历键列表，比较键和键值是否相等
	for (const key of prevKeys) {
		if (!curKeys.includes(key) || !isObjectEqual(prevObj[key], curObj[key])) {
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
