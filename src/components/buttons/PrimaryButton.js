import styled from "styled-components";

const PrimaryButton = ({ onClick, name }) => {
	return <Container onClick={onClick}>{name}</Container>;
};

const Container = styled.button`
	border: none;
	outline: none;
	color: #ffffff;
	cursor: pointer;
	font-size: 12px;
	background: #2f80ed;
	padding: 0.5rem 1rem;
	font-family: "Noto Sans";
	letter-spacing: -0.035em;

	:hover {
		background-color: #0b428c;
	}
`;

export default PrimaryButton;
