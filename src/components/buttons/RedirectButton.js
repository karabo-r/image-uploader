import React from "react";
import styled from "styled-components";
const RedirectButton = ({ onClick, name }) => {
	return <Container onClick={onClick}>{name}</Container>;
};

const Container = styled.p`
	position: absolute;
	bottom: 1.5rem;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;
	opacity: 60%;
	cursor: pointer;

	:hover {
		opacity: 100%;
	}
`;
export default RedirectButton;
