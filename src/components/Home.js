import React, { useContext, useState } from 'react';
import { AppContext } from '../context';
import Timer from './Timer';
import LaunchDetails from './LaunchDetails';
import styled from 'styled-components';

const Home = () => {
	const { nextLaunch } = useContext(AppContext);
	const [open, setOpen] = useState(false);

	return (
		<>
			{nextLaunch && (
				<StyledDiv>
					<div className='wrapper'>
						<div className='mission'>
							<p>UPCOMING</p>
							<h1>{nextLaunch.name.toUpperCase()}</h1>
							<h1>MISSION</h1>
							<button onClick={() => setOpen(!open)}>
								{open ? 'CLOSE' : 'DESCRIPTION'}
							</button>
						</div>
						<Timer />
					</div>
					{open && (
						<LaunchDetails className='launch-details' nextLaunch={nextLaunch} />
					)}
				</StyledDiv>
			)}
		</>
	);
};

export default Home;

const StyledDiv = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.wrapper {
		height: 40vh;
		width: 80vw;
		padding: 2rem;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	.mission p {
		font-size: 2rem;
	}

	.mission h1 {
		font-size: 3rem;
	}

	button {
		width: 8rem;
		margin-top: 1rem;
		font-size: 1rem;
		padding: 0.5rem 0.5rem;
		border: none;
		background-color: #005288;
		color: #fff;
		border-radius: 0.1rem;
		transition: all 0.1s ease-in-out;
		border: 3px solid #005288;
		cursor: pointer;
	}

	button:hover {
		border: 3px solid #005288;
		background: #fff;
		color: #005288;
		outline: none;
	}

	button:focus {
		outline: none;
	}
`;
