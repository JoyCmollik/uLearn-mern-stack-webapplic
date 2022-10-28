import { Collapse } from 'antd';
import React from 'react'

<<<<<<< HEAD
const CollapsedSideLinksContainer = ({children}) => {
  return (
		<Collapse
			expandIconPosition='end'
			ghost
			style={{ padding: '0 !important' }}
			accordion
		>
			{children}
=======
const CollapsedSideLinksContainer = () => {
  return (
		<Collapse
			defaultActiveKey={['1']}
			expandIconPosition='end'
			ghost
			className='site-collapse-custom-collapse'
		>
			{/* <Panel
				header={
					<PanelHeader
						icon={<MdOutlinePeople size={20} />}
						title='User'
					/>
				}
				key='1'
				className='site-collapse-custom-panel'
			>
				<Collapse defaultActiveKey='1' expandIconPosition='end' ghost>
					<Panel
						header={
							<PanelHeader
								icon={<MdOutlineAdminPanelSettings size={20} />}
								title='Admin'
							/>
						}
						key='1'
					>
						<SideBarLink to='/admin/manage-admins' end>
							<FaUsersCog size={20} /> <span>Manage Admins </span>
						</SideBarLink>
						<SideBarLink to='/admin/add-admin' end>
							<MdPersonAddAlt size={20} />{' '}
							<span>Add New Admin</span>
						</SideBarLink>
					</Panel>
				</Collapse>
			</Panel> */}
>>>>>>> dev-shahida
		</Collapse>
  );
}

export default CollapsedSideLinksContainer