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
			{nextLaunch.length === 0 ? null : (
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
	height: 80%;
	flex-direction: column;
	justify-content: space-evenly;
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
		font-size: 1.5rem;
	}

	.mission h1 {
		font-size: 2.5rem;
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

	@media only screen and (max-width: 1024px) {
		.mission p {
			font-size: 1.5rem;
		}

		.mission h1 {
			font-size: 2rem;
		}
		button {
			width: 8rem;
			margin-top: 1rem;
			font-size: 0.8rem;
			padding: 0.5rem 0.5rem;
		}
	}

	@media only screen and (max-width: 768px) {
		justify-content: space-evenly;
		.wrapper {
			flex-direction: column;
		}
		button {
			width: 6rem;
			margin-top: 1rem;
			font-size: 0.7rem;
			padding: 0.5rem 0.5rem;
		}
	}

	@media only screen and (max-width: 480px) {
		height: 70%;
		.wrapper {
			padding: 0;
		}
		.mission p {
			font-size: 1rem;
		}

		.mission h1 {
			font-size: 1.5rem;
		}
		button {
			width: 6rem;
			margin-top: 0.5rem;
			font-size: 0.7rem;
			padding: 0.5rem 0.5rem;
		}
	}
	@media only screen and (max-width: 360px) {
		height: 80%;
		.wrapper {
			padding: 0;
		}
		.mission p {
			font-size: 0.8rem;
		}

		.mission h1 {
			font-size: 1.2rem;
		}
		button {
			width: 5rem;
			margin-top: 0.3rem;
			font-size: 0.5rem;
			padding: 0.3rem 0.3rem;
		}
	}
`;
