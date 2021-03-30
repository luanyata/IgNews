import styles from './styles.module.scss'

interface SubscribeProps {
	priceId: string
}

const SubscribeButton = ({ priceId }: SubscribeProps) => {
	return (
		<button
			type="button"
			className={styles.subscribeButton}>
			Subscriber now
		</button>
	)
}

export default SubscribeButton
