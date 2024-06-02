"use client";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./compress.module.css";
import Preview from "@/src/components/Preview";

const CompressImage = () => {
	const [file, setFile] = useState();
	const [display, setDisplay] = useState(false);
	const [showPreview, setShowPreview] = useState(false);
	const [fileURL, setFileURL] = useState();

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: async (acceptedFiles) => {
			setDisplay(false);
			setShowPreview(true);
			setFile(acceptedFiles[0]);
			let fileReader = new FileReader();
			fileReader.onload = () => {
				let fileURL = fileReader.result;
				setFileURL(fileURL);
			};
			fileReader.readAsDataURL(acceptedFiles[0]);
		},
	});

	useEffect(() => {
		const handleDragEnter = () => {
			setDisplay(true);
		};

		const handleDrop = () => {
			setDisplay(false);
		};
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				setDisplay(false);
			}
		};

		document.addEventListener("dragenter", handleDragEnter);
		document.addEventListener("drop", handleDrop);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("dragenter", handleDragEnter);
			document.removeEventListener("drop", handleDrop);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const handleReSelect = () => {
		setShowPreview(false);
	};
	return (
		<div className={styles.compress_image}>
			<div style={{ minHeight: "100%", flex: "1", display: "flex", flexDirection: "column", alignItems: "center" }}>
				<div className={styles.bg_image}></div>
				<div className={styles.tool_workarea} id="workArea">
					<div className={styles.tool_header}>
						<h1 className={styles.tool_header_title}>Compress IMAGE</h1>
						<h2 className={styles.tool_header_subtitle}>
							Compress <b>JPG</b>, <b>PNG</b>, <b>SVG</b>, or <b>JPEG</b> with the best quality and compression.
							<br /> Reduce the filesize of your image.
						</h2>
					</div>
					<Preview showPreview={showPreview} file={file} fileURL={fileURL} setShowPreview={setShowPreview} setFileURL={setFileURL} handleReSelect={handleReSelect} />
					<div id="uploader" className={styles.uploader} style={{ display: `${showPreview ? "none" : ""}` }}>
						<a id="pickfiles" className={styles.uploader_btn} title="Add more images" data-title="Add more images" style={{ position: "relative", zIndex: "1" }} {...getRootProps()}>
							<h3>Select image</h3>
							<input encType="multipart/form-data" name="file" type="file" style={{ fontSize: "999px", opacity: "0", position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }} accept=".jpg,.jpeg,.png,.gif,.svg" tabIndex="-1" {...getInputProps()} />
						</a>
						<div className={styles.uploader_droptxt}>or drop image here</div>
					</div>
				</div>
				<div style={{ minHeight: "100%", width: "100%", flex: "1", display: `${showPreview ? "none" : display ? "flex" : "none"}`, position: "fixed", zIndex: "1000", overflow: "hidden", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0, 0, 0, 0.251)" }}>
					<div className={styles.container} {...getRootProps()}>
						<div className={styles.drag_area}>
							<div className={styles.icon}>
								<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg">
									<path d="M450.29 112H142c-34 0-62 27.51-62 61.33v245.34c0 33.82 28 61.33 62 61.33h308c34 0 62-26.18 62-60V173.33c0-33.82-27.68-61.33-61.71-61.33zm-77.15 61.34a46 46 0 1 1-46.28 46 46.19 46.19 0 0 1 46.28-46.01zm-231.55 276c-17 0-29.86-13.75-29.86-30.66v-64.83l90.46-80.79a46.54 46.54 0 0 1 63.44 1.83L328.27 337l-113 112.33zM480 418.67a30.67 30.67 0 0 1-30.71 30.66H259L376.08 333a46.24 46.24 0 0 1 59.44-.16L480 370.59z"></path>
									<path d="M384 32H64A64 64 0 0 0 0 96v256a64.11 64.11 0 0 0 48 62V152a72 72 0 0 1 72-72h326a64.11 64.11 0 0 0-62-48z"></path>
								</svg>
							</div>
							<div className={styles.extra}>Drop your image here</div>
							<div className={styles.support}>Supports: JPG, PNG, SVG, JPEG</div>
						</div>
						<input encType="multipart/form-data" name="file" type="file" style={{ fontSize: "999px", opacity: "0", position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }} accept=".jpg,.jpeg,.png,.gif,.svg" tabIndex="-1" {...getInputProps()} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompressImage;
