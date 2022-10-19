import React from "react";
import styled from "styled-components";
const RedirectButton = ({ onClick, name }) => {
	return <Container onClick={onClick}>{name}</Container>;
};

const Container = styled.p`
	font-size: 1.1rem;
	position: absolute;
	bottom: 1.5rem;
	margin: 10px;
	font-weight: 600;
	opacity: 50%;
	cursor: pointer;

	:hover {
		opacity: 100%;
	}

	@media screen and (max-width: 600px) {
		position: absolute;
		bottom: 5rem;
		padding-right: 0;
		text-align: center;
		/* font-size: 1.3rem; */
	}
`;
export default RedirectButton;
