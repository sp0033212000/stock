import classNames from "classnames";
import { NavLink } from "react-router-dom";
import routeConfigs, { RouteProps } from "../../../configs/route.config";

const Drawer = () => {
	return (
		<nav
			className={classNames(
				"absolute",
				"h-full",
				"pr-6",
				"transition-transform",
				"transform",
				"-translate-x-64",
				"duration-1000",
				"hover:translate-x-0"
			)}
		>
			<div className={classNames("absolute", "top-0", "right-0", "h-full")}>
				<div
					className={classNames(
						"vertical-rl",
						"upright",
						"bg-pink-400",
						"text-white",
						"font-semibold",
						"py-2",
						"rounded-br-lg"
					)}
				>
					Menu
				</div>
			</div>
			<ul className={classNames("w-64", "h-full", "bg-pink-400")}>
				{routeConfigs.map((route) => (
					<NavItem key={route.path} {...route} />
				))}
			</ul>
		</nav>
	);
};

export default Drawer;

const NavItem: React.FC<RouteProps> = ({ title, path }) => {
	return (
		<li className={classNames("mb-4", "p-4")}>
			<NavLink
				className={classNames(
					"block",
					"w-full",
					"flex",
					"justify-center",
					"items-center",
					"text-white",
					"py-4",
					"text-xl",
					"font-bold",
					"rounded-lg",
					"hover:bg-white",
					"hover:text-pink-400"
				)}
				to={path}
			>
				{title}
			</NavLink>
		</li>
	);
};
