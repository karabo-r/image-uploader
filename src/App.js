import styled from "styled-components";
import Contact from "./components/Contact";
import Upload from "./components/upload/Upload";
import Download from "./components/download/Download";
import { Routes, Route } from "react-router-dom";

const App = () => {

	return (
		<Container>
			<Routes>	
				<Route path="/" element={<Upload />} />
				<Route path="/download" element={<Download />} />
			</Routes>
			<Contact />
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Poppins", sans-serif;
	font-style: normal;
`;
export default App;
