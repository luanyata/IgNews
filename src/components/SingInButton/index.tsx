import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'
import { signIn, signOut, useSession } from 'next-auth/client'

const SignInButton = () => {
	const [session] = useSession()

	return session ? (
		<button
			type="button"
			className={styles.sigInButton}
			onClick={() => signOut()}
		>
			<FaGithub color="#04d361" />
			{session.user.name}
			<FiX color="#737380" className={styles.closeIcon} />
		</button >
	) : (
		<button
			type="button"
			className={styles.sigInButton}
			onClick={() => signIn('github')}
		>
			<FaGithub color="#eba417" />
				Sign in with Github
		</button >
	)
}


export default SignInButton
