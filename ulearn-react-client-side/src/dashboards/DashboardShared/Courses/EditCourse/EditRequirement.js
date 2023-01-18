import React, { useEffect, useRef, useState } from 'react';

// library imports
import { Input, message, Spin } from 'antd';
import { HiMinus, HiPlus } from 'react-icons/hi2';
import { v4 as uuid } from 'uuid';
import { MdDelete } from 'react-icons/md';
import Loading from '../../../../components/layout/Loading/Loading';

const EditRequirement = ({ course, handleUpdateCourse, isUpdating }) => {
	const [requirement, setRequirement] = useState([
		...course.courseRequirements,
	]);
	const requirementRef = useRef(null);

	useEffect(() => {
		if (course) {
			setRequirement([...course.courseRequirements]);
		}
	}, [course]);

	const handleRequirementList = (e) => {
		e.preventDefault();
		const curRequirement = requirementRef.current.value;
		if (curRequirement === null || curRequirement.trim() === '') {
			message.warning('Outcome input is empty!');
			return;
		}

		setRequirement((prevList) => [...prevList, curRequirement]);
		requirementRef.current.value = '';
	};

	const handleDeleteItem = (e, item) => {
		e.preventDefault();
		setRequirement((prevList) =>
			prevList.filter((prevItem) => prevItem !== item)
		);
	};

	const handleUpdateRequirements = () => {
		handleUpdateCourse({ ...course, courseRequirements: [...requirement] });
	};

	return (
		<>
			{!course ? (
				<div className='flex justify-center items-center h-[40vh]'>
					<Spin />
				</div>
			) : (
				<div className='border rounded-lg h-fit w-11/12'>
					<div className='grid grid-cols-12 gap-4 p-4'>
						<label className='col-span-12 text-font2 capitalize'>
							Requirements
						</label>
						<div className='col-span-12 grid grid-cols-12 border rounded-lg p-1'>
							<input
								autoFocus={true}
								ref={requirementRef}
								className='col-span-8 outline-none bg-transparent border-none px-2'
								size='large'
							/>
							<button
								onClick={handleRequirementList}
								className='col-span-4 px-4 py-1 border border-primary rounded-lg text-primary disabled:border-blue-200 flex justify-center items-center space-x-2'
								disabled={isUpdating}
							>
								{isUpdating ? (
									<>
										<Loading />{' '}
										<span className='ml-2'>Adding...</span>
									</>
								) : (
									<>
										<HiPlus size={18} />{' '}
										<span>Add Requirement</span>
									</>
								)}
							</button>
						</div>
						{requirement.length > 0 && (
							<div className='col-span-12 border rounded-lg p-2 space-y-2'>
								{requirement.map((requirement, requIdx) => (
									<div
										className='flex justify-between items-center p-2 border rounded-lg'
										key={requIdx}
									>
										<p className='m-0'> {requirement} </p>
										<div className='flex items-start space-x-2'>
											{/* <button className='p-1 border border-primary rounded-lg text-xs text-primary'>
								<MdEdit size={16} />
							</button> */}

											<button
												onClick={(e) =>
													handleDeleteItem(
														e,
														requirement
													)
												}
												className='p-1 border border-error bg-error rounded-lg text-xs text-white'
											>
												<MdDelete size={16} />
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
					<div className='p-4 bg-light'>
						<button
							onClick={handleUpdateRequirements}
							className='px-4 py-1 border border-primary rounded-lg text-primary disabled:border-blue-200'
							disabled={isUpdating}
						>
							{isUpdating ? (
								<span className='flex items-center'>
									<Loading size='small' />{' '}
									<span className='ml-2'>Updating...</span>
								</span>
							) : (
								'Update Requirements'
							)}
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default EditRequirement;
