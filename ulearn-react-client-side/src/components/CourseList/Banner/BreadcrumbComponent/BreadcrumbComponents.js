import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './BreadcrumbComponent.css';
const BreadcrumbComponents = ({ currLinkTitle }) => {
	return (
		<Breadcrumb
			className='text-white'
			separator={<span className='text-white'>/</span>}
		>
			<Breadcrumb.Item>
				<Link to='/' className=''>
					Home
				</Link>
			</Breadcrumb.Item>
			<Breadcrumb.Item className='underline text-white'>
				{currLinkTitle || window?.location.pathname}
			</Breadcrumb.Item>
		</Breadcrumb>
	);
};

export default BreadcrumbComponents;
