import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { api } from '../../services/axios'
import { getStripeJs } from '../../services/stripejs'
import styles from './styles.module.scss'
// interface SessionProps extends Session {
//   activeSubscription: {} | null
// }

const SubscribeButton = () => {
  const [session] = useSession()
  const router = useRouter()

  const handleSubcribe = async () => {
    if (!session) {
      signIn('githunb')
      return
    }

    //@ts-ignore
    if (session.accessToken) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      stripe.redirectToCheckout({ sessionId })

    } catch (err) {
      alert(err.message)
    }

  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubcribe}>
      Subscribe now
    </button>
  )
}

export default SubscribeButton
