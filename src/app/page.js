import Card from "../components/Card/Card";
import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<main className={styles.main}>
				<div className={styles.bg_image}></div>
				<div className={styles.title}>
					<h1>
						Every tool you could want to <strong>edit images</strong> in bulk
					</h1>
					<h2>Your online photo editor is here and forever free!</h2>
				</div>
				<section className={styles.tools}>
					<div className={styles.tools_container}>
						<Card />
					</div>
				</section>
			</main>
		</>
	);
}
