import React from "react";
import classNames from "classnames";
import Tag, { TagComponentProps } from "../Tag/Tag";

type Props = TagComponentProps & {
	ifUnderCondition?: boolean;
	className?: string;
	customRef?:
		| React.MutableRefObject<(any & HTMLElement) | null>
		| React.Dispatch<React.SetStateAction<(any & HTMLElement) | null>>;
};

const Fonts: React.FC<Props> = ({
	className,
	children,
	customRef,
	ifUnderCondition = true,
	...props
}) => {
	if (!ifUnderCondition) return null;

	const { as, ...restProps } = props;

	return (
		<Tag
			as={as ? as : "p"}
			className={classNames(className)}
			customRef={customRef}
			{...restProps}
		>
			{children}
		</Tag>
	);
};

export default Fonts;
