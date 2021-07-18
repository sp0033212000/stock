import classNames from "classnames";

import { isSet } from "./helper/format.checker";

import useManager from "./hooks/stores/useManager/useManager";
import usePrompt from "./hooks/usePrompt/usePrompt";

import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthorizationUI from "./components/AuthorizationUI/AuthorizationUI";
import Flexbox from "./components/General/Flexbox/Flexbox";
import Button from "./components/General/Button/Button";
import { Switch } from "react-router-dom";
import routeConfigs from "./configs/route.config";
import RouteWithSubRoutes from "./components/General/RouteWithSubRoutes/RouteWithSubRoutes";
import Drawer from "./components/Feature/Drawer/Drawer";

function App() {
	const { user, signOut } = useManager.useContainer();

	const { AsyncPropmt, prompt } = usePrompt({
		title: "登出",
		paragraph: "請問是否確定要登出？",
	});

	const onSignOut = async () => {
		const isConfirm = await prompt();
		if (isConfirm) signOut();
	};

	return (
		<div className={classNames("w-full", "h-full", "flex", "flex-col")}>
			<AsyncPropmt />
			<Flexbox
				as="header"
				justify="between"
				className={classNames(
					"w-full",
					"bg-pink-400",
					"text-white",
					"px-6",
					"py-4"
				)}
			>
				<p className={classNames("text-2xl", "font-bold")}>STOCK</p>
				<Flexbox condition={isSet(user)}>
					<Flexbox
						align="end"
						className={classNames(
							"w-6",
							"h-6",
							"mr-2",
							"rounded-[50%]",
							"border-2",
							"border-solid",
							"border-white"
						)}
					>
						<FontAwesomeIcon icon={faUserAlt} />
					</Flexbox>
					<p
						className={classNames(
							"font-bold",
							"mr-4",
							"w-fit",
							"whitespace-nowrap"
						)}
					>
						Hello! {user?.name}! 歡迎回來
					</p>
					<Button
						onClick={onSignOut}
						withoutPadding
						type="button"
						className={classNames(
							"font-bold",
							"text-pink-400",
							"bg-white",
							"w-12"
						)}
					>
						登出
					</Button>
				</Flexbox>
			</Flexbox>
			<AuthorizationUI>
				<main className={classNames("flex-1", "relative")}>
					<Drawer />
					<Switch>
						{routeConfigs.map((route) => (
							<RouteWithSubRoutes key={route.path} {...route} />
						))}
					</Switch>
				</main>
			</AuthorizationUI>
		</div>
	);
}

export default App;
