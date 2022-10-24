import React from 'react';
import {
	AiFillFacebook,
	AiFillTwitterSquare,
	AiFillLinkedin,
} from 'react-icons/ai';
import { FaPinterestSquare } from 'react-icons/fa';
import FooterLink from '../FooterLink/FooterLink';
import logo from '../../../../images/ULearn_Logo.png';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { HiPhone } from 'react-icons/hi2';
import { Divider } from 'antd';

const iconlist = [
	{ id: 51, icon: <AiFillFacebook className='text-2xl text-white' /> },
	{ id: 52, icon: <AiFillTwitterSquare className='text-2xl text-white' /> },
	{ id: 53, icon: <AiFillLinkedin className='text-2xl text-white' /> },
	{ id: 54, icon: <FaPinterestSquare className='text-2xl text-white' /> },
];

const footerLinks = [
	{
		title: 'Company',
		links: ['About', 'FAQ', 'Blog'],
	},

	{
		title: 'Support',
		links: ['Contact', 'Support', 'Courses'],
	},

	{
		title: 'Contact Info',
		email: 'demo@mail.com',
		phone: '(123-458-987254824185)',
		location: `45/7 dreem street, albania   
		 dnobod, USA`,
		emailIcon: <MdEmail />,
		locationIcon: <MdLocationOn />,
		phoneIcon: <HiPhone />,
	},
];

const FooterComponent = () => {
	return (
		<section className='min-h-full container mx-auto'>
			<div className='flex flex-row items-center pl-20 py-16 space-x-16'>
				{/* --------------------- logo and title ------------------------*/}
				<article className='flex flex-col justify-start items-start border border-black space-y-4 '>
					<article className='flex items-center space-x-2 '>
						<div className=''>
							<img src={logo} alt='' />
						</div>
						<h2 className='font-bold text-2xl text-light'>
							ULearn
						</h2>
					</article>
					<article>
						{/* --------------------- description  ------------------------*/}
						<p className='text-base text-light'>
							Mere tranquil existence, that I neglect <br /> my
							talents. I should be incapable of <br /> drawing a
							single stroke at the present
						</p>
						{/* ---------------------icon list------------------------*/}
						<div className='flex space-x-2'>
							{iconlist.map((list) => (
								<span
									key={list.id}
									className='inline-block rounded-full'
								>
									{list.icon}
								</span>
							))}
						</div>
					</article>
				</article>
				{/*-----------------------footerLink---------------------------*/}
				<article className='flex justify-between space-x-44'>
					{footerLinks.map((footerLink) => (
						<FooterLink
							key={footerLink.title}
							footerLinks={footerLink}
						/>
					))}
				</article>
			</div>
			<article className='px-16'>
				<Divider style={{ background: 'white' }} />
				<div className='flex flex-row items-center justify-between px-3'>
					<div>
						{/*-----------------------brandImg---------------------------*/}
						<img
							src='https://lmszai.zainikthemes.com/frontend/assets/img/payment-cards.png'
							alt=''
						/>
					</div>
					<div className='text-light'>
						<p>© 2021 LMSZAI. All Rights Reserved.</p>
					</div>
					<div>
						<ul className='flex flex-row space-x-3 font-semibold text-light'>
							<li>Become Instructor</li>
							<li>Privacy Policy</li>
							<li>Cookie Policy</li>
						</ul>
					</div>
				</div>
			</article>
		</section>
	);
};

export default FooterComponent;
