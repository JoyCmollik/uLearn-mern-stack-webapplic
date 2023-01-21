import React from 'react';
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	LabelList,
} from 'recharts';
const COLORS = ['#1CD767','#fed81d'];

const CourseOverview = ({courseStats}) => {	
	const data = [
		{ name: 'Active Courses', value: courseStats?.activeCourses },
		{ name: 'Pending Courses', value: courseStats?.pendingCourses },
	];
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
