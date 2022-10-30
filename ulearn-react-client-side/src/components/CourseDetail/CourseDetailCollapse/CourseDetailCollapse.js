import React, { useState } from 'react';
import { Collapse, Space, Modal } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import './CourseDetailCollapse.css';

const { Panel } = Collapse;

const CourseDetailCollapse = ({ curriculum }) => {
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
				{curriculum.map((item) => {
					const {
						id,
						header,
						playIcon,
						copyIcon,
						desc1,
						desc2,
						desc3,
						lockIcon,
						introPreview,
						introTime,
						videoTime1,
						videoTime2,
						videoTime3,
						introPreview2,
					} = item;
					return (
						<Panel
							style={{
								borderBottom: 0,
							}}
							header={
								<Space className='text-[#040453] font-medium text-lg'>
									{header}
								</Space>
							}
							key={id}
							className='site-collapse-custom-panel collapseHeader course-detail-collapse-content'
						>
							<div className=' flex justify-between items-center'>
								<p className='flex items-center space-x-2 text-base capitalize text-gray-600  hover:text-font1 ml-1'>
									{playIcon}
									<span className='block text-[#040453] text-base font-medium'>
										{desc1}
									</span>
								</p>
								{/* ------------------------modal------------------------------ */}
								<div className='flex space-x-6 items-center'>
									{introPreview && (
										<>
											<button
												onClick={showModal}
												className='text-[#040453] text-base font-medium capitalize  pb-3'
											>
												preview
											</button>
											<Modal
												title='...'
												open={isModalOpen}
												onOk={handleOk}
												onCancel={handleCancel}
												width={800}
												className='course-detail-modal-footer course-detail-modal-header course-detail-modal-close course-detail-modal-content course-detail-modal-body'
											>
												<video controls>
													<source
														src='https://lmszai.zainikthemes.com/uploads/video/1657086898-cloud-syncs-dashboard.mp4'
														type='video/mp4'
													/>
												</video>
											</Modal>
										</>
									)}
									<p className='flex items-center space-x-4 text-[#040453]'>
										{lockIcon}
										<span className='block text-[#040453] text-base font-medium'>
											{introTime || videoTime1}
										</span>
									</p>
								</div>
							</div>
							<div className='flex  items-center justify-between'>
								<p className='flex items-center space-x-2 text-base capitalize text-gray-600  hover:text-font1 ml-1'>
									{playIcon}
									<span className='block text-[#040453] text-base font-medium'>
										{desc2}
									</span>
								</p>
								<p className='flex items-center space-x-4 text-[#040453]'>
									{lockIcon}
									{introPreview2 && (
										<span className='block text-[#040453] text-base font-medium capitalize'>
											{introPreview2}
										</span>
									)}
									<span className='block text-[#040453] text-base font-medium'>
										{introTime || videoTime2}
									</span>
								</p>
							</div>
							{desc3 && (
								<div className='flex  items-center justify-between'>
									<p className='flex items-center space-x-2 text-base capitalize text-gray-600  hover:text-font1 ml-1'>
										{copyIcon}
										<span className='block text-[#040453] text-base font-medium'>
											{desc3}
										</span>
									</p>
									<p className='flex items-center space-x-4 text-[#040453]'>
										{lockIcon}
										<span className='block text-[#040453] text-base font-medium '>
											{videoTime3}
										</span>
									</p>
								</div>
							)}
						</Panel>
					);
				})}
			</Collapse>
		</section>
	);
};

export default CourseDetailCollapse;
