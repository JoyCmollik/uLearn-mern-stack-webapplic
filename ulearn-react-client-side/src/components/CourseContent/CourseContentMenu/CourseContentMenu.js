import React from 'react';
import { BiBookReader } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const CourseContentMenu = ({ singleContent }) => {
	const navigate = useNavigate();

	const handleDetailPage = (id) => {
		navigate(`lesson/${id}`);
	};
	return (
		<section className=' mx-auto pt-6 px-4'>
			<div className='grid grid-cols-12 gap-28'>
				<div className='col-span-8 flex flex-col space-y-4'>
					{singleContent?.sections?.length &&
						singleContent?.sections.map((section) => {
							const {
								_id,
								lessons,

								sectionTitle,
							} = section;

							return (
								<div key={_id}>
									{/*----------------------titles------------------------*/}

									<div className='flex justify-between'>
										<h2 className=' text-xl font-bold'>
											Sections : {sectionTitle}
										</h2>
									</div>
									{lessons?.length &&
										lessons?.map((lesson, index) => (
											<div
												onClick={() =>
													handleDetailPage(lesson._id)
												}
												key={lesson?._id}
												className='flex items-center justify-between border-b-2  border-[#dfdddc] space-y-4'
											>
												<article className='pl-4 flex items-center justify-between'>
													<h3 className='text-xl font-bold pr-9'>
														{index ? index + 1 : 1}
													</h3>
													<h4 className='text-base font-bold capitalize'>
														{lesson?.lessonTitle}
														<br />
														<span className='text-xs font-normal'>
															A quick introduction
															to Python
															syntax,variable
															assignment, and
															numbers
														</span>
													</h4>
												</article>

												{/*----------------Tutorial Icon dynamic--------------------*/}
												<article className='grid grid-cols-2 gap-x-8 items-center justify-center '>
													<div className='flex justify-end'>
														<BiBookReader className='text-2xl' />
													</div>
												</article>
											</div>
										))}
								</div>
							);
						})}
				</div>
				{/*----------------------course detail and instructor detail------------------------*/}
				<div className='col-span-4 pl-5'>
					<div className='flex flex-col space-y-4'>
						{/*-------------------content info-----------------*/}
						<article>
							<h2 className='text-base font-semibold'>
								Course Includes
							</h2>
							<span className='text-sm block'>
								Total Lessons:0
							</span>
							<span className='text-sm block'>Quizzes: 2</span>
							<span className='text-sm block'>
								Course level: {singleContent?.level}
							</span>
							<span className='text-sm block'>
								Language: {singleContent?.language}
							</span>
						</article>
						{/*-----------------instructor info-----------------*/}
						<article>
							<h2 className='text-base font-semibold'>
								About Instructor
							</h2>
							<span className='text-sm block'>
								Name: {singleContent?.instructor?.name}
							</span>
							<span className='text-sm block'>
								Position: PHP Developer
							</span>
							<span className='text-sm block'>Rating: 5.0</span>
						</article>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CourseContentMenu;
