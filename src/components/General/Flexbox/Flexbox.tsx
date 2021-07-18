import React from "react";
import classNames from "classnames";
import Tag, { TagComponentProps } from "../Tag/Tag";
import { isFalse } from "../../../helper/format.checker";

interface Props {
	condition?: boolean;
	direction?: "row" | "col";
	justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
	align?: "start" | "end" | "center" | "baseline" | "stretch";
	expand?: boolean;
	className?: string;
	shrink?: boolean;
	wrap?: "wrap" | "nowrap" | "wrap-reverse";
	customRef?:
		| React.MutableRefObject<(any & HTMLElement) | null>
		| React.Dispatch<React.SetStateAction<(any & HTMLElement) | null>>;
}

const Flexbox: React.FC<Props & TagComponentProps> = ({
	as = "div",
	direction = "row",
	justify = "center",
	align = "center",
	children,
	className,
	expand,
	condition = true,
	shrink = true,
	wrap = "nowrap",
	...props
}) => {
	if (isFalse(condition)) return null;

	return (
		<Tag
			as={as}
			className={classNames(
				"flex",
				{
					"flex-shrink-0": shrink,
					"flex-wrap": wrap === "wrap",
					"flex-wrap-reverse": wrap === "wrap-reverse",
					"flex-nowrap": wrap === "nowrap",
				},
				{
					"flex-row": direction === "row",
					"flex-col": direction === "col",
				},
				{
					"justify-start": justify === "start",
					"justify-end": justify === "end",
					"justify-center": justify === "center",
					"justify-between": justify === "between",
					"justify-around": justify === "around",
					"justify-evenly": justify === "evenly",
				},
				{
					"items-start": align === "start",
					"items-end": align === "end",
					"items-center": align === "center",
					"items-baseline": align === "baseline",
					"items-stretch": align === "stretch",
				},
				{ "flex-1": expand },
				className
			)}
			{...props}
		>
			{children}
		</Tag>
	);
};

export default Flexbox;
