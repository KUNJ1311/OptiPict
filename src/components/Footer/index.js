import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";
import logo from "@/src/assets/logo.png";
import text_logo from "@/src/assets/text.svg";
import facebook from "@/src/assets/facebook.svg";
import instagram from "@/src/assets/instagram.svg";
import twitter from "@/src/assets/twitter.svg";
import linkedin from "@/src/assets/linkedin.svg";

const Footer = () => {
	return (
		<footer className={styles.footer_distributed}>
			<div className={styles.footer_left}>
				<h3>
					<Link href="/" className={styles.logo_link}>
						<Image src={logo} className={styles.logo1} alt="OptiPict Logo" />
						<Image src={text_logo} className={styles.logo2} alt="OptiPict" />
					</Link>
				</h3>

				<p className={styles.footer_links}>
					<a href="#">Home</a>

					<a href="#">Blog</a>

					<a href="#">Pricing</a>

					<a href="#">About</a>

					<a href="#">Faq</a>

					<a href="#">Contact</a>
				</p>

				<p className={styles.footer_company_name}>Copyright &copy; 2024</p>
			</div>

			<div className={styles.footer_center}>
				<div>
					<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd"></path>
					</svg>
					<p>
						<span>444 S. Cedros Ave</span> Solana Beach, California
					</p>
				</div>

				<div>
					<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
						<path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
					</svg>
					<p>+1.555.555.5555</p>
				</div>

				<div>
					<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
						<path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z"></path>
					</svg>
					<p>
						<a href="mailto:support@optipict.com">support@optipict.com</a>
					</p>
				</div>
			</div>

			<div className={styles.footer_right}>
				<p className={styles.footer_company_about}>
					<span>About the company</span>
					<strong>OptiPict</strong> is your simple solution for editing images online. Access all the tools you need to enhance your images easily, straight from the web, with 100% security.
				</p>

				<div className={styles.footer_icons}>
					<Link href={"/"}>
						<button className={styles.social_btn} type="button">
							<Image src={instagram} alt="instagram" width={27} height={27} priority={false} />
						</button>
					</Link>
					<Link href={"/"}>
						<button className={styles.social_btn} type="button">
							<Image src={twitter} alt="twitter" width={27} height={27} priority={false} />
						</button>
					</Link>
					<Link href={"/"}>
						<button className={styles.social_btn} type="button">
							<Image src={facebook} alt="facebook" width={27} height={27} priority={false} />
						</button>
					</Link>
					<Link href={"/"}>
						<button className={styles.social_btn} type="button">
							<Image src={linkedin} alt="linkedin" width={27} height={27} priority={false} />
						</button>
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
