import { Collapse } from 'antd';
import React from 'react'

const CollapsedSideLinksContainer = ({children}) => {
  return (
		<Collapse
			expandIconPosition='end'
			ghost
			style={{ padding: '0 !important' }}
			accordion
		>
			{children}
		</Collapse>
  );
}

export default CollapsedSideLinksContainer