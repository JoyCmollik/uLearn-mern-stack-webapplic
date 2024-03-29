import React, { useEffect, useState } from 'react';
import './DashboardSidebar.css';
// components
import ulearnLogo from '../../../images/ulearn_logo.png';
import SideBarLink from '../SideBarLink/SideBarLink';
// icons
import {
	MdOutlineDashboard,
	MdHdrWeak,
	MdLeaderboard,
	MdOutlinePeople,
	MdOutlineAdminPanelSettings,
	MdOutlineManageAccounts,
	MdPersonAddAlt,
	MdDocumentScanner,
} from 'react-icons/md';
import { BsWindowDock } from 'react-icons/bs';
import { TbCertificate } from 'react-icons/tb';
import { AiOutlineSetting } from 'react-icons/ai';
import { FaUsersCog } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
// library components
import { Collapse } from 'antd';
import {
	HiOutlineDocumentAdd,
	HiOutlineHome,
	HiOutlinePaperClip,
} from 'react-icons/hi';
const { Panel } = Collapse;

// local component
const PanelHeader = ({ icon, title }) => {
	return (
		<div className='flex items-center text-base space-x-2 bg-white'>
			{icon} <span>{title} </span>
		</div>
	);
};

const DashboardSidebar = () => {
	const location = useLocation();
	const [pathname, setPathName] = useState(location.pathname);

	useEffect(() => {
		setPathName(window.location.pathname);
	}, [location]);

	console.log(pathname);

	return (
		<div className='space-y-10 sticky top-10'>
			{/*****--------------logo---------------*****/}
			<div className='logo-container rounded-lg bg-white text-center'>
				<div className=' flex justify-center items-center space-x-1'>
					<img
						className='w-[100px] h-[40px] object-cover'
						src={ulearnLogo}
						alt=''
					/>
				</div>
			</div>
			{/*****--------------links---------------*****/}
			<div className='space-y-2 pl-4 admin-dashboard-links'>
				<SideBarLink to='/admin/dashboard' end>
					<MdOutlineDashboard size={20} /> <span>Dashboard</span>
				</SideBarLink>

				{/*****--------------Course Links---------------*****/}

				<SideBarLink to='/admin/dashboard/manage-courses' end>
					<FaUsersCog size={20} /> <span>Manage Courses</span>
				</SideBarLink>
				<SideBarLink to='/admin/dashboard/manage-courses/add'>
					<HiOutlineDocumentAdd size={20} />{' '}
					<span>Add New Courses</span>
				</SideBarLink>
				<SideBarLink to='/admin/dashboard/manage-courses/categories'>
					<HiOutlinePaperClip size={20} />{' '}
					<span>Course Category</span>
				</SideBarLink>
				{/* <SideBarLink to='/admin/dashboard/manage-courses/coupons'>
					<MdPersonAddAlt size={20} /> <span>Coupons</span>
				</SideBarLink> */}

				{/* ****--------------Enrollment Links---------------****
				<CollapsedSideLinksContainer>
					<Panel
						header={
							<PanelHeader
								icon={<MdHdrWeak size={20} />}
								title='Enrollment'
							/>
						}
						key='1'
						style={{ padding: '0 !important' }}
					>
						<SideBarLink to='/admin/enroll-course'>
							<FaUsersCog size={20} />{' '}
							<span>Course Enrollment</span>
						</SideBarLink>
						<SideBarLink to='/admin/enrollment-history'>
							<MdPersonAddAlt size={20} />{' '}
							<span>Enrollment History</span>
						</SideBarLink>
					</Panel>
				</CollapsedSideLinksContainer> */}

				{/*****--------------Report section nav links---------------*****/}
				{/* <CollapsedSideLinksContainer>
					<Panel
						header={
							<PanelHeader
								icon={<MdLeaderboard size={20} />}
								title='Report'
							/>
						}
						key='1'
						style={{ padding: '0 !important' }}
						className={`${
							pathname.includes('/report') &&
							'bg-gradient-to-t from-light via-transparent to-transparent'
						}`}
					>
						<SideBarLink to='/admin/dashboard/report/revenue'>
							<FaUsersCog size={20} /> <span>Admin Revenue</span>
						</SideBarLink>
						<SideBarLink to='/admin/report/purchase-history'>
							<MdPersonAddAlt size={20} />{' '}
							<span>Purchase History</span>
						</SideBarLink>
					</Panel>
				</CollapsedSideLinksContainer> */}

				{/*****--------------User section nav links---------------*****/}

				{/*****--------------Admin links---------------*****/}

				<SideBarLink to='/admin/dashboard/manage-users/admin'>
					<MdOutlineAdminPanelSettings size={20} />{' '}
					<span>Manage Admins </span>
				</SideBarLink>

				{/*****--------------Content Writer Nav Links---------------*****/}

				<SideBarLink to='/admin/dashboard/manage-users/content-writer'>
					<MdDocumentScanner size={20} />{' '}
					<span>Manage Content Writers </span>
				</SideBarLink>

				{/*****--------------Learner Links---------------*****/}

				<SideBarLink to='/admin/dashboard/manage-users/learner'>
					<FaUsersCog size={20} /> <span>Manage Learner </span>
				</SideBarLink>

				{/* <SideBarLink to='/admin/certificate'>
					<TbCertificate size={20} /> <span>Certificate</span>
				</SideBarLink>
				<SideBarLink to='/admin/settings'>
					<AiOutlineSetting size={20} /> <span>Settings</span>
				</SideBarLink> */}
				<SideBarLink to='/admin/dashboard/manage-profile'>
					<MdOutlineManageAccounts size={20} />{' '}
					<span>Manage Profile</span>
				</SideBarLink>
				<SideBarLink to='/'>
					<HiOutlineHome size={20} /> <span>Go Back To Home</span>
				</SideBarLink>
			</div>
		</div>
	);
};

export default DashboardSidebar;
