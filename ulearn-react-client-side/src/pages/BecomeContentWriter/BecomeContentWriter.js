import React, { useEffect, useRef, useState } from 'react';
import './BecomeContentWriter.css';
import {
	Input,
	message,
	notification,
	Rate,
	Spin,
	Tag,
	theme,
	Tooltip,
} from 'antd';

import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import { HiOutlinePlus } from 'react-icons/hi2';
import axios from 'axios';
import BreadcrumbComponents from '../../components/CourseList/Banner/BreadcrumbComponent/BreadcrumbComponents';
import { useNavigate } from 'react-router-dom';
import Lottie from '../../components/layout/Lottie/Lottie';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useFramerMotion from '../../hooks/useFramerMotion';

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

	// ---------- end of tags ----------
	const [person, setPerson] = useState({
		degreeTitle: '',
		institutionName: '',
		approxPassingYear: '',
		aboutYou: ' ',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const { handleLogout } = useAuth();
	const { containerVariants } = useFramerMotion();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setPerson({ ...person, [name]: value });
	};

	const handleSubmit = (e) => {
		/* console.log(person);
		console.log(tags); */
		e.preventDefault();
		const { degreeTitle, institutionName, approxPassingYear, aboutYou } =
			person;

		if (
			degreeTitle &&
			institutionName &&
			approxPassingYear &&
			aboutYou &&
			tags.length
		) {
			setIsLoading(true);
			const data = {
				degreeTitle,
				institutionName,
				approxPassingYear,
				aboutYou,
				skillSets: tags,
			};
			axios
				.post('/instructors', data)
				.then((response) => {
					console.log(response.data.instructor);
					notification.success(
						'instructor details successfully updated'
					);
					setPerson({
						degreeTitle: '',
						institutionName: '',
						approxPassingYear: '',
						aboutYou: '',
					});
					setTags([]);
					setIsSuccess(true);
					handleInstructorSuccess();
				})
				.catch((error) => {
					console.log(error);
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			message.warning('Inputs should be filled!');
		}
	};

	const handleInstructorSuccess = () => {
		setTimeout(() => {
			handleLogout();
			navigate('/auth/login');
			setIsSuccess(false);
		}, 3000);
	};

	return (
		<>
			<>
				<NavigationBar theme='light' />
				<section>
					<div className='h-[34vh] bg-light relative'>
						<div className='w-full h-full bg-bgContent bg-cover bg-center bg-no-repeat pt-[8vh] flex justify-center items-start'>
							<div className='backdrop-blur-2xl text-center text-primary flex flex-col justify-center items-center w-2/12 p-2 rounded-lg'>
								<h3 className='text-2xl text-center text-white'>
									Become Content Creator
								</h3>
								<BreadcrumbComponents />
							</div>
						</div>
					</div>
					<div
						className='bg-white'
						style={{ minHeight: 'calc(75vh - 81px)' }}
					>
						{/* container */}
						<div className='transform -translate-y-[10vh] container mx-auto bg-white rounded-lg h-full'>
							{isSuccess ? (
								<motion.div
									initial='hidden'
									animate='visible'
									variants={containerVariants}
									key='registering'
									className='p-4 bg-white drop-shadow rounded-lg space-y-2 flex flex-col justify-start items-center'
								>
									<Lottie
										src='https://assets6.lottiefiles.com/private_files/lf30_h6i0ko7d.json'
										size={{ width: 400, height: 400 }}
									/>

									<h4 className='text-xl font-jost'>
										Congrats! You are a content creator.
									</h4>
									<p className='text-base'>
										Please login again to start your new
										journey.
									</p>
								</motion.div>
							) : (
								<>
									{/* wrapper */}
									<div className='grid grid-cols-12 gap-4 border rounded-lg'>
										{/* ---------- My Courses Nav ---------- */}
										<div className='col-span-5 rounded-l-lg p-4 space-y-4 bg-backInstructor bg-cover bg-center bg-no-repeat z-40' />
										<div className='col-span-7 p-8 space-y-4'>
											{/*----------------------------------------right side of the page---------------------------------------------- */}
											<motion.div
												className='space-y-8'
												initial='hidden'
												animate='visible'
												variants={containerVariants}
											>
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
													<div className='col-span-6 form-control w-full'>
														<label className='label font-medium'>
															Degree Title
														</label>
														<input
															type='text'
															placeholder='Degree Title'
															name='degreeTitle'
															className='input input-bordered w-full'
															value={
																person.degreeTitle
															}
															onChange={
																handleChange
															}
														/>
													</div>
													{/* form input */}
													<div className='col-span-6 form-control w-full'>
														<label className='label font-medium'>
															Approximate Passing
															Year
														</label>
														<input
															type='text'
															placeholder='approxPassingYear'
															name='approxPassingYear'
															className='input input-bordered w-full'
															value={
																person.approxPassingYear
															}
															onChange={
																handleChange
															}
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
															value={
																person.institutionName
															}
															onChange={
																handleChange
															}
														/>
													</div>
													{/* tags for skill set */}
													<div className='col-span-12 form-control w-full'>
														<label className='label font-medium'>
															Skill Set
														</label>
														<div className='space-y-2 border rounded-lg p-2  '>
															{tags.map(
																(
																	tag,
																	index
																) => {
																	if (
																		editInputIndex ===
																		index
																	) {
																		return (
																			<Input
																				ref={
																					editInputRef
																				}
																				key={
																					tag
																				}
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
																		tag.length >
																		20;
																	const tagElem =
																		(
																			<Tag
																				className='text-lg '
																				closable
																				size={
																					14
																				}
																				key={
																					tag
																				}
																				style={{
																					userSelect:
																						'none',
																				}}
																				onClose={() =>
																					handleClose(
																						tag
																					)
																				}
																			>
																				<span
																					className='close-icon-custom text-lg'
																					onDoubleClick={(
																						e
																					) => {
																						if (
																							index !==
																							0
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
																			title={
																				tag
																			}
																			key={
																				tag
																			}
																		>
																			{
																				tagElem
																			}
																		</Tooltip>
																	) : (
																		tagElem
																	);
																}
															)}
															{inputVisible && (
																<Input
																	ref={
																		inputRef
																	}
																	type='text'
																	size='large'
																	className='tag-input text-lg'
																	value={
																		inputValue
																	}
																	onChange={
																		handleInputChange
																	}
																	onBlur={
																		handleInputConfirm
																	}
																	onPressEnter={
																		handleInputConfirm
																	}
																/>
															)}
															{!inputVisible && (
																<Tag
																	onClick={
																		showInput
																	}
																>
																	<span className='flex cursor-pointer justify-between items-center space-x-1 text-lg'>
																		<HiOutlinePlus
																			size={
																				14
																			}
																		/>{' '}
																		<span>
																			skills
																		</span>
																	</span>
																</Tag>
															)}
														</div>
													</div>
													{/* end of tags */}
													{/* form input */}
													<div className='col-span-12 form-control w-full'>
														<label className='label font-medium'>
															Write about you
														</label>
														<textarea
															cols={100}
															rows={5}
															placeholder='write about you....'
															name='aboutYou'
															className='input input-bordered w-full h-full'
															value={
																person.aboutYou
															}
															onChange={
																handleChange
															}
														/>
													</div>
													{/* submit button */}
													<button
														type='submit'
														className='col-span-12 py-2 font-medium text-white border-2 bg-primary drop-shadow rounded-lg disabled:bg-opacity-5'
														disabled={isLoading}
													>
														{isLoading ? (
															<Spin size='small' />
														) : (
															'Submit'
														)}
													</button>
												</form>
											</motion.div>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</section>
				<div style={{ background: '#040453' }}>
					<FooterComponent />
				</div>
			</>
		</>
	);
};

export default BecomeContentWriter;
