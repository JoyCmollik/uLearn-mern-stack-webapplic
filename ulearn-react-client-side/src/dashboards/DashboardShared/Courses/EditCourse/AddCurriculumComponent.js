import React, { useEffect, useState } from 'react';
import { Alert, Input, message, Modal, Spin } from 'antd';
import { HiPlus } from 'react-icons/hi2';
import { MdEdit } from 'react-icons/md';
import { Reorder, motion } from 'framer-motion';
import axios from 'axios';

// component imports
import Lesson from './Lesson';
import Section from './Section';
import { useForm } from 'react-hook-form';
import nodataImg from '../../../../images/no_data.png';

const AddCurriculumComponent = ({ course = null, handleUpdateCourse }) => {
	const [sectionList, setSectionList] = useState(null);
	const [currSection, setCurrSection] = useState(null);
	const [sectionModalOpen, setSectionModalOpen] = useState(false);
	const [lessonModalOpen, setLessonModalOpen] = useState(false);
	const [lessonTitle, setLessonTitle] = useState('');
	const [tempSectionTitle, setTempSectionTitle] = useState('');
	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// library constats
	const { control, handleSubmit } = useForm({});

	// -------------- COMPONENT ON MOUNT FETCH --------------
	useEffect(() => {
		if (course) {
			setIsFetching(true);
			axios
				.get(`/courses/${course._id}/sections`)
				.then((response) => {
					const sections = response.data.sections;
					setSectionList(sections);
					setCurrSection(sections[0]);
				})
				.catch((error) => {
					message.error(error.message);
				})
				.finally(() => {
					setIsFetching(false);
				});
		}
	}, [course]);
	// -------------- COMPONENT FEATURES - FUNCTIONS --------------

	// functionality - will show the current section
	const handleCurrSection = (section) => {
		setCurrSection(section);
	};

	// functionality - will add newly created section to the list
	const handleAddSection = async (newSection) => {
		// updating remotely
		const newSectionList = [...sectionList, newSection];
		const newListIds = newSectionList.map((section) => section._id);
		let newCourse = { ...course };
		newCourse.sections = newListIds;
		handleUpdateCourse(newCourse);

		// updating locally
		// setSectionList(() => {
		// 	const newList = [...sectionList, newSection];
		// 	return newList;
		// });
		setTempSectionTitle('');
		setSectionModalOpen(false);
	};

	// functionality - first update section with new lesson List
	// will show the current section
	// - map sectionList, find the desired section, mutate it's lessons, return mutated section
	// ! before returning update current section
	// # finally close the modal and empty title string
	const handleAddLesson = async (sectionId, newLesson) => {
		let newSectionList = [];

		const currSectionLessons = currSection.lessons.map(
			(lesson) => lesson._id
		);
		let currSectionData = { ...currSection };
		currSectionData.lessons = [...currSectionLessons, newLesson._id];

		console.log(currSectionData, 'currSectionData');

		const result = await handleUpdateSection(currSectionData);
		console.log(result, 'result');

		setSectionList((prevSectionList) => {
			newSectionList = prevSectionList.map((section) => {
				if (section._id === sectionId) {
					const newSection = { ...section };
					newSection.lessons = [...section.lessons, newLesson];
					setCurrSection(() => newSection);
					return newSection;
				}
				return section;
			});
			return [...newSectionList];
		});

		console.log(currSection, 'currSection');

		setLessonTitle('');
		setLessonModalOpen(false);
	};
	// updated currSection lessons with newLesson | updated lessonList
	const handleUpdateLesson = (updatedLesson) => {
		setCurrSection((prevSectionData) => {
			const newCurrSectionLessons = prevSectionData.lessons.map(
				(lesson) => {
					if (lesson._id === updatedLesson._id) {
						return updatedLesson;
					}
					return lesson;
				}
			);
			const newSectionData = {
				...prevSectionData,
				lessons: [...newCurrSectionLessons],
			};

			return newSectionData;
		});
	};

	// -------------- API REQUESTS - FUNCTIONS --------------

	// POST - create section | add section to section list | update course
	const handleCreateSection = (sectionTitle) => {
		setIsLoading(true);
		axios
			.post('/sections', { sectionTitle })
			.then((response) => {
				message.success('Created a new section!');
				handleAddSection(response.data.section);
			})
			.catch((error) => {
				message.error(error.response.data.msg);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	// POST - create section | add section to section list | update course
	const handleUpdateSection = async (newSectionData) => {
		let updated = false;
		setIsLoading(true);
		axios
			.patch(`/sections/${newSectionData._id}`, { ...newSectionData })
			.then((response) => {
				message.success('updated section!');
				updated = true;
			})
			.catch((error) => {
				message.error(error.response.data.msg);
			})
			.finally(() => {
				setIsLoading(false);
			});
		return updated;
	};

	// POST - create lesson | add lesson to current section | update current section
	const handleCreateLesson = (sectionId, lessonTitle) => {
		setIsLoading(true);
		axios
			.post('/lessons', { lessonTitle })
			.then((response) => {
				message.success('Created a new lesson!');
				handleAddLesson(sectionId, response.data.lesson);
			})
			.catch((error) => {
				message.error(error.response.data.msg);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className='border-[0.5px] rounded-lg min-h-[70vh] grid grid-cols-12 gap-2 p-2'>
			{isFetching ? (
				<div className='col-span-12 flex justify-center items-center h-full'>
					<Spin size='large' />
				</div>
			) : (
				<>
					{/*****--------------Section container---------------*****/}
					<div className='col-span-2 bg-light rounded-lg'>
						{/*****--------------Section count add button---------------*****/}
						<div className='flex justify-between items-center p-2'>
							<h4 className='text-lg font-medium uppercase m-0'>
								Sections
							</h4>
							<motion.button
								whileHover={{ scale: 1.2 }}
								onHoverStart={(e) => {}}
								onHoverEnd={(e) => {}}
								onClick={() => setSectionModalOpen(true)}
								className='bg-primary text-white p-2 rounded-lg border-[0.5px]'
							>
								<HiPlus size={16} />
							</motion.button>
							{/*****--------------add new section modal---------------*****/}
							<Modal
								title='New Section'
								centered
								open={sectionModalOpen}
								onOk={() =>
									handleCreateSection(tempSectionTitle)
								}
								onCancel={() => setSectionModalOpen(false)}
								confirmLoading={isLoading}
							>
								<Input
									onBlur={(e) =>
										setTempSectionTitle(e.target.value)
									}
									placeholder='Write a title here.'
								/>
							</Modal>
						</div>
						{/*****--------------Section list---------------*****/}
						<div>
							{!sectionList ? (
								<Alert
									style={{ borderRadius: '8px' }}
									message='No sections created yet.'
									type='info'
									showIcon
								/>
							) : (
								<Reorder.Group
									axis='y'
									values={sectionList}
									onReorder={setSectionList}
									className='space-y-0.5'
								>
									{sectionList.map((sectionItem) => (
										<Reorder.Item
											key={sectionItem?._id}
											value={sectionItem}
										>
											<Section
												key={sectionItem?._id}
												data={{
													sectionItem,
													currSection,
													handleCurrSection,
												}}
											/>
										</Reorder.Item>
									))}
								</Reorder.Group>
							)}
						</div>
					</div>
					{/*****--------------Lesson container---------------*****/}
					<div className='col-span-10 bg-white rounded-lg p-2'>
						{!currSection ? (
							<div className='flex justify-center items-center h-full'>
								<img className='w-[500px]' src={nodataImg} alt='no-data' />
							</div>
						) : (
							<>
								{/*****--------------Section details---------------*****/}
								<div className=' py-2 flex space-x-4 items-center'>
									<input
										className='text-xl p-2 font-bold capitalize focus:outline-none bg-transparent border-b-[0.5px] w-[50%]'
										value={currSection.sectionTitle}
										disabled={true}
										type='text'
									/>
									<button className='p-2 rounded-lg shadow'>
										<MdEdit size={20} />
									</button>
								</div>
								{/*****--------------lesson details---------------*****/}
								<div className='py-2 space-y-4'>
									<button
										onClick={() => setLessonModalOpen(true)}
										className='px-2 py-1 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center'
									>
										<HiPlus size={20} />{' '}
										<span>New Lesson</span>
									</button>
									{/*****--------------add new lesson modal---------------*****/}
									<Modal
										title={<div>New lesson</div>}
										centered
										open={lessonModalOpen}
										onOk={() =>
											handleCreateLesson(
												currSection._id,
												lessonTitle
											)
										}
										onCancel={() =>
											setLessonModalOpen(false)
										}
										confirmLoading={isLoading}
									>
										<Input
											onBlur={(e) =>
												setLessonTitle(e.target.value)
											}
											placeholder='Write a title here.'
										/>
									</Modal>

									{!currSection?.lessons?.length ? (
										<Alert
											style={{
												borderRadius: '8px',
											}}
											message='No lessons created yet.'
											type='info'
											showIcon
										/>
									) : (
										<div className='space-y-2'>
											{currSection.lessons.map(
												(lesson) => (
													<Lesson
														key={lesson._id}
														lesson={lesson}
														handleUpdateLesson={
															handleUpdateLesson
														}
													/>
												)
											)}
										</div>
									)}
								</div>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default AddCurriculumComponent;
