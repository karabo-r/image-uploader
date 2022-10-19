import styled from "styled-components";

const Card = styled.div`
	display: flex;
	width: 30rem;
	height: 28rem;
	background: #ffffff;
	border-radius: 12px;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

	.card-title {
		font-weight: 500;
		font-size: 1.3rem;
		line-height: 27px;
		margin-bottom: 1rem;
		letter-spacing: -0.035em;
	}

	.card-description {
		margin-bottom: 1rem;
		font-weight: 500;
		font-size: 14px;
	}

	.card-image-preview {
		width: 338px;
		height: 218.9px;
		left: 551.82px;
		top: 427.97px;
		margin-top: 1rem;
		margin-bottom: 1rem;
		background: #f6f8fb;
		background-size: 13rem;
		border: 2px dashed #97bef4;
		background-position: center;
		background-repeat: no-repeat;

		input {
			visibility: hidden;
		}
	}

	.card-download {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.card-download-link {
			border: none;
			color: black;
			font-size: 1rem;
			padding: 0.7rem 1rem;
			background-color: #f6f8fb;
		}
	}

	button {
		margin-top: 1rem;
	}

	@media screen and (max-width: 600px) {
		box-shadow: none;
	}
`;

export default Card;
