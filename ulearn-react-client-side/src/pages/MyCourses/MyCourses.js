import React from 'react';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';

import noDataImg from '../../images/client.svg';
import courseImage from '../../images/learner.svg';
import { MdDeleteOutline } from 'react-icons/md';
import { Popconfirm } from 'antd';

const MyCourses = () => {
	return (
		<>
			<NavigationBar theme='light' />
			<section>
				<div className='bg-light h-[25vh]'></div>
				<div
					className='bg-white'
					style={{ minHeight: 'calc(75vh - 81px)' }}
				>
					{/* container */}
					<div className='transform -translate-y-[10vh] container mx-auto bg-white rounded-lg grid grid-cols-12 p-4 h-full drop-shadow'>
						{/* ---------- My Courses Nav ---------- */}
						<div className='col-span-4 rounded-lg p-4 bg-light space-y-4'>
							<div className='px-4 py-2 rounded-lg border bg-white'>
								My Courses
							</div>
							<div className='p-4 bg-white rounded-lg'>
								<img
									className='w-full h-[250px] object-fit'
									src={courseImage}
									alt='course-imgs'
								/>
							</div>
						</div>
						{/* ---------- My Courses List ---------- */}
						<div className='col-span-8 p-4 space-y-4'>
							<h4 className='text-xl font-medium'>My Courses</h4>
							<hr />
							<div className='grid grid-cols-3 gap-4 justify-between'>
								{/* course */}
								<article className='relative p-4 border rounded-lg flex flex-col justify-between'>
									<img
										className='w-full h-[250px] border object-fit'
										src={noDataImg}
										alt='course-load'
									/>
									{/* course - body */}
									<div>
										<h5 className='text-lg'>
											Learn Python
										</h5>
									</div>
									{/* button */}
									<button className='inline-block w-full py-2 border border-primary rounded-lg text-primary drop-shadow hover:bg-primary hover:text-white'>
										Go To Content Page
									</button>
									<Popconfirm>
										<button className='absolute top-1 right-1 p-0.5 text-error rounded-lg border border-error'>
											<MdDeleteOutline size={17} />
										</button>
									</Popconfirm>
								</article>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div style={{ background: '#040453' }}>
				<FooterComponent />
			</div>
		</>
	);
};

export default MyCourses;
