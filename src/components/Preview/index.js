import Image from "next/image";
import styles from "./preview.module.css";
import { useState } from "react";
import MyAnimation from "../Animation";
import FileSizeComparison from "../SizeComparison/indxe";

const Preview = (props) => {
	const [url, setUrl] = useState("");
	const [compressing, setCompressing] = useState(false);
	const [size, setSize] = useState("");
	const handleCompress = async () => {
		setCompressing(true);
		let formData = new FormData();
		formData.append("file", props.file, props.file.name);
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/compress`, {
				method: "POST",
				body: formData,
			});
			const data = await res.json();
			if (data.success) {
				const byteCharacters = atob(data.image_data);
				const byteNumbers = new Array(byteCharacters.length);
				calculateSize(byteNumbers);
				for (let i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}
				const byteArray = new Uint8Array(byteNumbers);
				const blob = new Blob([byteArray], { type: "image/jpeg" });
				const image = window.URL.createObjectURL(blob);
				const url = { image: image, filename: data.filename };
				setUrl(url);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setCompressing(false);
		}
	};

	const calculateSize = (byteNumbers) => {
		const newImageSizeInBytes = byteNumbers.length;
		const newImageSizeInKB = newImageSizeInBytes / 1024;

		const binaryOldImageData = atob(props.fileURL.split(",")[1]);
		const oldImageSizeInBytes = binaryOldImageData.length;
		const oldImageSizeInKB = oldImageSizeInBytes / 1024;

		setSize({ newSize: newImageSizeInKB.toFixed(2), oldSize: oldImageSizeInKB.toFixed(2) });
	};
	const handleDownload = () => {
		if (url) {
			const downloadLink = document.createElement("a");
			downloadLink.href = url.image;
			downloadLink.download = url.filename;
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
			setUrl("");
			props.setFileURL("");
			props.setShowPreview(false);
		}
	};
	return (
		<>
			{url ? (
				<>
					{size && <FileSizeComparison oldSize={size.oldSize} newSize={size.newSize} />}
					<button type="button" onClick={handleDownload} className={styles.uploader_btn} title="Download Image" data-title="Download Image" style={{ display: `${props.showPreview ? "flex" : "none"}`, position: "relative", zIndex: "1" }}>
						<h3 style={{ fontSize: "25px", marginRight: "15px" }}>Download Image</h3>
						<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1.91L1.78 1.5L15 7.44899V8.3999L1.78 14.33L1 13.91L2.58311 8L1 1.91ZM3.6118 8.5L2.33037 13.1295L13.5 7.8999L2.33037 2.83859L3.6118 7.43874L9 7.5V8.5H3.6118Z"></path>
						</svg>
					</button>
				</>
			) : (
				<>
					{compressing ? (
						<MyAnimation />
					) : (
						<>
							<div className={styles.preview} style={{ display: `${props.showPreview ? "flex" : "none"}` }}>
								{props.fileURL && <Image src={props.fileURL} width={0} height={0} style={{ width: "100%", height: "100%", padding: "5px", margin: "10px" }} alt="image for compress" />}
								<div className={styles.btn}>
									<button type="button" onClick={props.handleReSelect} className={styles.close}>
										<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
											<path d="M400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"></path>
										</svg>
									</button>
								</div>
							</div>
							<button type="button" onClick={handleCompress} className={styles.uploader_btn} title="Compress Image" data-title="Compress Image" style={{ display: `${props.showPreview ? "flex" : "none"}`, position: "relative", zIndex: "1" }}>
								<h3 style={{ fontSize: "25px", marginRight: "15px" }}>Compress IMAGE</h3>
								<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
									<path d="M1 1.91L1.78 1.5L15 7.44899V8.3999L1.78 14.33L1 13.91L2.58311 8L1 1.91ZM3.6118 8.5L2.33037 13.1295L13.5 7.8999L2.33037 2.83859L3.6118 7.43874L9 7.5V8.5H3.6118Z"></path>
								</svg>
							</button>
						</>
					)}
				</>
			)}
		</>
	);
};

export default Preview;
