import React from 'react';
import {
	AiFillFacebook,
	AiFillTwitterSquare,
	AiFillLinkedin,
} from 'react-icons/ai';
import { FaPinterestSquare } from 'react-icons/fa';
import logo from '../../../../images/ulearn_logo.png';
import { Divider } from 'antd';
import { SpaceContext } from 'antd/lib/space';

const iconlists = [
	{ id: 51, icon: <AiFillFacebook className='text-2xl text-white' /> },
	{ id: 52, icon: <AiFillTwitterSquare className='text-2xl text-white' /> },
	{ id: 53, icon: <AiFillLinkedin className='text-2xl text-white' /> },
	{ id: 54, icon: <FaPinterestSquare className='text-2xl text-white' /> },
];

const footerLinks = [
	{
		title: 'About Us',
		desc: 'ULearn is a fully-featured content based management system. This platform helps instructors to create professional education materials and helps students to learn from the best instructors',
	},
	{
		title: 'Additional Links',
		links: ['Login', 'Register', 'Becomes Instructor'],
	},
	{
		title: 'Similar Business',
		links: ['Udemy', 'Skillshare', 'Coursera'],
	},

	{
		title: 'ULearn - Student-led Learning & Collaboration LMS',
		img: logo,
	},
];

const FooterComponent = () => {
	return (
		<section className='min-h-full container mx-auto pt-10'>
			<div className='grid grid-cols-4 items-center justify-center gap-4  space-y-2'>
				{footerLinks.map((footerlink, index) => {
					return (
						<div key={index} className='mx-auto'>
							<h2 className='text-white text-2xl tracking-wider'>
								{footerlink?.title}
							</h2>
							<p className='text-lg text-white'>
								{footerlink?.desc}
							</p>
							<div className='flex flex-col '>
								{footerlink?.links?.map((link, index) => (
									<p
										key={index}
										className='text-white text-lg'
									>
										{' '}
										- {link}
									</p>
								))}
							</div>
							{footerlink?.img && (
								<img
									src={footerlink.img}
									className='w-[120px] object-cover '
									alt=''
								/>
							)}
						</div>
					);
				})}
			</div>
			<Divider className='bg-white' />
			<div className='flex justify-between items-center'>
				<div className='flex items-center space-x-2'>
					<img className='w-[100px]' src={logo} alt='' srcset='' />
					<h2 className='text-lg text-white'>ULearn</h2>
				</div>
				<div className='flex'>
					{iconlists.map((iconlist) => (
						<span key={iconlist?.id}>{iconlist?.icon}</span>
					))}
				</div>
			</div>
		</section>
	);
};

export default FooterComponent;
