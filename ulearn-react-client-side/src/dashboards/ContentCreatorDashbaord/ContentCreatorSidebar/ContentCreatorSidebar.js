import React, { useEffect, useState } from 'react';
// components

// icons
import {
	MdOutlineDashboard,
	MdHdrWeak,
	MdLeaderboard,
	MdOutlinePeople,
	MdOutlineAdminPanelSettings,
	MdOutlineManageAccounts,
	MdPersonAddAlt,
	MdHome,
} from 'react-icons/md';
import { BsWindowDock } from 'react-icons/bs';
import { TbCertificate } from 'react-icons/tb';
import { AiOutlineSetting } from 'react-icons/ai';
import { FaUsersCog } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
// library components
import { Collapse } from 'antd';
import SideBarLink from '../../DashboardLayout/SideBarLink/SideBarLink';
import CollapsedSideLinksContainer from '../../DashboardLayout/CollapsedSideLinksContainer/CollapsedSideLinksContainer';
const { Panel } = Collapse;

// local component
const PanelHeader = ({ icon, title }) => {
	return (
		<div className='flex items-center text-base space-x-2 bg-white'>
			{icon} <span>{title} </span>
		</div>
	);
};

const ContentCreatorSidebar = () => {
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
				<h2 className='font-semibold text-2xl m-0'>
					<span className='text-primary font-bold'>u</span>
					<span className='text-brand font-bold'>L</span>earn
				</h2>
			</div>
			{/*****--------------links---------------*****/}
			<div className='space-y-2 pl-4 admin-dashboard-links'>
				<SideBarLink to='/content-creator/dashboard' end>
					<MdOutlineDashboard size={20} /> <span>Dashboard</span>
				</SideBarLink>

				{/*****--------------Course Links---------------*****/}
				<SideBarLink to='/content-creator/dashboard/manage-courses' end>
					<FaUsersCog size={20} /> <span>My Courses</span>
				</SideBarLink>
				<SideBarLink to='/content-creator/dashboard/manage-courses/add'>
					<MdPersonAddAlt size={20} /> <span>Add New Courses</span>
				</SideBarLink>
				{/* <SideBarLink to='/content-creator/dashboard/manage-courses/coupons'>
					<MdPersonAddAlt size={20} /> <span>Coupons</span>
				</SideBarLink> */}

				<SideBarLink to='/content-creator/dashboard/manage-profile'>
					<MdOutlineManageAccounts size={20} />{' '}
					<span>Manage Profile</span>
				</SideBarLink>
				<SideBarLink to='/'>
					<MdHome size={20} /> <span>Go Back Home</span>
				</SideBarLink>
			</div>
		</div>
	);
};

export default ContentCreatorSidebar;
