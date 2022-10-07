import styled from "styled-components";
import Upload from "./components/Upload";
import Download from "./components/Download";
import { Routes, Route } from "react-router-dom";

const App = () => {
	return (
		<Container>
			<Routes>
				<Route path="/" element={<Upload />} />
				<Route path="/download" element={<Download />} />
			</Routes>
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
