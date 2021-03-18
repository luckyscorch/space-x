import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

const LaunchDetails = ({ nextLaunch }) => {
	const { date_unix, flight_number, launchpad } = nextLaunch;
	const landpad = nextLaunch.cores[0].landpad;
	const reused = nextLaunch.cores[0].reused;
	const numberOfFlights = nextLaunch.cores[0].flight;
	const [launchSite, setLaunchSite] = useState({});
	const [landSite, setLandSite] = useState({});

	const fetchLaunchpad = useCallback(async () => {
		try {
			const res = await fetch(
				`https://api.spacexdata.com/v4/launchpads/${launchpad}`
			);
			const data = await res.json();
			setLaunchSite(data);
		} catch (error) {
			console.log(error);
		}
	}, [launchpad]);

	const fetchLandpad = useCallback(async () => {
		try {
			const res = await fetch(
				`https://api.spacexdata.com/v4/landpads/${landpad}`
			);
			const data = await res.json();
			setLandSite(data);
		} catch (error) {
			console.log(error);
		}
	}, [landpad]);

	const unixToTime = (unix) => {
		const dateObj = new Date(unix * 1000);
		const utcString = dateObj.toUTCString();
		const date = utcString.slice(5, 16);
		return date;
	};

	useEffect(() => {
		fetchLaunchpad();
		fetchLandpad();
	}, [fetchLandpad, fetchLaunchpad]);

	return (
		<>
			{nextLaunch.length === 0 ? null : (
				<StyledDiv>
					<div className='description'>
						<div className='name'>
							<h3>{nextLaunch.name}</h3>
						</div>
						<p>
							{nextLaunch.details
								? nextLaunch.details
								: 'Check back later for more information..'}
						</p>
					</div>
					<img src={nextLaunch.links.patch.small} alt='patch' />
					<table>
						<tbody>
							<tr>
								<td>SCHEDULED LAUNCH</td>
								<td>{unixToTime(date_unix)}</td>
							</tr>
							<tr className='line'></tr>
							<tr>
								<td>LAUNCH SITE</td>
								<td>{launchSite.name ? launchSite.name : 'Undetermined'}</td>
							</tr>
							<tr className='line'></tr>
							<tr>
								<td>FLIGHT NUMBER</td>
								<td>{flight_number ? flight_number : 'Undetermined'}</td>
							</tr>
							<tr className='line'></tr>
							<tr>
								<td>LANDING SITE</td>
								<td> {landSite.name ? landSite.name : 'Undetermined'}</td>
							</tr>
							<tr className='line'></tr>
							<tr>
								<td>REUSED</td>
								<td>{reused ? 'True' : 'False'}</td>
							</tr>
							<tr className='line'></tr>
							<tr>
								<td>NUMBER OF FLIGHTS</td>
								<td>{numberOfFlights ? numberOfFlights : 'Undetermined'}</td>
							</tr>
							<tr className='line'></tr>
						</tbody>
					</table>
				</StyledDiv>
			)}
		</>
	);
};

export default LaunchDetails;

const StyledDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	width: 80vw;
	padding: 1rem 5rem;
	background-color: rgba(0, 0, 0, 0.5);
	position: relative;
	border-radius: 0.2rem;

	.name {
		display: flex;
		margin-bottom: 1rem;
	}

	h3 {
		font-size: 2rem;
		font-weight: 600;
	}

	p {
		font-size: 1.2rem;
		font-weight: 300;
	}

	img {
		width: 150px;
		height: 150px;
		position: absolute;
		top: -50px;
		right: -50px;
	}

	.description {
		display: flex;
		flex-direction: column;
		width: 40vw;
		padding-top: 0.5rem;
		padding-right: 0.5rem;
		justify-content: flex-start;
		align-items: flex-start;
	}

	table {
		display: flex;
		width: 50vw;
		height: 100%;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}
	tbody {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	tr {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	td:last-child {
		text-align: right;
	}

	td {
		font-size: 1rem;
	}

	.line {
		width: 100%;
		height: 1px;
		background: white;
		margin: 1rem;
	}

	.line:last-child {
		margin-bottom: 0;
	}

	@media only screen and (max-width: 1024px) {
		padding: 1rem;
		h3 {
			font-size: 1.5rem;
			font-weight: 600;
		}

		p {
			font-size: 1rem;
			font-weight: 300;
		}

		td {
			font-weight: 300;
		}

		img {
			width: 80px;
			height: 80px;
			position: absolute;
			top: -40px;
			right: -40px;
		}

		table {
			width: 50vw;
		}

		td {
			font-size: 1rem;
		}
	}

	@media only screen and (max-width: 768px) {
		padding: 0;
		.description {
			display: none;
		}
		table {
			width: 100%;
		}
	}
	@media only screen and (max-width: 480px) {
		td {
			font-size: 0.8rem;
		}

		img {
			width: 70px;
			height: 70px;
			position: absolute;
			top: -40px;
			right: -40px;
		}

		.line {
			margin: 0.5rem;
		}
	}
	@media only screen and (max-width: 360px) {
		td {
			font-size: 0.5rem;
		}

		img {
			width: 50px;
			height: 50px;
			position: absolute;
			top: -25px;
			right: -25px;
		}

		.line {
			margin: 0.5rem;
		}
	}
`;
