import { useCallback, useState } from "react";
import { createContainer } from "unstated-next";

interface LoadingHandlerWrapper {
	<CB extends (...arg: any[]) => Promise<any>>(callback: CB): {
		noisy: (...arg: Parameters<CB>) => Promise<ReturnType<CB>>;
		silent: CB;
	};
}

const useLoaderHandler = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const loadingHandlerWrapper = useCallback<LoadingHandlerWrapper>(function (
		callback
	) {
		return {
			noisy: async (...arg) => {
				try {
					setIsLoading(true);
					const result = await callback(...arg);
					setIsLoading(false);

					return result;
				} catch (error) {
					setIsLoading(false);
					throw new Error(error);
				}
			},
			silent: callback,
		};
	},
	[]);

	return { isLoading, loadingHandlerWrapper };
};

export default createContainer(useLoaderHandler);
