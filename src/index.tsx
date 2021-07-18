import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";

import useLoaderHandler from "./hooks/stores/useLoaderHandler/useLoaderHandler";
import useManager from "./hooks/stores/useManager/useManager";
import Loader from "./components/Feature/Loader/Loader";

ReactDOM.render(
	<useLoaderHandler.Provider>
		<useManager.Provider>
			<BrowserRouter>
				<Loader />
				<App />
			</BrowserRouter>
		</useManager.Provider>
	</useLoaderHandler.Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
