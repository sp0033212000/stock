import { useRef } from "react";
import classNames from "classnames";

import Flexbox from "../../components/General/Flexbox/Flexbox";
import Modal from "../../components/General/Modal/Modal";
import { useCallback } from "react";
import { useState } from "react";

interface PromptProps {
	visible: boolean;
	close: () => void;
	title: string;
	paragraph: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const usePrompt = ({
	title,
	paragraph,
	confirmText,
	cancelText,
}: Omit<PromptProps, "visible" | "close" | "onConfirm" | "onCancel">) => {
	const [showPrompt, setShowPrompt] = useState<boolean>(false);

	const closePrompt = useRef(() => setShowPrompt(false));
	const resolver =
		useRef<((value: boolean | PromiseLike<boolean>) => void) | null>(null);

	const prompt = useCallback(async () => {
		setShowPrompt(true);
		const result = await new Promise<boolean>(
			(resolve) => (resolver.current = resolve)
		);
		setShowPrompt(false);
		return result;
	}, []);

	const AsyncPropmt = useCallback(() => {
		return (
			<Prompt
				visible={showPrompt}
				close={closePrompt.current}
				title={title}
				paragraph={paragraph}
				confirmText={confirmText}
				cancelText={cancelText}
				onConfirm={() => resolver.current?.(true)}
				onCancel={() => resolver.current?.(false)}
			/>
		);
	}, [title, paragraph, confirmText, cancelText, showPrompt]);

	return { AsyncPropmt, prompt };
};

export default usePrompt;

const Prompt: React.FC<PromptProps> = ({
	visible,
	close,
	title,
	paragraph,
	confirmText = "確定",
	cancelText = "取消",
	onCancel,
	onConfirm,
}) => {
	return (
		<Modal
			visible={visible}
			onClick={(e) => {
				e.stopPropagation();
				close();
			}}
		>
			<Flexbox
				direction="col"
				align="stretch"
				className={classNames("w-96", "bg-white", "shadow-lg", "rounded-xl")}
			>
				<Flexbox direction="col" className={classNames("p-6")}>
					<h3
						className={classNames(
							"text-2xl",
							"font-bold",
							"text-gray-800",
							"mb-6"
						)}
					>
						{title}
					</h3>
					<p
						className={classNames(
							"text-lg",
							"text-gray-900",
							"mb-6",
							"text-center"
						)}
					>
						{paragraph}
					</p>
				</Flexbox>
				<Flexbox
					align="stretch"
					className={classNames("divide-x", "border-t", "border-solid", "h-12")}
				>
					<button
						onClick={onConfirm}
						className={classNames("flex-1", "text-green-500")}
					>
						{confirmText}
					</button>
					<button
						onClick={onCancel}
						className={classNames("flex-1", "text-red-400")}
					>
						{cancelText}
					</button>
				</Flexbox>
			</Flexbox>
		</Modal>
	);
};
