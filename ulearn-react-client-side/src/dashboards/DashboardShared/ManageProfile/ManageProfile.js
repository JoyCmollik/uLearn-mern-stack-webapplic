import { message, Modal, Tag } from 'antd';
import axios from 'axios';
import { LayoutGroupContext } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { HiOutlineCamera } from 'react-icons/hi2';
import Loading from '../../../components/layout/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import UploadImageModal from './UploadImageModal';
import { LoadingOutlined } from '@ant-design/icons';

const ManageProfile = () => {
	const [userProfile, setUserProfile] = useState(null);
	const [isFetching, setIsFetching] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [imgFile, setImgFile] = useState([]);
	const { user, setUser } = useAuth();

	useEffect(() => {
		if (!userProfile && user?.userId) {
			setIsFetching(true);
			axios
				.get(`/users/${user?.userId}`)
				.then((response) => {
					setUserProfile(response.data.user);
					console.log(response.data.user);
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

	const handleUpdateProfileImage = async () => {
		if (imgFile.length) {
			setIsLoading(true);
			axios
				.post('/images/uploadAvatar', {
					file: imgFile[0].thumbUrl,
					name: imgFile[0].name,
				})
				.then((response) => {
					if (response.data.image.src) {
						handleUpdateUser({
							avatarURL: response.data.image.src,
						});
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

	const handleUpdateUser = async (data) => {
		if (data) {
			setIsLoading(true);
			axios
				.patch(`/users/updateUser`, {
					...data,
				})
				.then((response) => {
					message.success('user has been updated successfully!');
					setUser(response.data.user);
				})
				.catch((error) => {
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {
					setIsLoading(false);
					setIsUploadModalOpen(false);
					setImgFile([]);
					setUserProfile({ ...userProfile, ...data });
				});
		}
	};

	return (
		<div className='bg-white min-h-screen rounded-lg p-4'>
			{/*****--------------User Profile Banner ---------------*****/}
			<div className='h-[18vh] bg-[url("https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGFic3RyYWN0fGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=1920&q=60")] bg-center bg-cover bg-no-repeat rounded-lg'></div>
			{/*****--------------User Profile Picture Name ---------------*****/}
			<div className='flex justify-between items-start px-8 py-4 border-b-[0.5px]'>
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
				<button className='border px-8 py-2 text-font2 rounded-lg'>
					Edit Profile
				</button>
			</div>
			{/*****--------------User Profile Other Info---------------*****/}
			<div className='info-parent-main-container space-y-8 p-4'>
				{/*****--------------Personal Information---------------*****/}
				<div className='info-container'>
					<h4 className='text-font1 font-medium text-lg'>
						Personal Information
					</h4>
					<div className='grid grid-cols-4 items-center'>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Full Name</h5>
							<p className='m-0 font-normal text-font1'>
								{userProfile?.name}
							</p>
						</div>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Gender</h5>
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
							<h5 className='text-gray-400 m-0'>Phone Number</h5>
							<p className='m-0 font-normal text-font1'>NA</p>
						</div>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Email</h5>
							<p className='m-0 font-normal text-font1'>
								{userProfile?.email}
							</p>
						</div>
					</div>
				</div>
				{user?.role === 'instructor' && (
					<>
						{/*****--------------Educational Information---------------*****/}
						<div className='info-container'>
							<h4 className='text-font1 font-medium text-lg'>
								Educational Information
							</h4>
							<div className='grid grid-cols-4 items-center'>
								<div className='space-y-1'>
									<h5 className='text-gray-400 m-0'>
										Institution Name
									</h5>
									<p className='m-0 font-normal text-font1'>
										{userProfile.instructor.institutionName}
									</p>
								</div>
								<div className='space-y-1'>
									<h5 className='text-gray-400 m-0'>
										Degree
									</h5>
									<p className='m-0 font-normal text-font1'>
										{userProfile?.instructor?.degreeTitle}
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
							</div>
						</div>
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
											<Tag style={{ padding: '4px 4px', borderRadius: '8px' }} >
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
