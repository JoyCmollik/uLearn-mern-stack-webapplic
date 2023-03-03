import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketProvider';

const useSocket = () => {
	return useContext(SocketContext);
};

export default useSocket;
