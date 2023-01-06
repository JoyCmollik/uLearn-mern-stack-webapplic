import React, { createContext } from 'react';
import useAuthentication from '../hooks/useAuthentication';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const allContexts = useAuthentication();

	return (
		<AuthContext.Provider value={allContexts}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
