import React from "react";
import classNames from "classnames";
import Flexbox from "../../General/Flexbox/Flexbox";

interface Props extends ReactHTMLElementProps<HTMLDivElement> {
	error?: any;
	readOnly?: boolean;
	customRef?:
		| React.MutableRefObject<HTMLElement | null>
		| React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const FieldContainer: React.FC<Props> = ({
	children,
	className,
	error,
	readOnly,
	customRef,
	...props
}) => {
	return (
		<Flexbox
			customRef={customRef}
			justify="start"
			className={classNames(
				className,
				"h-12",
				"w-full",
				"rounded-lg",
				"py-3",
				"px-3.5",
				"border-solid",
				"border",
				error && ["border-red-400"],
				readOnly ? ["bg-gray-700", "bg-opacity-50"] : "bg-white"
			)}
			{...props}
		>
			{children}
		</Flexbox>
	);
};

export default FieldContainer;
