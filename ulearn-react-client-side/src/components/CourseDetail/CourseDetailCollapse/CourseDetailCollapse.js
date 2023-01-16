import React, { useState } from 'react';
import { Collapse, Space, Modal } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import './CourseDetailCollapse.css';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';
import { AiOutlineLock } from 'react-icons/ai';
import { FiGrid } from 'react-icons/fi';

const { Panel } = Collapse;

const CourseDetailCollapse = ({ sections }) => {
	return (
		<section className='p-3'>
			{sections?.length &&
				sections.map((section) => {
					const { _id, sectionTitle, lessons } = section;

					return (
						<Collapse
							style={{
								background: 'white',
								marginBottom: '10px',
								borderRadius: '15px',
							}}
							expandIconPosition='end'
							defaultActiveKey={['1']}
							expandIcon={({ isActive }) => (
								<Space className=''>
									<UpOutlined
										style={{
											fontSize: '12px',
											color: '#040453',
										}}
										rotate={isActive ? 180 : 0}
									/>
								</Space>
							)}
						>
							<Panel
								style={{ borderRadius: '15px' }}
								header={
									<div className='flex justify-between items-center'>
										<div className='text-primary font-bold text-lg tracking-wider flex space-x-4 items-center'>
											<div className='bg-primary inline px-2 pb-1  rounded-full '>
												<FiGrid className='text-white inline ' />{' '}
											</div>
											<div> {sectionTitle}</div>
										</div>
										<div className='text-base text-gray-400'>
											{lessons?.length} parts
										</div>
									</div>
								}
								key={_id}
								className='site-collapse-custom-panel collapseHeader course-detail-collapse-content '
							>
								<div className='flex flex-col space-y-4'>
									{lessons.map((lesson) => (
										<div
											key={lesson?._id}
											className='flex justify-between items-center border border-gray-300 px-2 pb-1 pt-4  rounded-md'
										>
											<div className='flex items-center space-x-4 text-base capitalize text-gray-600  hover:text-font1 ml-1  '>
												<p className='bg-gray-200 px-2 inline pb-2 pt-1 rounded-full '>
													<HiOutlineDocumentCheck className='text-gray-500 inline text-lg' />
												</p>
												<p className='block  text-primary font-bold text-lg tracking-wider '>
													{lesson?.lessonTitle}
												</p>
											</div>
										</div>
									))}
								</div>
							</Panel>
						</Collapse>
					);
				})}
		</section>
	);
};

export default CourseDetailCollapse;
