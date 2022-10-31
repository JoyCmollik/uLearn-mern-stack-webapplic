import React from 'react';
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	LabelList,
} from 'recharts';

const data = [
	{ name: 'Active Courses', value: 100 },
	{ name: 'Pending Courses', value: 90 },
];
const COLORS = ['#1CD767','#fed81d'];

const CourseOverview = () => {
	return (
		<PieChart width={400} height={200}>
			<Pie
				data={data}
				cx='50%'
				cy='50%'
				innerRadius={60}
				outerRadius={80}
				fill='#8884d8'
				paddingAngle={5}
				dataKey='value'
				isAnimationActive={true}
			>
				{data.map((entry, index) => (
					<>
						<Cell
							key={`cell-${index}`}
							fill={COLORS[index % COLORS.length]}
						/>
						<LabelList dataKey='value' position='insideStart' />
						<Tooltip />
					</>
				))}
			</Pie>
		</PieChart>
	);
};

export default CourseOverview;
