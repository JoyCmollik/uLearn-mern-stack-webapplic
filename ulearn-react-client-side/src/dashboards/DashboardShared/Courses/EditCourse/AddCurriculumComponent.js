import React, { useState } from 'react';
import { Alert, Input, message, Modal } from 'antd';
import { HiPlus } from 'react-icons/hi2';
import { MdEdit } from 'react-icons/md';
import { Reorder, motion } from 'framer-motion';
import axios from 'axios';

// component imports
import Lesson from './Lesson';
import Section from './Section';
import { useForm } from 'react-hook-form';

const initialSectionList = [
	{
		_id: 'aaaa',
		section: 1,
		sectionTitle: 'Motif Searching',
		lessons: [
			{
				_id: 0,
				lessonTitle: 'Introduction',
			},
			{
				_id: 1,
				lessonTitle: 'Description',
			},
		],
	},
	{
		_id: 'aaac',
		section: 2,
		sectionTitle: 'Pattern match',
		lessons: [
			{
				_id: 1,
				lessonTitle: 'Projects',
			},
		],
	},
];

const AddCurriculumComponent = () => {
	const [sectionList, setSectionList] = useState([...initialSectionList]);
	const [currSection, setCurrSection] = useState(sectionList[0]);
	const [lessonList, setLessonList] = useState([...sectionList[0].lessons]);
	const [sectionModalOpen, setSectionModalOpen] = useState(false);
	const [lessonModalOpen, setLessonModalOpen] = useState(false);
	const [lessonTitle, setLessonTitle] = useState('');
	const [tempSectionTitle, setTempSectionTitle] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// library constats
	const { control, handleSubmit } = useForm({});

	// -------------- COMPONENT FEATURES - FUNCTIONS --------------

	// functionality - will show the current section
	const handleCurrSection = (section) => {
		setCurrSection(section);
		setLessonList([...section.lessons])
	};

	// functionality - will add newly created section to the list
	const handleAddSection = async (newSection) => {
		setSectionList(() => {
			const newList = [...sectionList, newSection];
			return newList;
		});
		setTempSectionTitle('');
		setSectionModalOpen(false);
	};

	// functionality - will show the current section
	// - map sectionList, find the desired section, mutate it's lessons, return mutated section
	// ! before returning update current section
	// # finally close the modal and empty title string
	const handleAddLesson = (sectionId, newLesson) => {
		let newSectionList = [];

		setSectionList((prevSectionList) => {
			newSectionList = prevSectionList.map((section) => {
				if (section._id === sectionId) {
					const newSection = { ...section };
					newSection.lessons = [
						...section.lessons,
						newLesson
					];
					setCurrSection(() => newSection);
					setLessonList(() => newSection.lessons);
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

	// -------------- API REQUESTS - FUNCTIONS --------------

	// POST - create section | add section to section list | update course
	const handleCreateSection = (sectionTitle) => {
		setIsLoading(true)
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
			})
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
						onOk={() => handleCreateSection(tempSectionTitle)}
						onCancel={() => setSectionModalOpen(false)}
						confirmLoading={isLoading}
					>
						<Input
							onBlur={(e) => setTempSectionTitle(e.target.value)}
							placeholder='Write a title here.'
						/>
					</Modal>
				</div>
				{/*****--------------Section list---------------*****/}
				<div>
					<Reorder.Group
						axis='y'
						values={sectionList}
						onReorder={setSectionList}
						className='space-y-0.5'
					>
						{sectionList.map((sectionItem) => (
							<Reorder.Item
								key={sectionItem._id}
								value={sectionItem}
							>
								<Section
									key={sectionItem._id}
									data={{
										sectionItem,
										currSection,
										handleCurrSection,
									}}
								/>
							</Reorder.Item>
						))}
					</Reorder.Group>
				</div>
			</div>
			{/*****--------------Lesson container---------------*****/}
			<div className='col-span-10 bg-white rounded-lg p-2'>
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
						<HiPlus size={20} /> <span>New Lesson</span>
					</button>
					{/*****--------------add new lesson modal---------------*****/}
					<Modal
						title={<div>New lesson</div>}
						centered
						open={lessonModalOpen}
						onOk={() =>
							handleCreateLesson(currSection._id, lessonTitle)
						}
						onCancel={() => setLessonModalOpen(false)}
						confirmLoading={isLoading}
					>
						<Input
							onChange={(e) => setLessonTitle(e.target.value)}
							autoSave={false}
							value={lessonTitle}
							placeholder='Write a title here.'
						/>
					</Modal>

					{!currSection.lessons.length ? (
						<Alert
							style={{ borderRadius: '8px' }}
							message='No lessons created yet.'
							type='info'
							showIcon
						/>
					) : (
						<Reorder.Group
							axis='y'
							values={lessonList}
							onReorder={setLessonList}
							className='space-y-2'
						>
							{lessonList.map((lesson) => (
								<Lesson key={lesson._id} lesson={lesson} />
							))}
						</Reorder.Group>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddCurriculumComponent;
