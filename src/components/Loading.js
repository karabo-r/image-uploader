import React from "react";
import { motion } from "framer-motion";
const Loading = ({ name }) => {
	return (
		<div className="file-loading">
			<h1 className="file-loading-title">{name}</h1>
			<div className="container">
				<motion.div
					className="element"
					animate={{ x: 230 }}
					transition={{
						repeat: Infinity,
						repeatType: "mirror",
						duration: 1.5,
					}}
				></motion.div>
			</div>
		</div>
	);
};

export default Loading;
