import styled from "styled-components";
import { messageTypes } from "./messageTypes";

const customMessage = (message) => {
	return (
		<Container>
			<div>{message}</div>
		</Container>
	);
};

const handleMessage = (messageTypeName) => {
	let message = "";
	messageTypes.map((item) => {
		if (messageTypeName === item.name) {
			message = (
				<Container>
					<div className={item.style}>{item.message}</div>
				</Container>
			);
		}
	});
	return message;
};

const Container = styled.div`
	position: absolute;
	top: 1rem;
	left: 1rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

	.fail_style {
		color: red;
	}
`;

const messageHandlers = {
	handleMessage,
	customMessage,
};

// imported as Notifications
export default messageHandlers;
