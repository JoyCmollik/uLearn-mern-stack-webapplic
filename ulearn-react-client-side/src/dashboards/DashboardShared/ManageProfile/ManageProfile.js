import { message, Modal, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiOutlineCog6Tooth, HiOutlineCamera } from 'react-icons/hi2';
import Loading from '../../../components/layout/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import UploadImageModal from './UploadImageModal';
import { LoadingOutlined } from '@ant-design/icons';
import ChangePasswordModal from './ChangePasswordModal';

const ManageProfile = () => {
	const [userProfile, setUserProfile] = useState(null);
	const [isFetching, setIsFetching] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [imgFile, setImgFile] = useState([]);
	const { user, setUser } = useAuth();
	const [basicInfo, setBasicInfo] = useState({});
	const [creatorInfo, setCreatorInfo] = useState({});
	const [updateBasicInfo, setUpdateBasicInfo] = useState(false);
	const [updateCreatorInfo, setUpdateCreatorInfo] = useState(false);
	const [updateStatus, setUpdateStatus] = useState({
		updatingBasicInfo: false,
		updatingCreator: false,
	});

	useEffect(() => {
		if (!userProfile && user?.userId) {
			setIsFetching(true);
			axios
				.get(`/users/${user?.userId}`)
				.then((response) => {
					const user = response.data.user;
					setUserProfile(user);
					console.log(user);
					setBasicInfo({
						name: user?.name,
						gender: user?.gender,
						phone: user?.phone || '',
					});
					// setting content creator info
					if (user.role === 'instructor') {
						setCreatorInfo({
							institutionName: user?.instructor.institutionName,
							degreeTitle: user?.instructor?.degreeTitle,
							approxPassingYear:
								user?.instructor?.approxPassingYear,
							aboutYou: user?.instructor?.aboutYou,
						});
					}
				})
				.catch((error) => {
					message.error(error.message);
				})
				.finally(() => {
					setIsFetching(false);
				});
		}
	}, [user]);

	if (isFetching) {
		return (
			<div className='bg-white min-h-screen rounded-lg p-4 flex justify-center items-center'>
				<Loading />
			</div>
		);
	}

	// update basic info state
	const handleBasicInfo = (e) => {
		const target = e.target.name;
		const value = e.target.value;

		setBasicInfo((prevBasicInfo) => {
			return { ...prevBasicInfo, [target]: value };
		});
	};

	// update content creator info state
	const handleCreatorInfo = (e) => {
		const target = e.target.name;
		const value = e.target.value;

		setCreatorInfo((prevBasicInfo) => {
			return { ...prevBasicInfo, [target]: value };
		});
	};

	// creator info submit operations
	const handleUpdateCreatorInfo = (e) => {
		e.preventDefault();
		console.log('udpating creator');

		if (
			creatorInfo.institutionName !==
				userProfile?.instructor.institutionName ||
			creatorInfo.degreeTitle !== userProfile?.instructor?.degreeTitle ||
			basicInfo.approxPassingYear !==
				userProfile?.instructor?.approxPassingYear ||
			basicInfo.aboutYou !== userProfile?.instructor?.aboutYou
		) {
			setUpdateStatus((ps) => {
				return { ...ps, updatingCreator: true };
			});
			handleUpdateUser(
				creatorInfo,
				`/instructors/${userProfile?.instructor?._id}`,
				'creator'
			);
		} else {
			message.warning('Please make changes before updating....');
			return;
		}
	};

	// basic info submit operations
	const handleUpdateBasicInfo = (e) => {
		e.preventDefault();
		if (
			basicInfo.name !== userProfile.name ||
			basicInfo.gender !== userProfile.gender ||
			(basicInfo.phone && !userProfile?.phone) ||
			(userProfile?.phone && basicInfo.phone !== userProfile?.phone)
		) {
			setUpdateStatus((ps) => {
				return { ...ps, updatingBasicInfo: true };
			});
			handleUpdateUser(basicInfo, `/users/updateUser`, 'user');
		} else {
			message.warning('Please make changes before updating....');
			return;
		}
	};

	// user's avatar
	const handleUpdateProfileImage = async () => {
		if (imgFile.length) {
			setIsLoading(true);
			axios
				.post('/images/uploadAvatar', {
					file: imgFile[0].thumbUrl,
					name: imgFile[0].name,
				})
				.then((response) => {
					if (response?.data?.image?.src) {
						handleUpdateUser(
							{
								avatarURL: response.data.image.src,
							},
							`/users/updateUser`,
							'user'
						);
					}
				})
				.catch((error) => {
					message.error(error.response.data.msg || error.message);
					setIsLoading(false);
					setIsUploadModalOpen(false);
					setImgFile([]);
				});
		}
	};

	// [PATCH] - dynamic function to update user and creator
	const handleUpdateUser = async (data, url, type) => {
		if (data) {
			setIsLoading(true);
			axios
				.patch(url, {
					...data,
				})
				.then((response) => {
					message.success('user has been updated successfully!');
					if (type === 'user') {
						setUser(response.data.user);
					} else if (
						type === 'creator' &&
						response?.data?.instructor
					) {
						setUserProfile((prevUser) => {
							return {
								...prevUser,
								instructor: response.data.instructor,
							};
						});
					}
				})
				.catch((error) => {
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {
					setIsLoading(false);
					// user's setup
					if (type === 'user') {
						setIsUploadModalOpen(false);
						setImgFile([]);
						setUserProfile({ ...userProfile, ...data });
					}
					setUpdateStatus({
						updatingBasicInfo: false,
						updatingCreator: false,
					});
					if (updateBasicInfo) {
						setUpdateBasicInfo(false);
					} else if (updateCreatorInfo) {
						setUpdateCreatorInfo(false);
					}
				});
		}
	};

	return (
		<div className='bg-white min-h-screen rounded-lg p-4'>
			{/*****--------------User Profile Banner ---------------*****/}
			<div className='h-[18vh] bg-[url("https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGFic3RyYWN0fGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=1920&q=60")] bg-center bg-cover bg-no-repeat rounded-lg'></div>
			{/*****--------------User Profile Picture Name ---------------*****/}
			<div className='flex justify-between items-start px-8 py-4 border-b-[0.5px]'>
				{/* profile picture */}
				<div className='wrapper flex justify-between items-start space-x-4'>
					<figure className='h-[125px] w-[125px] bg-white rounded-full flex justify-center items-center -mt-14 relative'>
						<img
							className='w-full h-full rounded-full object-cover'
							src={userProfile?.avatarURL}
							alt='profile'
						/>
						{/*****-------------- Change Image ---------------*****/}
						<button
							onClick={() => setIsUploadModalOpen(true)}
							className='absolute bottom-1/4 left-0 bg-white drop-shadow rounded-full p-2 transform -translate-x-2/4 translate-y-1/4'
						>
							<HiOutlineCamera size={18} />
						</button>
						{/*****-------------- Image uploading modal ---------------*****/}
						<Modal
							style={{ borderRadius: '8px', overflow: 'hidden' }}
							bodyStyle={{ padding: '16px' }}
							open={isUploadModalOpen}
							closable={false}
							footer={
								<div className='flex justify-end items-center space-x-2'>
									<button
										onClick={handleUpdateProfileImage}
										className='px-4 py-2 border border-primary rounded-lg text-primary disabled:opacity-40'
										disabled={isLoading || !imgFile.length}
									>
										{isLoading ? (
											<span className='flex items-center space-x-2'>
												<LoadingOutlined />
												<span>Uploading</span>
											</span>
										) : (
											'Upload'
										)}
									</button>
									<button
										onClick={() =>
											setIsUploadModalOpen(false)
										}
										className='px-4 py-2 border border-error rounded-lg text-error disabled:opacity-40'
										disabled={isLoading}
									>
										Cancel
									</button>
								</div>
							}
							centered
						>
							<UploadImageModal
								imgFile={imgFile}
								setImgFile={setImgFile}
								limit='1'
							/>
						</Modal>
					</figure>
					<h2 className='text-2xl font-bold'>
						{userProfile?.name.split(' ')[0]}
					</h2>
				</div>
				{/* update password */}
				<div className='self-center'>
					<button
						onClick={() => setIsPasswordModalOpen(true)}
						className='px-4 py-1 flex items-center space-x-2 text-primary border border-primary rounded-lg'
					>
						<HiOutlineCog6Tooth size={19} />
						<span>Change Password</span>
					</button>
					{/*****-------------- Image uploading modal ---------------*****/}
					<Modal
						style={{ borderRadius: '8px', overflow: 'hidden' }}
						bodyStyle={{ padding: '16px' }}
						open={isPasswordModalOpen}
						closable={false}
						footer={null}
						centered
					>
						<ChangePasswordModal
							setIsPasswordModalOpen={setIsPasswordModalOpen}
						/>
					</Modal>
				</div>
			</div>
			{/*****--------------User Profile Other Info---------------*****/}
			<div className='info-parent-main-container space-y-8 p-4'>
				{!updateBasicInfo ? (
					<>
						{/*****-------------- Personal & Contact Info ---------------*****/}
						<div className='flex items-start'>
							<div className='flex-grow space-y-8'>
								{/*****--------------Personal Information---------------*****/}
								<div className='info-container'>
									<h4 className='text-font1 font-medium text-lg'>
										Personal Information
									</h4>
									<div className='grid grid-cols-4 items-center'>
										<div className='space-y-1'>
											<h5 className='text-gray-400 m-0'>
												Full Name
											</h5>
											<p className='m-0 font-normal text-font1'>
												{userProfile?.name}
											</p>
										</div>
										<div className='space-y-1'>
											<h5 className='text-gray-400 m-0'>
												Gender
											</h5>
											<p className='m-0 font-normal text-font1'>
												{userProfile?.gender}
											</p>
										</div>
									</div>
								</div>
								{/*****--------------Contact Information---------------*****/}
								<div className='info-container'>
									<h4 className='text-font1 font-medium text-lg'>
										Contact Information
									</h4>
									<div className='grid grid-cols-4 items-center'>
										<div className='space-y-1'>
											<h5 className='text-gray-400 m-0'>
												Phone Number
											</h5>
											<p className='m-0 font-normal text-font1'>
												{userProfile?.phone || 'NA'}
											</p>
										</div>
										<div className='space-y-1'>
											<h5 className='text-gray-400 m-0'>
												Email
											</h5>
											<p className='m-0 font-normal text-font1'>
												{userProfile?.email}
											</p>
										</div>
									</div>
								</div>
							</div>
							<button
								onClick={() => setUpdateBasicInfo(true)}
								className='border px-8 py-2 text-font2 rounded-lg'
							>
								Edit Information
							</button>
						</div>
					</>
				) : (
					<>
						{/*****-------------- Update Personal & Contact Info ---------------*****/}
						<form
							onSubmit={handleUpdateBasicInfo}
							className='border rounded-lg overflow-hidden'
						>
							<div className='p-4 space-y-8'>
								{/*****--------------Personal Information---------------*****/}
								<div className='info-container'>
									<h4 className='text-font1 font-medium text-lg'>
										Update Personal Information
									</h4>
									<div className='grid grid-cols-4 gap-8 items-center'>
										<div className='space-y-1'>
											{/*****--------------Name---------------*****/}
											<h5 className='text-gray-400 m-0'>
												Full Name
											</h5>
											<input
												onChange={handleBasicInfo}
												className='input-outline-style'
												type='text'
												name='name'
												value={basicInfo?.name}
											/>
										</div>
										{/*****--------------Gender---------------*****/}
										<div className='space-y-1'>
											<h5 className='text-gray-400 m-0'>
												Gender
											</h5>
											<select
												onChange={handleBasicInfo}
												className='input-outline-style'
												name='gender'
												value={basicInfo?.gender}
											>
												<option value='male'>
													Male
												</option>
												<option value='female'>
													Female
												</option>
												<option value='others'>
													Others
												</option>
											</select>
										</div>
									</div>
								</div>
								{/*****--------------Contact Information---------------*****/}
								<div className='info-container'>
									<h4 className='text-font1 font-medium text-lg'>
										Contact Information
									</h4>
									<div className='grid grid-cols-4 gap-8 items-center'>
										<div className='space-y-1'>
											<h5 className='text-gray-400 m-0'>
												Phone Number (Optional)
											</h5>
											<input
												onChange={handleBasicInfo}
												className='input-outline-style'
												type='text'
												name='phone'
												placeholder='Please input your mobile'
												value={basicInfo?.phone}
											/>
										</div>
										<div className='space-y-1'>
											<h5 className='text-gray-400 m-0'>
												Email{' '}
												<small>
													(Email can't be changed)
												</small>
											</h5>
											<p className='m-0 font-normal text-gray-400'>
												{userProfile?.email}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className='flex justify-end bg-light p-4 space-x-2'>
								<button
									onClick={() => setUpdateBasicInfo(false)}
									className='text-error border border-error px-8 py-2 rounded-lg'
									disabled={updateStatus.updatingBasicInfo}
								>
									Cancel
								</button>
								<button
									className='text-primary border border-primary px-8 py-2 rounded-lg flex items-center'
									disabled={updateStatus.updatingBasicInfo}
								>
									{updateStatus.updatingBasicInfo && (
										<span className='mr-2'>
											<LoadingOutlined />
										</span>
									)}
									<span>Update Information</span>
								</button>
							</div>
						</form>
					</>
				)}
				<hr />

				{/*****-------------- Content Creator's Educational Information ---------------*****/}
				{user?.role === 'instructor' && (
					<>
						{!updateCreatorInfo ? (
							<div className='flex items-start'>
								{/*****--------------Educational Information---------------*****/}
								<div className='flex-grow info-container'>
									<h4 className='text-font1 font-medium text-lg'>
										Educational Information
									</h4>
									<div className='grid grid-cols-4 gap-4 items-center'>
										<div className='space-y-1'>
											<h5 className='text-gray-400 m-0'>
												Institution Name
											</h5>
											<p className='m-0 font-normal text-font1'>
												{
													userProfile.instructor
														.institutionName
												}
											</p>
										</div>
										<div className='space-y-1'>
											<h5 className='text-gray-400 m-0'>
												Degree
											</h5>
											<p className='m-0 font-normal text-font1'>
												{
													userProfile?.instructor
														?.degreeTitle
												}
											</p>
										</div>
										<div className='space-y-1'>
											<h5 className='text-gray-400 m-0'>
												Approx. Graduation
											</h5>
											<p className='m-0 font-normal text-font1'>
												{
													userProfile?.instructor
														?.approxPassingYear
												}
											</p>
										</div>
										<div className='col-span-4 space-y-1'>
											<h5 className='text-gray-400 m-0'>
												About Yourself
											</h5>
											<p className='m-0 font-normal text-font1 w-10/12 text-justify'>
												{
													userProfile?.instructor
														?.aboutYou
												}
											</p>
										</div>
									</div>
								</div>
								<button
									onClick={() => setUpdateCreatorInfo(true)}
									className='block w-[290px] border px-8 py-2 text-font2 rounded-lg'
								>
									Edit Information
								</button>
							</div>
						) : (
							<>
								{/*****-------------- Personal & Contact Info ---------------*****/}
								<form
									onSubmit={handleUpdateCreatorInfo}
									className='border rounded-lg overflow-hidden'
								>
									<div className='p-4 space-y-8'>
										{/*****--------------Personal Information---------------*****/}
										<div className='info-container'>
											<h4 className='text-font1 font-medium text-lg'>
												Update Educational Information
											</h4>
											<div className='grid grid-cols-4 gap-8 items-center'>
												<div className='space-y-1'>
													{/*****--------------Institution---------------*****/}
													<h5 className='text-gray-400 m-0'>
														Institution
													</h5>
													<input
														onChange={
															handleCreatorInfo
														}
														className='input-outline-style'
														type='text'
														name='institutionName'
														value={
															creatorInfo?.institutionName
														}
													/>
												</div>
												{/*****--------------Degree---------------*****/}
												<div className='space-y-1'>
													<h5 className='text-gray-400 m-0'>
														Degree
													</h5>
													<input
														onChange={
															handleCreatorInfo
														}
														className='input-outline-style'
														type='text'
														name='degreeTitle'
														value={
															creatorInfo?.degreeTitle
														}
													/>
												</div>
											</div>
										</div>
										{/*****--------------Contact Information---------------*****/}
										<div className='info-container'>
											<div className='grid grid-cols-4 gap-8 items-center'>
												<div className='space-y-1'>
													<h5 className='text-gray-400 m-0'>
														Approx. Graduation
													</h5>
													<input
														onChange={
															handleCreatorInfo
														}
														className='input-outline-style'
														type='number'
														name='approxPassingYear'
														placeholder='Please input your mobile'
														value={
															creatorInfo?.approxPassingYear
														}
													/>
												</div>
												<div className='col-span-4 space-y-1'>
													<h5 className='text-gray-400 m-0'>
														About Yourself
													</h5>
													<textarea
														onChange={
															handleCreatorInfo
														}
														rows='4'
														className='input-outline-style'
														type='number'
														name='aboutYou'
														value={
															creatorInfo?.aboutYou
														}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className='flex justify-end bg-light p-4 space-x-2'>
										<button
											onClick={() =>
												setUpdateCreatorInfo(false)
											}
											className='text-error border border-error px-8 py-2 rounded-lg'
											disabled={
												updateStatus.updatingCreator
											}
										>
											Cancel
										</button>
										<button
											className='text-primary border border-primary px-8 py-2 rounded-lg flex items-center'
											disabled={
												updateStatus.updatingCreator
											}
										>
											{updateStatus.updatingCreator && (
												<span className='mr-2'>
													<LoadingOutlined />
												</span>
											)}
											<span>Update Information</span>
										</button>
									</div>
								</form>
							</>
						)}
					</>
				)}
				{/*****--------------More Information---------------*****/}
				<div className='info-container'>
					<h4 className='text-font1 font-medium text-lg'>
						More Information
					</h4>
					<div className='grid grid-cols-4 items-center'>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Role</h5>
							<p className='m-0 font-normal text-font1'>
								{user?.role}
							</p>
						</div>
						{userProfile?.role === 'instructor' && (
							<div className='space-y-1'>
								<h5 className='text-gray-400 m-0'>Skills</h5>
								<div className='flex space-x-2'>
									{userProfile?.instructor?.skillSets?.map(
										(skill) => (
											<Tag
												style={{
													padding: '4px 4px',
													borderRadius: '8px',
												}}
											>
												{skill}
											</Tag>
										)
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManageProfile;
