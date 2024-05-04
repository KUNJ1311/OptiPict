import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import logo from "@/src/assets/logo.png";
import text_logo from "@/src/assets/text.svg";

const Navbar = () => {
	return (
		<header>
			<nav className={styles.navbar}>
				<Link href="/" className={styles.logo_link}>
					<Image src={logo} className={styles.logo1} alt="OptiPict Logo" />
					<Image src={text_logo} className={styles.logo2} alt="OptiPict" />
				</Link>
				<div className={styles.menu}>
					<ul>
						{/* <li>
							<Link href="/src/app/home">Home</Link>
						</li> */}
						{/* <li>
							<Link href="/src/app/blog">Blog</Link>
						</li> */}
					</ul>
				</div>
				<div className={styles.account}>
					<ul>
						<li>Login</li>
						<li>Signup</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
