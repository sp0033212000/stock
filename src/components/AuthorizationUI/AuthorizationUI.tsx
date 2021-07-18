import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { isNotSet, isTrue } from "../../helper/format.checker";

import useManager from "../../hooks/stores/useManager/useManager";

import Flexbox from "../General/Flexbox/Flexbox";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

type PageName = "SIGN_IN" | "SIGN_UP";

export type PageHandler = React.Dispatch<React.SetStateAction<PageName>>;

const AuthorizationUI: React.FC = ({ children }) => {
	const { isSignIn, getCurrentUser } = useManager.useContainer();

	useEffect(() => {
		getCurrentUser.noisy();
		// eslint-disable-next-line
	}, []);

	if (isNotSet(isSignIn)) return null;
	if (isTrue(isSignIn)) return <React.Fragment>{children}</React.Fragment>;

	return (
		<React.Fragment>
			<Flexbox as="main" expand>
				<Switch>
					<Route exact path="/">
						<Redirect to="/sign_in" />
					</Route>
					<Route path="/sign_in" component={SignInPage} />
					<Route path="/sign_up" component={SignUpPage} />
				</Switch>
			</Flexbox>
		</React.Fragment>
	);
};

export default AuthorizationUI;
