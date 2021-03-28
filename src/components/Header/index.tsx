import SignInButton from '../SingInButton'
import styles from './styles.module.scss'


const Header = () => {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<img src="/images/logo.svg" alt="ig.news" />
				<nav>
					<a className={styles.active} href="">Home</a>
					<a href="">Posts</a>
				</nav>
				<SignInButton />
			</div>
		</header>
	)
}


export default Header