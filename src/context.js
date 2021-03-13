import { useEffect, useState } from 'react';
import React from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [rockets, setRockets] = useState([]);
	const [nextLaunch, setNextLaunch] = useState();
	const [missions, setMissions] = useState();

	//get the rockets
	useEffect(() => {
		fetch('https://api.spacexdata.com/v4/rockets')
			.then((response) => response.json())
			.then((data) => setRockets(data));
	}, []);

	//get next launch details
	useEffect(() => {
		fetch('https://api.spacexdata.com/v4/launches/next')
			.then((response) => response.json())
			.then((data) => setNextLaunch(data));
	}, []);

	const getPathName = (name) => {
		const pathName = name.replace(/%20/g, ' ');
		return pathName.split(' ').join('');
	};

	return (
		<AppContext.Provider value={{ rockets, nextLaunch, getPathName, missions }}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
