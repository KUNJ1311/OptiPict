import Lottie from "lottie-react";
import animationData from "./animation.json";

const MyAnimation = () => {
	return (
		<div style={{ width: "250px", height: "250px", marginBottom: "18px" }}>
			<Lottie animationData={animationData} loop={true} />
			<span style={{ fontSize: "20px" }}>Compressing your image...</span>
		</div>
	);
};

export default MyAnimation;
