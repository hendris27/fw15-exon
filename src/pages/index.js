import Link from 'next/link'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

import Image from 'next/image'
import logo from '../assets/img/logo.png'
import picture_home from '../assets/img/logo.png'

export default function Home() {
	return (
		<main className="h-screen">
			<div className="bg-login h-[500px] bg-cover bg-no-repeat ">
				<header className="flex justify-between px-[100px] pt-8 items-center">
					<div>
						<Image src={logo} className="w-[85px] h-[20px]" alt="picture_logo" />
					</div>
					<div className="flex gap-4">
						<div>
							<Link href="/auth/login">
								<button className="btn hover:bg-[#69BEB9] h-[35px] normal-case bg-transparent">Login</button>
							</Link>
						</div>
						<div>
							<Link href="auth/register">
								<button className="btn bnt-accent normal-case">Sign up</button>
							</Link>
						</div>
					</div>
				</header>
				<div className="flex justify-between pl-[100px] pr-[150px] ">
					<div className="flex flex-col bg-red-100">
						<div>Awesome App For Saving Time.</div>
						<div>We bring you a mobile app for banking problems that oftenly wasting much of your times.</div>
						<div>
							<button>Try It Free</button>
						</div>
					</div>
					<div></div>
				</div>
			</div>
		</main>
	)
}
