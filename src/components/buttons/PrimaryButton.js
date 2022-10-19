import styled from "styled-components";

const PrimaryButton = ({ onClick, name }) => {
	return <Container onClick={onClick}>{name}</Container>;
};

const Container = styled.button`
	border: none;
	outline: none;
	color: #ffffff;
	cursor: pointer;
	font-size: 0.9rem;
	background: #2f80ed;
	padding: 0.7rem 1rem;
	letter-spacing: 1px;

	:hover {
		background-color: #0b428c;
	}
`;

export default PrimaryButton;
