import { useEffect, useState } from 'react';
import React from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [rockets, setRockets] = useState([]);
	const [nextLaunch, setNextLaunch] = useState([]);

	useEffect(() => {
		getRockets();
		getNextLaunch();
	}, []);

	const getRockets = async () => {
		const response = await fetch('https://api.spacexdata.com/v4/rockets');
		const data = await response.json();
		setRockets(data);
	};

	const getNextLaunch = async () => {
		const response = await fetch('https://api.spacexdata.com/v4/launches/next');
		const data = await response.json();
		setNextLaunch(data);
	};

	const getPathName = (name) => {
		const pathName = name.replace(/%20/g, '');
		return pathName.split(' ').join('');
	};

	return (
		<AppContext.Provider value={{ rockets, nextLaunch, getPathName }}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
