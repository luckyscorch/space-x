import React, { useEffect, useState, useCallback } from 'react';
import Modal from './Modal';
import {
	BiChevronDownCircle,
	BiChevronUpCircle,
	BiCircle,
} from 'react-icons/bi';
import CountUp from 'react-countup';
import styled from 'styled-components';

const Missions = () => {
	const [missions, setMissions] = useState([]);
	const [totalLaunches, setTotalLaunches] = useState(0);
	const [totalLandings, setTotalLandings] = useState(0);
	const [totalReflown, setTotalReflown] = useState(0);
	const [hasPrevPage, setHasPrevPage] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [showModal, setShowModal] = useState(false);
	const [selectedMission, setSelectedMission] = useState(null);

	useEffect(() => {
		getTotals();
	}, []);

	const getMissions = useCallback(async () => {
		const response = await fetch(
			'https://api.spacexdata.com/v4/launches/query',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: {},
					options: {
						populate: [
							{
								path: 'payloads',
							},
							{
								path: 'launchpad',
							},
							{
								path: 'rocket',
								select: {
									name: 1,
								},
							},
						],
						page: pageNumber,
					},
				}),
			}
		);
		const data = await response.json();
		setHasPrevPage(data.hasPrevPage);
		setHasNextPage(data.hasNextPage);
		setMissions(data.docs);
	}, [pageNumber]);

	useEffect(() => {
		getMissions();
	}, [getMissions]);

	const getTotals = async () => {
		let totalLand = 0;
		let totalReuse = 0;
		const response = await fetch(
			'https://api.spacexdata.com/v4/launches/query',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: {},
					options: { limit: 1000 },
				}),
			}
		);
		const data = await response.json();
		data.docs.map((item) => (item.success ? totalLand++ : null));
		data.docs.map((item) => (item.cores[0].reused ? totalReuse++ : null));
		setTotalLaunches(data.totalDocs);
		setTotalLandings(totalLand);
		setTotalReflown(totalReuse);
	};
	const prevPage = () => {
		if (hasPrevPage) {
			setPageNumber((prev) => prev - 1);
		}
	};

	const nextPage = () => {
		if (hasNextPage) {
			setPageNumber((prev) => prev + 1);
		}
	};

	const openModal = (mission) => {
		setSelectedMission(mission);
		setShowModal((prev) => !prev);
	};

	return (
		<>
			{missions.length === 0 ? null : (
				<StyledSection>
					<div className='totals'>
						<div className='total'>
							<h1>
								<CountUp end={totalLaunches} duration={3} />
							</h1>
							<p>TOTAL LAUNCHES</p>
						</div>
						<div className='total'>
							<h1>
								<CountUp end={totalLandings} duration={3} />
							</h1>
							<p>TOTAL LANDINGS</p>
						</div>
						<div className='total'>
							<h1>
								<CountUp end={totalReflown} duration={3} />
							</h1>
							<p>REFLOWN ROCKETS</p>
						</div>
					</div>
					<div className='mission-table'>
						<div className='controls'>
							<BiChevronUpCircle className='logo arrow' onClick={prevPage} />
							{missions.map((mission) => (
								<BiCircle className='logo' key={mission.id} />
							))}
							<BiChevronDownCircle className='logo arrow' onClick={nextPage} />
						</div>
						<table>
							<thead>
								<tr className='head'>
									<th>FLIGHT NO</th>
									<th>VEHICLE</th>
									<th>DATE</th>
									<th>LAUNCH SITE</th>
									<th>PAYLOAD</th>
									<th>CUSTOMER</th>
									<th>OUTCOME</th>
								</tr>
							</thead>
							<tbody>
								{missions.map((mission) => {
									return (
										<tr key={mission.id} onClick={() => openModal(mission)}>
											<td>{mission.flight_number}</td>
											<td>{mission.rocket.name}</td>
											<td>{mission.date_utc.slice(0, 10)}</td>
											<td>{mission.launchpad.name}</td>
											<td>{mission.payloads[0].name}</td>
											<td>{mission.payloads[0].customers}</td>
											<td className={mission.success ? 'success' : 'failure'}>
												{mission.success ? 'SUCCESS' : 'FAILURE'}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<Modal
							showModal={showModal}
							setShowModal={setShowModal}
							selectedMission={selectedMission}
						/>
					</div>
				</StyledSection>
			)}
		</>
	);
};

export default Missions;

const StyledSection = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	height: 85vh;
	width: 100vw;

	.totals {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 60vw;
	}

	.total {
		text-align: center;
		h1 {
			font-size: 3.5rem;
		}
		p {
			font-size: 1rem;
			margin-bottom: 0.5rem;
		}
	}

	.mission-table {
		width: 85vw;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 0.2rem;
		.controls {
			display: flex;
			height: 100%;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			padding-top: 0.75rem;
			padding-bottom: 0.75rem;
			.logo {
				width: 1.5rem;
				height: 1.5rem;
			}
			.logo:nth-last-of-type(10) {
				display: none;
			}
			.arrow {
				cursor: pointer;
				transition: all 0.1s ease-in-out;
			}
			.arrow:hover {
				transform: scale(1.2);
			}
		}
	}

	table {
		width: 100%;
		height: 100%;
		border-collapse: collapse;
		text-transform: uppercase;
		margin-left: 0.5rem;
	}

	.head:hover {
		background-color: rgba(0, 0, 0, 0) !important;
		cursor: auto;
	}

	tr {
		width: 100%;
		height: 3rem;
		display: flex;
		border-bottom: 1px solid white;
		cursor: pointer;
		justify-content: space-between;
		align-items: center;
	}

	tr:hover {
		background-color: rgba(0, 82, 136, 0.2) !important;
	}

	tr:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.5);
	}

	td {
		flex: 1 1 15%;
		font-size: 0.8rem;
		font-weight: 400;
		text-align: center;
	}

	th {
		flex: 1 1 15%;
		font-size: 0.8rem;
		font-weight: 600;
		text-align: center;
	}
	.success {
		font-weight: 600;
		color: green;
	}
	.failure {
		font-weight: 600;
		color: red;
	}

	@media only screen and (max-width: 1024px) {
		th:nth-child(4) {
			display: none;
		}
		td:nth-child(4) {
			display: none;
		}
	}
	@media only screen and (max-width: 768px) {
		height: 80%;
		.totals {
			width: 80%;
		}
		.total {
			padding: 1rem;
			p {
				margin-bottom: 0;
				font-size: 1rem;
			}
			h1 {
				font-size: 2.5rem;
			}
		}
		.mission-table {
			width: 98vw;
		}

		th:nth-child(5) {
			display: none;
		}

		th:nth-child(4) {
			display: none;
		}

		td:nth-child(5) {
			display: none;
		}

		td:nth-child(4) {
			display: none;
		}
	}

	@media only screen and (max-width: 480px) {
		.mission-table {
			.controls {
				padding-top: 0.75rem;
				padding-bottom: 0.75em;
				.logo {
					width: 1rem;
					height: 1rem;
				}
			}
		}
		.total {
			h1 {
				font-size: 2.5rem;
			}
			p {
				font-size: 1rem;
			}
		}
		tr {
			height: 2.2rem;
			cursor: pointer;
		}

		td {
			font-size: 0.7rem;
			font-weight: 400;
		}

		th {
			font-size: 0.7rem;
			font-weight: 500;
		}
		.success {
			font-weight: 500;
		}
		.failure {
			font-weight: 500;
		}
	}
`;
