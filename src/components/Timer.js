import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context';
import styled from 'styled-components';

const Timer = () => {
	const { nextLaunch } = useContext(AppContext);
	const [timeToLaunch, setTimeToLaunch] = useState({
		days: '0',
		hours: '0',
		mins: '0',
		secs: '0',
	});

	const calculateTimeleft = () => {
		const launchDate = nextLaunch.date_unix;
		const now = Math.floor(new Date().getTime() / 1000);
		const diff = launchDate - now;
		let timeLeft = {};

		if (diff > 0) {
			timeLeft = {
				days: Math.floor(diff / (60 * 60 * 24)).toString(),
				hours: Math.floor((diff % (60 * 60 * 24)) / (60 * 60)).toString(),
				mins: Math.floor((diff / 60) % 60).toString(),
				secs: Math.floor(diff % 60).toString(),
			};
		} else {
			timeLeft = {
				days: '0',
				hours: '0',
				mins: '0',
				secs: '0',
			};
		}
		return timeLeft;
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeToLaunch(calculateTimeleft());
		}, 1000);
		return () => clearTimeout(timer);
	}, [timeToLaunch]);

	const checkFirstChar = (string) => (string.length === 1 ? '0' : string[0]);
	const checkSecondChar = (string) =>
		string.length === 1 ? string[0] : string[1];

	return (
		<StyledTimer>
			<div className='time-unit'>
				<h3>DAYS</h3>
				<div className='time-box'>
					<span>{checkFirstChar(timeToLaunch.days)}</span>
					<span>{checkSecondChar(timeToLaunch.days)}</span>
				</div>
			</div>
			<div className='time-unit'>
				<h3>HOURS</h3>
				<div className='time-box'>
					<span>{checkFirstChar(timeToLaunch.hours)}</span>
					<span>{checkSecondChar(timeToLaunch.hours)}</span>
				</div>
			</div>
			<div className='time-unit'>
				<h3>MINS</h3>
				<div className='time-box'>
					<span>{checkFirstChar(timeToLaunch.mins)}</span>
					<span>{checkSecondChar(timeToLaunch.mins)}</span>
				</div>
			</div>
			<div className='time-unit'>
				<h3>SECS</h3>
				<div className='time-box'>
					<span>{checkFirstChar(timeToLaunch.secs)}</span>
					<span>{checkSecondChar(timeToLaunch.secs)}</span>
				</div>
			</div>
		</StyledTimer>
	);
};

export default Timer;

const StyledTimer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;

	h3 {
		text-align: center;
		font-weight: 400;
		font-size: 1.5rem;
	}

	.time-box {
		display: flex;
		flex-direction: row;
		padding: 0.3rem;
	}

	span {
		width: 3rem;
		font-size: 4rem;
		text-align: center;
		font-weight: 300;
		background-color: rgba(255, 255, 255, 0.1);
		margin: 0.2rem;
		border-radius: 0.1rem;
	}
`;
