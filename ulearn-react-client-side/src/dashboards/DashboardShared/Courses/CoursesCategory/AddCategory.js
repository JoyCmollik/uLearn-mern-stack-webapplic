import { Button, Input, PageHeader, Upload } from 'antd';
import React from 'react';
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';
import addCategory from '../../../../images/add_category.svg';

const AddCategory = () => {
	return (
		<div className='border-[0.5px] rounded-lg overflow-hidden '>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title='Add a new category'
				subTitle='if you go back, no changes are saved....'
			>
				<div className='grid grid-cols-12 min-h-[25vh] rounded-lg p-4'>
					<div className='col-span-5 bg-white'>
						<form className='grid grid-cols-12 gap-4 p-8 bg-light rounded-lg'>
							{/* input item */}
							<div className='col-span-12 space-y-2 flex flex-col'>
								<label className='text-font2 uppercase'>
									Category Title
								</label>
								<Input size='large' name='title' />
							</div>
							<div className='col-span-12 space-y-2 flex flex-col'>
								<label className='text-font2 uppercase'>
									Category Thumbnail
								</label>
								<Upload.Dragger name='files'>
									<p className='ant-upload-drag-icon text-center'>
										<LordIcon
											src='https://cdn.lordicon.com/fgkmrslx.json'
											size={40}
										/>
									</p>
									<p className='ant-upload-text'>
										Click or drag file to this area to
										upload
									</p>
									<p className='ant-upload-hint'>
										Please select only one picture.
									</p>
								</Upload.Dragger>
							</div>
							<Button className='col-span-12 mt-4' type='primary'>
								Add Category
							</Button>
						</form>
					</div>
					<div className='col-span-7'>
						<img className='object-cover w-10/12 mx-auto' src={addCategory} alt='add-category' />
					</div>
				</div>
			</PageHeader>
		</div>
	);
};

export default AddCategory;
