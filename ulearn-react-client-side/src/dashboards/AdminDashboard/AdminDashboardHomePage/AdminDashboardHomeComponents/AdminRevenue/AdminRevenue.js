import React from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

const data = [
	{
		name: 'January',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'February',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'March',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'April',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: 'May',
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: 'June',
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: 'July',
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

const AdminRevenue = () => {
	return (
		<ResponsiveContainer width='100%' height='90%'>
			<AreaChart
				data={data}
				margin={{
					top: 20,
					right: 30,
					left: 0,
					bottom: 70,
				}}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Area
					type='monotone'
					dataKey='uv'
					stroke='#8884d8'
					fill='#1F53F3'
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default AdminRevenue;
