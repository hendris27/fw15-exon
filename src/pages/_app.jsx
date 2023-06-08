import '@/styles/globals.css'
import LoadingBar from '../components/loading-bar'
import { Nunito } from 'next/font/google'

const nunito = Nunito({
	weight: '300',
	subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
	return (
		<main className={nunito.className}>
			<LoadingBar />
			<Component {...pageProps} />
		</main>
	)
}
