import axios from "axios";
import keys from "../types/keys";

const baseURL = process.env.API_ADDRESS || "http://localhost:8888";

const StockAPI = axios.create({ baseURL });
StockAPI.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem(keys.accessToken);
		if (token) {
			config.headers["X-STOCK-TOKEN"] = token;
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default StockAPI;
