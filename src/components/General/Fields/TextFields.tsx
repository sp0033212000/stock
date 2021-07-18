import React from "react";
import classNames from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

type TextareaProps = React.DetailedHTMLProps<
	React.TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>;

type InputElementProps = {
	as: "text";
	customRef?:
		| React.MutableRefObject<HTMLInputElement | null>
		| React.Dispatch<React.SetStateAction<HTMLInputElement | null>>;
} & InputProps;
type TextareaElementProps = {
	as: "textarea";
	customRef?:
		| React.MutableRefObject<HTMLTextAreaElement | null>
		| React.Dispatch<React.SetStateAction<HTMLTextAreaElement | null>>;
} & TextareaProps;
type ElementProps = InputElementProps | TextareaElementProps;

type Props = ElementProps & {
	register: UseFormRegisterReturn;
};

const TextFields: React.FC<Props> = ({ register, customRef, ...props }) => {
	const { onChange, ref, ...restRegister } = register;

	const changeHandler: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		const value = e.target.value;
		if (props.inputMode === "numeric") {
			e.target.value = value.replace(/[^\d]/g, "");
			onChange(e);
		} else {
			onChange(e);
		}
	};

	const component = () => {
		if (props.as === "text") {
			const { as, className, ...restProps } = props;
			return (
				<input
					defaultValue=""
					ref={(e) => {
						ref(e);

						if (customRef) {
							if (typeof customRef === "function") {
								//@ts-ignore
								customRef(e);
							} else {
								customRef.current = e;
							}
						}
					}}
					className={classNames(
						className,
						"w-full",
						"h-full",
						"text-gray-700",
						"placeholder-gray-500",
						"text-base"
					)}
					{...restProps}
					{...restRegister}
					onChange={changeHandler}
				/>
			);
		} else {
			const { as, className, ...restProps } = props;
			return (
				<textarea
					defaultValue=""
					ref={(e) => {
						ref(e);

						if (customRef) {
							if (typeof customRef === "function") {
								//@ts-ignore
								customRef(e);
							} else {
								customRef.current = e;
							}
						}
					}}
					className={classNames(
						className,
						"w-full",
						"h-full",
						"text-gray-700",
						"placeholder-gray-500",
						"text-base",
						"resize-none"
					)}
					{...restProps}
					{...restRegister}
					onChange={changeHandler}
				/>
			);
		}
	};

	return <React.Fragment>{component()}</React.Fragment>;
};

export default TextFields;
