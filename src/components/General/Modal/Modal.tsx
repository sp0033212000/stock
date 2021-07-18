import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import Flexbox from "../Flexbox/Flexbox";

interface Props
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	visible: boolean;
}

const Modal: React.FC<Props> = ({ children, visible, className, ...props }) => {
	if (!visible) return null;

	return createPortal(
		<Flexbox
			as="div"
			className={classNames(
				className,
				"fixed",
				"top-0",
				"left-0",
				"w-screen",
				"h-screen",
				"bg-black",
				"bg-opacity-80",
				"z-[999]"
			)}
			{...props}
		>
			{children}
		</Flexbox>,
		document.querySelector("#root")!
	);
};

export default Modal;
