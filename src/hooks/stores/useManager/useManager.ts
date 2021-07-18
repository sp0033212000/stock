import { useState } from "react";
import { createContainer } from "unstated-next";
import StockAPI from "../../../api";
import keys from "../../../types/keys";
import useLoaderHandler from "../useLoaderHandler/useLoaderHandler";

const useManager = () => {
	const [isSignIn, setIsSignIn] = useState<boolean | null>(null);
	const [user, setUser] = useState<User | null>(null);

	const { loadingHandlerWrapper } = useLoaderHandler.useContainer();

	const postToRegister = loadingHandlerWrapper(async (form: RegisterForm) => {
		const {
			data: { accessToken },
		} = await StockAPI.post<{ accessToken: string }>("/api/v1/register", form);
		localStorage.setItem(keys.accessToken, accessToken);
	});

	const getCurrentUser = loadingHandlerWrapper(async () => {
		try {
			const { data } = await StockAPI.get<User>("/api/v1/user");
			setUser(data);
			setIsSignIn(true);
		} catch (error) {
			setIsSignIn(false);
			console.error(error);
		}
	});

	const postToSignInUser = loadingHandlerWrapper(
		async (form: Pick<RegisterForm, "email" | "password">) => {
			try {
				const {
					data: { accessToken, ...user },
				} = await StockAPI.post<User & { accessToken: string }>(
					"/api/v1/signIn",
					form
				);
				setUser(user);
				localStorage.setItem(keys.accessToken, accessToken);
				setIsSignIn(true);
			} catch (error) {
				setIsSignIn(false);
				console.error(error);
			}
		}
	);

	const signOut = () => {
		setIsSignIn(null);
		localStorage.removeItem(keys.accessToken);
		window.location.reload();
	};

	return {
		isSignIn,
		postToRegister,
		getCurrentUser,
		user,
		signOut,
		postToSignInUser,
	};
};

export default createContainer(useManager);
