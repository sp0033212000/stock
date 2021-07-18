export const isSet = <O>(obj: O | null | undefined): obj is O =>
	obj !== undefined && obj !== null;

export const isNotSet = <O>(
	obj: O | null | undefined
): obj is null | undefined => obj === null || obj === undefined;

export const isTrue = <B>(bool: B | true | false): bool is true =>
	bool === true;

export const isFalse = <B>(bool: B | true | false): bool is false =>
	bool === false;
