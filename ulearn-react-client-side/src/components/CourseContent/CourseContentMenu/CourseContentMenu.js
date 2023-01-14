import React from 'react';
import { BiBookReader } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const CourseContentMenu = ({ courseContent }) => {
	const navigate = useNavigate();

	const handleDetailPage = (id) => {
		navigate(`lesson/${id}`);
	};
	return (
		<section className=' mx-auto pt-6 px-4'>
			
		</section>
	);
};

export default CourseContentMenu;
