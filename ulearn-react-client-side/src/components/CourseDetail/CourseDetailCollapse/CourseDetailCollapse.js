import React, { useState } from 'react';
import { Collapse, Space, Modal } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import './CourseDetailCollapse.css';
import { IoCopy } from 'react-icons/io5';
import { AiOutlineLock } from 'react-icons/ai';

const { Panel } = Collapse;

const CourseDetailCollapse = ({ sections }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<section className='p-10'>
			<Collapse
				style={{ background: 'white' }}
				accordion
				bordered={false}
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
				{sections?.length &&
					sections.map((section) => {
						const { _id, sectionTitle, lessons } = section;

						return (
							<Panel
								style={{
									borderBottom: 0,
								}}
								header={
									<Space className='text-[#040453] font-medium text-lg'>
										{sectionTitle}
									</Space>
								}
								key={_id}
								className='site-collapse-custom-panel collapseHeader course-detail-collapse-content'
							>
								<div className='grid grid-cols-1 gap-3'>
									{lessons.map((lesson) => (
										<div
											key={lesson?._id}
											className='flex justify-between items-center'
										>
											<div className='flex items-center space-x-2 text-base capitalize text-gray-600  hover:text-font1 ml-1  '>
												<p>
													<IoCopy />
												</p>
												<p className='block text-[#040453] text-base font-medium'>
													{lesson?.lessonTitle}
												</p>
											</div>
											<p className=' text-[#040453]'>
												<AiOutlineLock />
											</p>
										</div>
									))}
								</div>
							</Panel>
						);
					})}
			</Collapse>
		</section>
	);
};

export default CourseDetailCollapse;
