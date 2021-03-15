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

	const renderTime = (string) => {
		if (string.length > 1) {
			return (
				<div className='time-box'>
					<span>{string[0]}</span>
					<span>{string[1]}</span>
				</div>
			);
		} else {
			return (
				<div className='time-box'>
					<span>0</span>
					<span>{string[0]}</span>
				</div>
			);
		}
	};

	return (
		<StyledTimer>
			<div className='time-unit'>
				<h3>DAYS</h3>
				{renderTime(timeToLaunch.days)}
			</div>
			<div className='time-unit'>
				<h3>HOURS</h3>
				{renderTime(timeToLaunch.hours)}
			</div>
			<div className='time-unit'>
				<h3>MINS</h3>
				{renderTime(timeToLaunch.mins)}
			</div>
			<div className='time-unit'>
				<h3>SECS</h3>
				{renderTime(timeToLaunch.secs)}
			</div>
		</StyledTimer>
	);
};

export default Timer;

const StyledTimer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	padding: 1rem;

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

	@media screen and (max-width: 1024px) {
		h3 {
			font-size: 1rem;
		}

		.time-box {
			padding: 0.1rem;
		}

		span {
			width: 2rem;
			font-size: 3rem;
			font-weight: 300;
			margin: 0.1rem;
		}
	}
`;
