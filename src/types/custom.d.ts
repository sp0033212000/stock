import React from "react";

export declare global {
	interface FunctionComponentProperty<P = any>
		extends Pick<
			React.FC<P>,
			"propTypes" | "contextTypes" | "defaultProps" | "displayName"
		> {}

	type HTMLKey = keyof JSX.IntrinsicElements;

	type HTMLProps<K extends HTMLKey> = JSX.IntrinsicElements[K];

	type ReactHTMLElementProps<HTML extends HTMLElement> =
		React.DetailedHTMLProps<React.HTMLAttributes<HTML>, HTML>;

	declare namespace NodeJS {
		export interface ProcessEnv {
			API_ADDRESS: string;
		}
	}
}
