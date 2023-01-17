import React, { useEffect, useRef, useState } from 'react';
import './BecomeContentWriter.css';
import { Input, message, Rate, Tag, theme, Tooltip } from 'antd';

import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import { HiOutlinePlus } from 'react-icons/hi2';
const BecomeContentWriter = () => {
	// for tags
	//const { token } = theme.useToken();
	const [tags, setTags] = useState([]);
	const [inputVisible, setInputVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [editInputIndex, setEditInputIndex] = useState(-1);
	const [editInputValue, setEditInputValue] = useState('');
	const inputRef = useRef(null);
	const editInputRef = useRef(null);
	useEffect(() => {
		if (inputVisible) {
			inputRef.current?.focus();
		}
	}, [inputVisible]);
	useEffect(() => {
		editInputRef.current?.focus();
	}, [inputValue]);
	const handleClose = (removedTag) => {
		const newTags = tags.filter((tag) => tag !== removedTag);
		console.log(newTags);
		setTags(newTags);
	};
	const showInput = () => {
		setInputVisible(true);
	};
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};
	const handleInputConfirm = () => {
		if (inputValue && tags.indexOf(inputValue) === -1) {
			setTags([...tags, inputValue]);
		}
		setInputVisible(false);
		setInputValue('');
	};
	const handleEditInputChange = (e) => {
		setEditInputValue(e.target.value);
	};
	const handleEditInputConfirm = () => {
		const newTags = [...tags];
		newTags[editInputIndex] = editInputValue;
		setTags(newTags);
		setEditInputIndex(-1);
		setInputValue('');
	};

	//end of tags
	const [person, setPerson] = useState({
		degreeTitle: '',
		institutionName: '',
		approxPassingYear: '',
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setPerson({ ...person, [name]: value });
	};

	const handleSubmit = (e) => {
		/* console.log(person);
		console.log(tags); */
		e.preventDefault();
		const { degreeTitle, institutionName, approxPassingYear } = person;

		if (
			degreeTitle &&
			institutionName &&
			approxPassingYear &&
			tags.length
		) {
			const data = {
				degreeTitle,
				institutionName,
				approxPassingYear,
				tags,
			};
			console.log(data);
			setPerson({
				degreeTitle: '',
				institutionName: '',
				approxPassingYear: '',
			});
			setTags([]);
		} else {
			message.warning('Inputs should be filled!');
		}
	};

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
						<div className='col-span-5 rounded-lg p-4 bg-light space-y-4'>
							<div className='px-4 py-2 rounded-lg border bg-white'>
								Content Creator
							</div>
							<div className='p-4 bg-white rounded-lg'>
								{/* <img
									className='w-full h-[250px] object-fit'
									src={courseImage}
									alt='course-imgs'
								/> */}
								<lottie-player
									autoplay
									loop
									background='white'
									src='https://assets5.lottiefiles.com/packages/lf20_tb15abek.json'
									style={{ width: '100%', height: '350px' }}
								/>
							</div>
						</div>

						{/*----------------------------------------right side of the page---------------------------------------------- */}

						<div className='col-span-7 flex justify-center items-center'>
							<div className='w-7/12 space-y-8'>
								{/* title */}
								<div className='space-y-2'>
									<h4 className='text-2xl font-medium'>
										Become Content Creator
									</h4>
								</div>
								{/*-----------------------------forms------------------------------------ */}
								<form
									onSubmit={handleSubmit}
									className='grid grid-cols-12 gap-4'
								>
									{/* form input */}
									<div className='col-span-12 form-control w-full'>
										<label className='label font-medium'>
											Degree Title
										</label>
										<input
											type='text'
											placeholder='Degree Title'
											name='degreeTitle'
											className='input input-bordered w-full'
											value={person.degreeTitle}
											onChange={handleChange}
										/>
									</div>

									{/* form input */}
									<div className='col-span-12 form-control w-full'>
										<label className='label font-medium'>
											Institution Name
										</label>
										<input
											type='text'
											placeholder='institutionName'
											name='institutionName'
											className='input input-bordered w-full'
											value={person.institutionName}
											onChange={handleChange}
										/>
									</div>
									{/* form input */}
									<div className='col-span-12 form-control w-full'>
										<label className='label font-medium'>
											Approximate Passing Year
										</label>
										<input
											type='text'
											placeholder='approxPassingYear'
											name='approxPassingYear'
											className='input input-bordered w-full'
											value={person.approxPassingYear}
											onChange={handleChange}
										/>
									</div>
									{/* tags for skill set */}
									<div className='col-span-12 form-control w-full'>
										<label className='label font-medium'>
											Skill Set
										</label>
										<div className='space-y-2 border rounded-lg p-2  '>
											{tags.map((tag, index) => {
												if (editInputIndex === index) {
													return (
														<Input
															ref={editInputRef}
															key={tag}
															size='large'
															className='tag-input  '
															value={
																editInputValue
															}
															onChange={
																handleEditInputChange
															}
															onBlur={
																handleEditInputConfirm
															}
															onPressEnter={
																handleEditInputConfirm
															}
														/>
													);
												}
												const isLongTag =
													tag.length > 20;
												const tagElem = (
													<Tag
														className='text-lg '
														closable
														size={14}
														key={tag}
														style={{
															userSelect: 'none',
														}}
														onClose={() =>
															handleClose(tag)
														}
													>
														<span
															className='close-icon-custom text-lg'
															onDoubleClick={(
																e
															) => {
																if (
																	index !== 0
																) {
																	setEditInputIndex(
																		index
																	);
																	setEditInputValue(
																		tag
																	);
																	e.preventDefault();
																}
															}}
														>
															{isLongTag
																? `${tag.slice(
																		0,
																		20
																  )}...`
																: tag}
														</span>
													</Tag>
												);
												return isLongTag ? (
													<Tooltip
														title={tag}
														key={tag}
													>
														{tagElem}
													</Tooltip>
												) : (
													tagElem
												);
											})}
											{inputVisible && (
												<Input
													ref={inputRef}
													type='text'
													size='large'
													className='tag-input '
													value={inputValue}
													onChange={handleInputChange}
													onBlur={handleInputConfirm}
													onPressEnter={
														handleInputConfirm
													}
												/>
											)}
											{!inputVisible && (
												<Tag onClick={showInput}>
													<span className='flex cursor-pointer justify-between items-center space-x-1 text-lg'>
														<HiOutlinePlus
															size={14}
														/>{' '}
														<span>skills</span>
													</span>
												</Tag>
											)}
										</div>
									</div>
									{/* end of tags */}
									{/* submit button */}
									<button
										type='submit'
										className='col-span-12 py-2 font-medium bg-primary text-white rounded-lg'
									>
										Submit
									</button>
								</form>
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

export default BecomeContentWriter;
