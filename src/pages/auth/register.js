import React from 'react'
import Link from 'next/link'
import { GoMail } from 'react-icons/go'
import { BiLock } from 'react-icons/bi'
import Image from 'next/image'
import bg_login_side from '../../assets/img/bg_login_side.png'
import logo from '../../assets/img/logo.png'

function register() {
	return (
		<div className="flex h-screen">
			<div className="bg-login w-[50%] bg-cover bg-no-repeat md:block hidden flex flex-col justify-center items-center px-12 py-8">
				<div className="">
					<Image src={logo} className="w-[85px] h-[20px]" alt="picture_logo" />
				</div>
				<div className="flex items-center justify-center">
					<div className="flex items-center justify-center">
						<Image src={bg_login_side} className="w-[100%]" alt="picture_bg" />
					</div>
				</div>
				<div className="flex flex-col gap-12 mt-8">
					<div className="font-bold text-[24px] ">App that Covering Banking Needs.</div>
					<div>Exon is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.</div>
				</div>
			</div>
			<div className="bg-white flex flex-1 pl-16 pr-[110px] py-8 justify-center items-center">
				<div className="">
					<form className="flex flex-col gap-3 w-full ">
						<div className="text-[24px] leading-[33px] font-bold w-full pr-8">
							<div> Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</div>
						</div>
						<div className="font-semi-bold text-[16px] leading-[30px] ">Transfering money is eassier than ever, you can access Exon wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</div>
						<div className="relative border-b-2 w-full">
							<input type="email" placeholder="Enter your e-mail" className="input w-full  pl-10 outline-none hover:outline-none hover:border-0" />
							<div className="absolute bottom-2 left-0">
								<GoMail size={30} />
							</div>
						</div>
						<div className="relative border-b-2 w-full">
							<input type="password" placeholder="Enter your password" className="input w-full  pl-10 outline-none hover:outline-none hover:border-0" />
							<div className="absolute bottom-2 left-0">
								<BiLock size={30} />
							</div>
						</div>
						<div className="w-full mt-12">
							<button className="btn  bg-[#69BEB9] hover:bg-[#FECC01] w-full">login</button>
						</div>
						<p className="text-right">
							<Link className="font-bold" href="/forgotpassword">
								Forgot Password?
							</Link>
						</p>
					</form>
					<div className="flex items-center justify-center">
						<div className="mt-8">
							Don`t have an account?
							<Link className="font-bold" href="/register">
								Register Here
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default register
