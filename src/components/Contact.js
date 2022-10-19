import React from "react";
import styled from "styled-components";
const Contact = () => {
	return (
		<Container>
			<a href="https://github.com/karabo-r">Github</a>
			<a href="https://twitter.com/karabo_dev">Twitter </a>
		</Container>
	);
};

const Container = styled.div`
	position: absolute;
	right: 1rem;
	bottom: 1.5rem;
	font-size: 1.1rem;
	font-weight: 700;
	text-decoration: none;
	font-family: "Raleway", sans-serif;
	text-align: right;
	padding-right: 2rem;

	a {
		text-decoration: none;
		margin: 10px;
		color: black;
		opacity: 50%;
	}

	a:hover {
		opacity: 100%;
	}

	@media screen and (max-width: 600px) {
		width: 100%;
		right: 0;
		padding-right: 0;
		text-align: center;
		font-size: 1.3rem;
	}
`;
export default Contact;
