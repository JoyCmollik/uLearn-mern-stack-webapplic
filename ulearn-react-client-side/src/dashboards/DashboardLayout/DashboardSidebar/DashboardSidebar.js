import React, { useEffect, useState } from 'react';
import './DashboardSidebar.css';
// components
import CollapsedSideLinksContainer from '../CollapsedSideLinksContainer/CollapsedSideLinksContainer';
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
} from 'react-icons/md';
import { BsWindowDock } from 'react-icons/bs';
import { TbCertificate } from 'react-icons/tb';
import { AiOutlineSetting } from 'react-icons/ai';
import { FaUsersCog } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
// library components
import { Collapse } from 'antd';
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
	}, [location])
	
	console.log(pathname);

	return (
		<div className='space-y-10'>
			{/*****--------------logo---------------*****/}
			<div className='logo-container rounded-lg bg-white text-center'>
				<h2 className='font-semibold text-2xl m-0'>
					<span className='text-primary font-bold'>u</span>
					<span className='text-brand font-bold'>L</span>earn
				</h2>
			</div>
			{/*****--------------links---------------*****/}
			<div className='space-y-2 pl-4 admin-dashboard-links'>
				<SideBarLink to='/admin/dashboard' end>
					<MdOutlineDashboard size={20} /> <span>Dashboard</span>
				</SideBarLink>

				{/*****--------------Course Links---------------*****/}
				<CollapsedSideLinksContainer>
					<Panel
						header={
							<PanelHeader
								icon={<BsWindowDock size={20} />}
								title='Courses'
							/>
						}
						key='1'
						style={{ padding: '0 !important' }}
					>
						<SideBarLink to='/admin/manage-courses'>
							<FaUsersCog size={20} /> <span>Manage Courses</span>
						</SideBarLink>
						<SideBarLink to='/admin/add-new-courses'>
							<MdPersonAddAlt size={20} />{' '}
							<span>Add New Courses</span>
						</SideBarLink>
						<SideBarLink to='/admin/course-category'>
							<MdPersonAddAlt size={20} />{' '}
							<span>Course Category</span>
						</SideBarLink>
						<SideBarLink to='/admin/manage-coupons'>
							<MdPersonAddAlt size={20} /> <span>Coupons</span>
						</SideBarLink>
					</Panel>
				</CollapsedSideLinksContainer>

				{/*****--------------Enrollment Links---------------*****/}
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
				</CollapsedSideLinksContainer>

				{/*****--------------Report section nav links---------------*****/}
				<CollapsedSideLinksContainer>
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
				</CollapsedSideLinksContainer>

				{/*****--------------User section nav links---------------*****/}
				<CollapsedSideLinksContainer>
					<Panel
						header={
							<PanelHeader
								icon={<MdOutlinePeople size={20} />}
								title='User'
							/>
						}
						key='1'
						style={{ padding: '0 !important' }}
					>
						<CollapsedSideLinksContainer>
							{/*****--------------Admin links---------------*****/}
							<Panel
								header={
									<PanelHeader
										icon={
											<MdOutlineAdminPanelSettings
												size={20}
											/>
										}
										title='Admin'
									/>
								}
								key='1'
								style={{ padding: '0 !important' }}
							>
								<SideBarLink to='/admin/manage-admins'>
									<FaUsersCog size={20} />{' '}
									<span>Manage Admins </span>
								</SideBarLink>
								<SideBarLink to='/admin/add-admin'>
									<MdPersonAddAlt size={20} />{' '}
									<span>Add New Admin</span>
								</SideBarLink>
							</Panel>

							{/*****--------------Content Writer Nav Links---------------*****/}
							<Panel
								header={
									<PanelHeader
										icon={
											<MdOutlineAdminPanelSettings
												size={20}
											/>
										}
										title='Content Writers'
									/>
								}
								key='2'
								style={{ padding: '0 !important' }}
							>
								<SideBarLink to='/admin/manage-content-writer'>
									<FaUsersCog size={20} />{' '}
									<span>Manage Content Writers </span>
								</SideBarLink>
								<SideBarLink to='/admin/add-content-writer'>
									<MdPersonAddAlt size={20} />{' '}
									<span>Add New Content Writer</span>
								</SideBarLink>
								<SideBarLink to='/admin/applications-content-writer'>
									<MdPersonAddAlt size={20} />{' '}
									<span>Applications</span>
								</SideBarLink>
							</Panel>

							{/*****--------------Learner Links---------------*****/}
							<Panel
								header={
									<PanelHeader
										icon={
											<MdOutlineAdminPanelSettings
												size={20}
											/>
										}
										title='Learner'
									/>
								}
								key='3'
								style={{ padding: '0 !important' }}
							>
								<SideBarLink to='/admin/manage-admins'>
									<FaUsersCog size={20} />{' '}
									<span>Manage Admins </span>
								</SideBarLink>
								<SideBarLink to='/admin/add-admin'>
									<MdPersonAddAlt size={20} />{' '}
									<span>Add New Admin</span>
								</SideBarLink>
							</Panel>
						</CollapsedSideLinksContainer>
					</Panel>
				</CollapsedSideLinksContainer>

				<SideBarLink to='/admin/certificate'>
					<TbCertificate size={20} /> <span>Certificate</span>
				</SideBarLink>
				<SideBarLink to='/admin/settings'>
					<AiOutlineSetting size={20} /> <span>Settings</span>
				</SideBarLink>
				<SideBarLink to='/admin/manage-profile'>
					<MdOutlineManageAccounts size={20} />{' '}
					<span>Manage Profile</span>
				</SideBarLink>
			</div>
		</div>
	);
};

export default DashboardSidebar;
