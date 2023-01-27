import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';

const Section = ({ data }) => {
	const {
		sectionIdx,
		sectionItem,
		currSection,
		handleCurrSection,
		loadingStatus,
		handleDeleteSection,
	} = data;
	return (
		<>
			{/*****--------------Section Item---------------*****/}
			<article
				key={sectionItem?._id}
				onClick={() => handleCurrSection(sectionItem)}
				className={`flex justify-between items-center px-2 py-2 border-l-2 bg-primary cursor-pointer bg-opacity-5 ${
					currSection._id === sectionItem._id
						? 'border-l-primary'
						: 'border-l-transparent'
				}`}
			>
				<div>
					<h5 className='text-lg font-light m-0'>
						Section {sectionIdx + 1}
					</h5>
					<p className='m-0 text-xs font-light text-font2'>
						Lessons: {sectionItem?.lessons?.length || 0}
					</p>
				</div>
				{currSection._id === sectionItem._id ? (
					<Popconfirm
						title='Are you sure to delete this section?'
						onConfirm={() => handleDeleteSection(sectionItem._id)}
						okText='Yes'
						cancelText='No'
					>
						<button className='p-1 border-[0.5px] border-error bg-transparent text-error flex items-center rounded-lg'>
							{loadingStatus?.isDeleting &&
							loadingStatus.currSection === sectionItem._id ? (
								<LoadingOutlined
									style={{
										fontSize: 16,
									}}
									spin
								/>
							) : (
								<MdDeleteOutline size={18} />
							)}
						</button>
					</Popconfirm>
				) : null}
			</article>
		</>
	);
};

export default Section;
