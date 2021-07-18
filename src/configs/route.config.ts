import { ComponentProps } from "react";
import { Route } from "react-router-dom";

import RecordUpload from "../components/RecordUpload/RecordUpload";

export interface RouteProps
	extends Pick<ComponentProps<typeof Route>, "path" | "exact"> {
	path: string;
	title: string;
	routes?: RouteProps[];
	render: React.FC<any>;
}

export type Routes = RouteProps[];

class RouteGenerator<P extends string | undefined> {
	constructor(private routeName: string, private params?: P[]) {}

	getRoute() {
		const paramsPath = this.params ? `:${this.params.join("/:")}` : "";
		return `/${this.routeName}/${paramsPath}`;
	}

	// getLinks(paramsProps: P extends string ? Record<P, any> : undefined) {
	getLinks(...arg: P extends string ? [Record<P, any>] : [undefined?]) {
		const paramsProps = arg[0];

		let routeParams = "";

		if (paramsProps) {
			routeParams = `${this.params?.map((key) => paramsProps[key!]).join("/")}`;
		}

		return `/${this.routeName}/${routeParams}`;
	}
}

const RecordUploadRoute = new RouteGenerator("/upload");

const routeConfigs: RouteProps[] = [
	{
		path: RecordUploadRoute.getRoute(),
		title: "上傳紀錄",
		render: RecordUpload,
	},
];

export default routeConfigs;
