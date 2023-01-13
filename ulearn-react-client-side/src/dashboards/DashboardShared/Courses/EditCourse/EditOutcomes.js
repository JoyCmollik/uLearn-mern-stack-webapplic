import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Input, message, Spin } from 'antd';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

const EditOutcomes = ({ course, handleUpdateCourse, isUpdating }) => {
	const [outcome, setOutcome] = useState([...course.courseOutcomes]);
	const outcomeRef = useRef(null);

	useEffect(() => {
		if(course) {
			setOutcome([...course.courseOutcomes]);
		}
	}, [course]);

	const handleOutcomeList = (e) => {
		e.preventDefault();
		const currOutcome = outcomeRef.current.value;
		if (currOutcome === null || currOutcome.trim() === '') {
			message.warning('Outcome input is empty!');
			return;
		}

		setOutcome((prevList) => [...prevList, currOutcome]);
		outcomeRef.current.value = '';
	};

	const handleDeleteItem = (e, item) => {
		e.preventDefault();
		setOutcome((prevList) =>
			prevList.filter((prevItem) => prevItem !== item)
		);
	};

	const handleUpdateOutcomes = () => {
		handleUpdateCourse({...course, courseOutcomes: [...outcome]});
	}

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
							Outcomes
						</label>
						<div className='col-span-12 grid grid-cols-12 border rounded-lg p-1'>
							<input
								autoFocus={true}
								ref={outcomeRef}
								className='col-span-8 outline-none bg-transparent border-none px-2'
								size='large'
							/>
							<button
								onClick={handleOutcomeList}
								className='col-span-4 px-4 py-1 border border-primary rounded-lg text-primary disabled:border-blue-200 flex justify-center items-center space-x-2'
								disabled={isUpdating}
							>
								{isUpdating ? (
									<>
										<Spin size='small' />{' '}
										<span className='ml-2'>Adding...</span>
									</>
								) : (
									<>
										<HiPlus size={18} />{' '}
										<span>Add Outcome</span>
									</>
								)}
							</button>
						</div>
						{outcome.length > 0 && (
							<div className='col-span-12 border rounded-lg p-2 space-y-2'>
								{outcome.map((outcome, OutcIdx) => (
									<div
										className='flex justify-between items-center p-2 border rounded-lg'
										key={OutcIdx}
									>
										<p className='m-0'> {outcome} </p>
										<div className='flex items-start space-x-2'>
											{/* <button className='p-1 border border-primary rounded-lg text-xs text-primary'>
								<MdEdit size={16} />
							</button> */}

											<button
												onClick={(e) =>
													handleDeleteItem(e, outcome)
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
							onClick={handleUpdateOutcomes}
							className='px-4 py-1 border border-primary rounded-lg text-primary disabled:border-blue-200'
							disabled={isUpdating}
						>
							{isUpdating ? (
								<>
									<Spin size='small' />{' '}
									<span className='ml-2'>Updating...</span>
								</>
							) : (
								'Update Course Price'
							)}
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default EditOutcomes;
