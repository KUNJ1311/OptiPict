import Image from "next/image";
import styles from "./preview.module.css";

const Preview = (props) => {
	return (
		<>
			<div className={styles.preview} style={{ display: `${props.showPreview ? "flex" : "none"}` }}>
				{props.file && <Image src={props.file} width={0} height={0} style={{ width: "100%", height: "100%", padding: "5px", margin: "10px" }} alt="image for compress" />}
				<div className={styles.btn}>
					<button type="button" onClick={props.handleReSelect} className={styles.close}>
						<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
							<path d="M400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"></path>
						</svg>
					</button>
				</div>
			</div>
			<a className={styles.uploader_btn} title="Add more images" data-title="Add more images" style={{ display: `${props.showPreview ? "flex" : "none"}`, position: "relative", zIndex: "1" }}>
				<h3 style={{ fontSize: "25px", marginRight: "15px" }}>Compress IMAGE</h3>
				<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 1.91L1.78 1.5L15 7.44899V8.3999L1.78 14.33L1 13.91L2.58311 8L1 1.91ZM3.6118 8.5L2.33037 13.1295L13.5 7.8999L2.33037 2.83859L3.6118 7.43874L9 7.5V8.5H3.6118Z"></path>
				</svg>
			</a>
		</>
	);
};

export default Preview;
