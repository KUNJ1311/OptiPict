import styles from "./FileSizeComparison.module.css";
const FileSizeComparison = ({ oldSize, newSize }) => {
	const sizeRatio = (oldSize - newSize) / oldSize;
	const formatFileSize = (size) => {
		const units = ["KB", "MB", "GB"];
		let i = 0;
		let newSize = size;

		while (newSize > 1024 && i < units.length - 1) {
			newSize /= 1024;
			i++;
		}

		return `${Number(newSize).toFixed(2)}${units[i]}`;
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.title}>File Size Comparison</h3>
				<p className={styles.description}>Original vs. Compressed Size</p>
			</div>
			<div className={styles.comparisonBar}>
				<span className={styles.oldSizeText}>{formatFileSize(oldSize)}</span>
				<span className={styles.newSizeText}>{formatFileSize(newSize)}</span>
			</div>
		</div>
	);
};

export default FileSizeComparison;
