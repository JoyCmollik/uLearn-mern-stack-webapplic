import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useCourseList = () => {
	const [courseList, setCourseList] = useState([]);
	useEffect(() => {
		axios
			.get('/courses')
			.then((response) => {
				//console.log(response.data.courses);
				setCourseList(response.data.courses);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return { courseList };
};

export default useCourseList;
