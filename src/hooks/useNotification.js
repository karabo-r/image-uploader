import { useState } from "react";
import Notifications from "../components/notifications/Notifications";

const useNotification = () => {
	const [notificationMessage, setNotificationMessage] = useState({
		display: false,
		message: "",
	});

	let notificationTimer;

	const update = (type) => {
		clearTimeout(notificationTimer);
		setNotificationMessage({
			display: true,
			message: Notifications.handleMessage(type),
		});
		remove();
	};

	const custom = (message) => {
		clearTimeout(notificationTimer);
		setNotificationMessage({
			display: true,
			message: Notifications.customMessage(message),
		});
		remove();
	};

	const remove = () => {
		clearTimeout(notificationTimer);
		notificationTimer = setTimeout(() => {
			setNotificationMessage({
				display: false,
				message: "",
			});
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
