import useLoaderHandler from "../../../hooks/stores/useLoaderHandler/useLoaderHandler";
import Modal from "../../General/Modal/Modal";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const Loader = () => {
	const { isLoading } = useLoaderHandler.useContainer();

	return (
		<Modal visible={isLoading}>
			<FontAwesomeIcon
				className={classNames("animate-loader", "text-pink-500", "text-6xl")}
				icon={faSpinner}
			/>
		</Modal>
	);
};

export default Loader;
