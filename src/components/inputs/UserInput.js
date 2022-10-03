import React from "react";
import styled from "styled-components";

const UserInput = ({ value, onChange }) => {
	return <Container value={value} onChange={onChange} />;
};

const Container = styled.input`
	width: 70%;
	outline: none;
	padding: 0.5rem;
	font-size: 1rem;
	line-height: 12px;
	text-align: center;
	letter-spacing: -0.035em;
`;
export default UserInput;
