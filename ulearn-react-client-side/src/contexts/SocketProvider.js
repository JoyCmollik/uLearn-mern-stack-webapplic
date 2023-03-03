import { message } from 'antd';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
	const [connectedUsers, setConnectedUsers] = useState([]);
	const { user } = useAuth();
	const socket = useRef(false);

	useEffect(() => {
		if (!socket.current && user) {
			socket.current = io.connect(process.env.REACT_APP_SERVER, {
				auth: { userId: user.userId },
			});
		}

		if (socket.current && user) {
			socket.current.emit('join');
			// socket.current.on('connectedUsers', ({ users }) => {
			// 	if (users.length) {
			// 		setConnectedUsers(users);
			// 	}
			// });
		}

		return () => {
			if (socket.current) {
				socket.current.disconnect();
				socket.current = false;
			}
		};
	}, [user]);

	const allContexts = { socket, connectedUsers };

	return (
		<SocketContext.Provider value={allContexts}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
