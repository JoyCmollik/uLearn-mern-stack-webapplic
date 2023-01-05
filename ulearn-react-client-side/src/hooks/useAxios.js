import axios from 'axios';

const useAxios = () => {
	const client = axios.create({
		baseURL: 'http://localhost:5001/api/v1/',
	});
	const instructor = axios.create({
		baseURL: 'http://localhost:5001/api/v1/instructor/',
	});
	const admin = axios.create({
		baseURL: 'http://localhost:5001/api/v1/admin/',
	});
	return { client, instructor, admin };
};

export default useAxios;
