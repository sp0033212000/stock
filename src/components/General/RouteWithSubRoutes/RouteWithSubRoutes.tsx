import React from "react";
import { Route } from "react-router-dom";
import { RouteProps } from "../../../configs/route.config";

const RouteWithSubRoutes: React.FC<RouteProps> = (route) => {
	if (!route.routes)
		return (
			<Route
				path={route.path}
				render={(props) => <route.render {...props} />}
			/>
		);

	return (
		<Route
			{...route}
			render={(props) => {
				return <>{<route.render {...props} route={route.routes} />}</>;
			}}
		/>
	);
};

export default RouteWithSubRoutes;
