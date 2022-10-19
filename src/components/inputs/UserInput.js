import React from "react";
import styled from "styled-components";

const UserInput = ({ value, onChange, placeholder }) => {
	return <Container value={value} onChange={onChange} placeholder={placeholder}/>;
};

const Container = styled.input`
	width: 70%;
	outline: none;
	padding: 0.5rem;
	font-size: 1rem;
	line-height: 12px;
	text-align: center;
	letter-spacing: -0.035em;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;
export default UserInput;
