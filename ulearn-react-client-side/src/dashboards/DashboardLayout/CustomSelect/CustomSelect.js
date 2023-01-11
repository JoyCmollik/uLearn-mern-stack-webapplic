import React from 'react';
import './CustomSelect.css';

// library components
import { Select } from 'antd';

const tempData = [
	{
		value: 'jack',
		label: 'Jack',
	},
	{
		value: 'lucy',
		label: 'Lucy',
	},
	{
		value: 'tom',
		label: 'Tom',
	},
	{
		value: '25',
		label: '25',
	},
];

const onChange = (value) => {
	console.log(`selected ${value}`);
};
const onSearch = (value) => {
	console.log('search:', value);
};

const CustomSelect = ({ placeholder, ...rest }) => {
	return (
		<Select
			{...rest}
			showSearch
			id='custom-select'
			placeholder={placeholder}
			optionFilterProp='children'
			onChange={onChange}
			onSearch={onSearch}
			size='large'
			filterOption={(input, option) =>
				(option?.label ?? '')
					.toLowerCase()
					.includes(input.toLowerCase())
			}
			options={tempData}
			dropdownStyle={{ borderRadius: '8px' }}
			style={{
				width: '100%',
			}}
		/>
	);
};

export default CustomSelect;
