import { Collapse } from 'antd';
import React from 'react';

const CollapsedSideLinksContainer = ({ children }) => {
	return (
		<Collapse
			expandIconPosition='end'
			ghost
			className='site-collapse-custom-collapse'
			accordion
		>
			{children}
		</Collapse>
	);
};

export default CollapsedSideLinksContainer;
