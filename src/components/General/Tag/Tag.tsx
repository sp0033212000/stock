import React, { ComponentProps, PropsWithChildren, ReactElement } from "react";
import { isFalse } from "../../../helper/format.checker";

type Props<T extends HTMLKey = HTMLKey> = TagsProps<T> & {
	as?: T;
	customRef?: React.LegacyRef<HTMLElement>;
	condition?: boolean;
};

export type TagsProps<T extends HTMLKey = HTMLKey> = HTMLProps<T>;

interface TagComponent extends FunctionComponentProperty {
	<T extends HTMLKey>(
		props: PropsWithChildren<Props<T>>,
		context?: any
	): ReactElement<any, any> | null;
}

const Tag: TagComponent = ({
	customRef,
	children,
	as = "div",
	condition = true,
	...props
}) => {
	if (isFalse(condition)) return null;

	return React.createElement(as, { ref: customRef, ...props }, children);
};

export default Tag;

export type TagComponentProps = ComponentProps<typeof Tag>;
