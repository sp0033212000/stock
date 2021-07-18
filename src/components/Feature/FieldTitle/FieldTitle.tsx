import React from "react";
import classNames from "classnames";

interface Props
	extends React.DetailedHTMLProps<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		HTMLLabelElement
	> {}

const FieldTitle: React.FC<Props> = ({ children, className, ...props }) => {
	return (
		<label
			{...props}
			className={classNames(className, "text-lg", "font-semibold", "mb-2")}
		>
			{children}
		</label>
	);
};

export default FieldTitle;
