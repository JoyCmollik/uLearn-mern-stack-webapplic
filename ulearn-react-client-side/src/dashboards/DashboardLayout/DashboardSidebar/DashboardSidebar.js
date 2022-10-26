import React from 'react';
import './DashboardSidebar.css';
import SideBarLink from '../SideBarLink/SideBarLink';
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
import { NavLink } from 'react-router-dom';
import { Collapse } from 'antd';
const { Panel } = Collapse;

const PanelHeader = ({icon, title}) => {
	return <div className='flex items-center text-base space-x-2'>
		 {icon} <span>{title} </span>
	</div>;
}

const DashboardSidebar = () => {
	return (
		<div className='space-y-10'>
			{/* logo */}
			<div className='logo-container p-2 rounded-lg bg-white text-center'>
				<h2 className='font-semibold text-2xl m-0'>
					<span className='text-primary font-bold'>u</span>
					<span className='text-brand font-bold'>L</span>earn
				</h2>
			</div>
			{/* links */}
			<div className='space-y-2 pl-4'>
				<SideBarLink to='/admin/dashboard' end>
					<MdOutlineDashboard size={20} /> <span>Dashboard</span>
				</SideBarLink>
				<SideBarLink to='/admin/courses' end>
					<BsWindowDock size={20} /> <span>Courses</span>
				</SideBarLink>
				<SideBarLink to='/admin/enrollment' end>
					<MdHdrWeak size={20} /> <span>Enrollment</span>
				</SideBarLink>
				<SideBarLink to='/admin/report' end>
					<MdLeaderboard size={20} /> <span>Report</span>
				</SideBarLink>
				<Collapse
					defaultActiveKey={['1']}
					expandIconPosition='end'
					ghost
					className='site-collapse-custom-collapse'
				>
					<Panel
						header={
							<PanelHeader
								icon={<MdOutlinePeople size={20} />}
								title='User'
							/>
						}
						key='1'
						className='site-collapse-custom-panel'
					>
						<Collapse
							defaultActiveKey='1'
							expandIconPosition='end'
							ghost
						>
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
							>
								<SideBarLink to='/admin/manage-admins' end>
									<FaUsersCog size={20} />{' '}
									<span>Manage Admins </span>
								</SideBarLink>
								<SideBarLink to='/admin/add-admin' end>
									<MdPersonAddAlt size={20} />{' '}
									<span>Add New Admin</span>
								</SideBarLink>
							</Panel>
						</Collapse>
					</Panel>
				</Collapse>
				<SideBarLink to='/admin/certificate' end>
					<TbCertificate size={20} /> <span>Certificate</span>
				</SideBarLink>
				<SideBarLink to='/admin/settings' end>
					<AiOutlineSetting size={20} /> <span>Settings</span>
				</SideBarLink>
				<SideBarLink to='/admin/manage-profile' end>
					<MdOutlineManageAccounts size={20} />{' '}
					<span>Manage Profile</span>
				</SideBarLink>
			</div>
		</div>
	);
};

export default DashboardSidebar;
