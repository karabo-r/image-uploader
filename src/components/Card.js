import styled from "styled-components";

const Card = styled.div`
	display: flex;
	width: 25rem;
	height: 25rem;
	background: #ffffff;
	border-radius: 12px;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

	.card-title {
		font-size: 1.5rem;
		font-weight: 500;
		font-size: 18px;
		line-height: 27px;
		margin-bottom: 1rem;
		letter-spacing: -0.035em;
	}

	.card-description {
		margin-bottom: 1rem;
		font-weight: 500;
		font-size: 11px;
	}

	.card-image-preview {
		width: 338px;
		height: 218.9px;
		left: 551.82px;
		top: 427.97px;
		background: #f6f8fb;
		background-size: 13rem;
		border: 2px dashed #97bef4;
		background-position: center;
		background-repeat: no-repeat;

		input {
			visibility: hidden;
		}

	}

	button {
		margin-top: 1rem;
	}
`;

export default Card;
