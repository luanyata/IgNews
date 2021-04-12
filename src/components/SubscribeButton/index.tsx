import { Session } from 'next-auth'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { api } from '../../services/axios'
import { getStripeJs } from '../../services/stripejs'
import styles from './styles.module.scss'

interface SubscribeProps {
  priceId: string
}

interface SessionProps extends Session {
  activeSubscription: {} | null
}

const SubscribeButton = ({ priceId }: SubscribeProps) => {
  const [session] = useSession()
  const router = useRouter()

  const handleSubcribe = async () => {
    if (!session) {
      signIn('githunb')
      return
    }

    if ((session as SessionProps).activeSubscription) {
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
      Subscriber now
    </button>
  )
}

export default SubscribeButton
