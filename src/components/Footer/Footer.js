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
					<i className="fa fa-map-marker"></i>
					<p>
						<span>444 S. Cedros Ave</span> Solana Beach, California
					</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>+1.555.555.5555</p>
				</div>

				<div>
					<i className="fa fa-envelope"></i>
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
