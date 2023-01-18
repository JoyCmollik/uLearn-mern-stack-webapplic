import React, { useRef, useState } from 'react';
import { Button, Input, message, Spin } from 'antd';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { MdDelete, MdEdit } from 'react-icons/md';
import Loading from '../../../../components/layout/Loading/Loading';

const AddOutcomes = ({ handleActiveTab, outcome, setOutcome }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const outcomeRef = useRef(null);

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
		setIsUpdating(true);
		setOutcome((prevList) =>
			prevList.filter((prevItem) => prevItem !== item)
		);
		setIsUpdating(false);
	};

	return (
		<div className='grid grid-cols-12 w-11/12 gap-4 p-4'>
			<label className='col-span-12 text-font2 uppercase'>Outcomes</label>
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
						<span className='flex items-center'>
							<Loading size='small' />{' '}
							<span className='ml-2'>Adding...</span>
						</span>
					) : (
						<>
							<HiPlus size={18} /> <span>Add Outcome</span>
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
			<Button
				onClick={() => handleActiveTab('4')}
				className='col-span-2 mt-4'
				type='primary'
			>
				Next
			</Button>
		</div>
	);
};

export default AddOutcomes;
