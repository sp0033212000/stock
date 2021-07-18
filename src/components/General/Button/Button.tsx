import React from "react";
import classNames from "classnames";

interface Props
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	withoutPadding?: boolean;
}

const Button: React.FC<Props> = ({
	className,
	children,
	withoutPadding = false,
	...props
}) => {
	return (
		<button
			className={classNames(
				className,
				"font-bold",
				"w-full",
				{ "py-3": !withoutPadding },
				"text-base",
				"rounded-3xl"
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
