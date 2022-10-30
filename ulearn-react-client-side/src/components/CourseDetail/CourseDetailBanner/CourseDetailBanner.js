import { Rate } from 'antd';
import React, { useState } from 'react';

const CourseDetailBanner = () => {
	//rating

	const [value, setValue] = useState(5);
	return (
		<section className='bg-gradient-to-r from-[#020024] to-[#090979] min-h-screen'>
			<div className=' grid grid-cols-2 container mx-auto  pt-56'>
				<div className='text-light     '>
					{/*-------------------title-------------------------*/}
					<h2 className='text-light text-[41px] font-medium tracking-wider'>
						Javascript: <br /> Understanding The <br /> Weird Parts
					</h2>
					<p className='text-base tracking-wide'>
						In This Course You Will GAIn A Deep UnderstAndIng Of
						<br />
						JAvAscript, leArn How JAvAscript Works Under The Hood,
						And <br />
						How thAt Knowledge Helps You Avoid Common pitfAlls And
						<br />
						drAsticAlly Improve Your Ability To Debug Problems. You
						Will <br />
						FInd clArity In The pArts thAt oThers, Even Experienced
						<br />
						Coders, mAy FInd Weird, Odd, And At Times
						Incomprehensible.
						<br />
					</p>
					<p>Johnny Depp | Level 1</p>
					{/* ------------------------rating-------------------- */}

					<ul className='flex space-x-4 items-center'>
						<li className='text-sm flex items-center'>
							{value ? (
								<span className='ant-rate-text text-sm'>
									{value}.0
								</span>
							) : (
								''
							)}
							<Rate
								onChange={setValue}
								value={value}
								style={{ fontSize: '13px' }}
							/>
						</li>

						<li className='text-sm'> (1)</li>
						<li className='text-sm'> 2 students</li>
					</ul>
				</div>
				<div className=' '></div>
			</div>
		</section>
	);
};

export default CourseDetailBanner;
