import React from 'react';
import './CustomSelect.css';

// library components
import { Select } from 'antd';

const CustomSelect = ({ placeholder, options, ...rest }) => {
	return (
		<Select
			{...rest}
			showSearch
			placeholder={placeholder}
			optionFilterProp='children'
			size='large'
			filterOption={(input, option) =>
				(option?.label ?? '')
					.toLowerCase()
					.includes(input.toLowerCase())
			}
			options={options}
			dropdownStyle={{ borderRadius: '8px' }}
			style={{
				width: '100%',
			}}
		/>
	);
};

export default CustomSelect;
