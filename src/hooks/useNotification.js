import { useState } from "react";
import Notifications from "../components/Notifications";

const useNotification = () => {
	const [notificationMessage, setNotificationMessage] = useState({
		display: false,
		message: "",
	});

	const update = (type) => {
		setNotificationMessage({
			display: true,
			message: Notifications.handleMessage(type),
		});
		remove();
	}

	const custom = (message) => {
		setNotificationMessage({
			display: true,
			message: Notifications.customMessage(message),
		});
		remove();
	}

	const remove = () => {
		setTimeout(() => {
			setNotificationMessage({ display: false });
		}, 5000);
	};

	return {
		display: notificationMessage.display,
		message: notificationMessage.message,
		update,
		custom,
	};
};

export default useNotification;
