import styled from "styled-components";
import Upload from "./components/Upload";
import Download from "./components/Download";
import { Routes, Route } from "react-router-dom";
// import UploadSuccess from "./components/UploadSuccess";
// import image from './assets/default-preview.svg'

const App = () => {
	return (
		<Container>
			{/* <UploadSuccess file={{imagePath: image, imageID: 'test'}} /> */}
			<Routes>
				<Route path="/" element={<Upload />} />
				<Route path="/download" element={<Download />} />x{" "}
			</Routes>
		</Container>
	);
};

const Container = styled.div`
	font-family: "Poppins", sans-serif;
	font-style: normal;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`
export default App;
