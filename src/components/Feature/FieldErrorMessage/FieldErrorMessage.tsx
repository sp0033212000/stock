import React from "react";
import classNames from "classnames";
import { ErrorMessage, Props } from "@hookform/error-message";

type Component = <
	TFieldErrors extends import("react-hook-form").DeepMap<
		import("react-hook-form").FieldValues,
		import("react-hook-form").FieldError
	>,
	TAs extends
		| React.ReactElement<any, string | React.JSXElementConstructor<any>>
		| React.ComponentType<any>
		| keyof JSX.IntrinsicElements
		| undefined = undefined
>({
	as,
	errors,
	name,
	message,
	render,
	...rest
}: Props<TFieldErrors, TAs>) => React.ReactElement<
	any,
	string | React.JSXElementConstructor<any>
> | null;

const FieldErrorMessage: Component = (props) => {
	return (
		<ErrorMessage
			{...props}
			render={({ message }) => (
				<p className={classNames("text-red-400", "mt-1", "text-sm")}>
					{message}
				</p>
			)}
		/>
	);
};

export default FieldErrorMessage;
