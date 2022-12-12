import { Button, Result } from 'antd';
import React from 'react'
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';

const AddFinishing = () => {
  return (
		<div className=''>
			<Result
				icon={
					<LordIcon
						src='https://cdn.lordicon.com/lupuorrc.json'
						size={100}
					/>
				}
				title='Great, we have done all the operations!'
				extra={
					<Button type='primary' size='large'>
						Submit
					</Button>
				}
			/>
		</div>
  );
}

export default AddFinishing