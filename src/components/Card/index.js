import React from "react";
import styles from "./card.module.css";
import Link from "next/link";
import Image from "next/image";
import compress from "@/src/assets/compress.png";

const Card = () => {
	return (
		<div className={styles.tools_card}>
			<Link href={"/compress-image"} title="Compress IMAGE">
				<div className={styles.icon}>
					<Image src={compress} width={60} height={60} alt="Compress Image" />
				</div>
				<h3>Compress Image</h3>
				<div className={styles.data}>
					<p>
						Compress <strong>JPG</strong>, <strong>PNG</strong>, <strong>SVG</strong>, and <strong>GIFs</strong> while saving space and maintaining quality.
					</p>
				</div>
			</Link>
		</div>
	);
};

export default Card;
