import styled from "styled-components";

const Container = styled.div`
	position: absolute;
	top: 1rem;
	left: 1rem;
	padding: 1rem;

	/* background-color: black; */
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

	.fail_style {
		color: red;
	}
`;

const messageTypes = [
	{
		name: "upload",
		message: "Your image is ready for upload!🙂",
		style: "success_style",
	},
	{
		name: "uploaded",
		message: "Remember, its gone after 24hours😊",
		style: "success_style",
	},
    {
        name: 'preview',
        message: "Got the image you wanted😊"
    },
];

function customMessage(message) {
	return (
		<Container>
			<div>{message}</div>
		</Container>
	);
}

function handleMessage(messageTypeName) {
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
}

const messageHandlers = {
	handleMessage,
	customMessage,
};

// imported as Notifications
export default messageHandlers;
