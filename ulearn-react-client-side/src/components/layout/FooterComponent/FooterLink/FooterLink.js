import React from 'react';

const FooterLink = (props) => {
	const {
		title,
		links,
		emailIcon,
		email,
		location,
		locationIcon,
		phone,
		phoneIcon,
	} = props.footerLinks;
	return (
		<div>
			{/*-------------------- title------------------ */}
			<h2 className='text-xl font-semibold text-light'>{title}</h2>

			{/*--------------------sublinks----------------- */}
			<article className='space-y-3 text-light'>
				{links?.map((link) => (
					<p key={link} className='text-light text-base'>
						{link}
					</p>
				))}
			</article>
			{/* ----------------contact info ----------------- */}
			<article className='space-y-3 '>
				<p className='flex gap-3 text-gray-200 '>
					<span className='block   text-xl'>{locationIcon}</span>
					<span className='block whitespace-pre-line text-base'>
						{location}
					</span>
				</p>
				<p className='flex gap-3 text-gray-200 '>
					<span className='block  text-xl'>{phoneIcon}</span>
					<span className='block text-base'>{phone}</span>
				</p>
				<p className='flex gap-3 text-gray-200 '>
					<span className='block  text-xl'>{emailIcon}</span>
					<span className='block text-base'>{email}</span>
				</p>
			</article>
		</div>
	);
};

export default FooterLink;
