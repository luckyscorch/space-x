import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

const Rocket = () => {
	const { rockets, getPathName } = useContext(AppContext);
	const { rocket } = useParams();
	const [selectedRocket, setSelectedRocket] = useState([]);

	useEffect(() => {
		const selected = rockets.filter(
			(r) => getPathName(r.name.toLowerCase()) === rocket
		);

		setSelectedRocket(selected[0]);
	}, [rocket, rockets, getPathName]);

	return (
		<>
			{selectedRocket.length === 0 ? null : (
				<StyledSection>
					<div className='wrapper'>
						<div className='overview'>
							<div className='name'>
								<h3>{selectedRocket.name.toUpperCase()}</h3>
								<h1>OVERVIEW</h1>
							</div>
							<table>
								<tbody>
									<tr>
										<td>FIRST LAUNCH</td>
										<td>{selectedRocket.first_flight}</td>
									</tr>
									<tr className='line'></tr>
									<tr>
										<td>HEIGHT</td>
										<td>
											{selectedRocket.height.meters} m
											<span> / {selectedRocket.height.feet} ft</span>
										</td>
									</tr>
									<tr className='line'></tr>
									<tr>
										<td>DIAMETER</td>
										<td>
											{selectedRocket.diameter.meters} m
											<span> / {selectedRocket.diameter.feet} ft</span>
										</td>
									</tr>
									<tr className='line'></tr>
									<tr>
										<td>MASS</td>
										<td>
											{selectedRocket.mass.kg} kg
											<span> / {selectedRocket.mass.lb} lb</span>
										</td>
									</tr>
									<tr className='line'></tr>
									<tr>
										<td>PAYLOAD TO LEO</td>
										<td>
											{selectedRocket.payload_weights[0].kg} kg
											<span> / {selectedRocket.payload_weights[0].lb} lb</span>
										</td>
									</tr>
									<tr className='line'></tr>
									<tr>
										<td>PAYLOAD TO GTO</td>
										<td>
											{selectedRocket.payload_weights[1]
												? selectedRocket.payload_weights[1].kg
												: ' - '}{' '}
											kg
											<span>
												{' '}
												/{' '}
												{selectedRocket.payload_weights[1]
													? selectedRocket.payload_weights[1].lb
													: ' - '}{' '}
												lb
											</span>
										</td>
									</tr>
									<tr className='line'></tr>
									<tr>
										<td>PAYLOAD TO MARS</td>
										<td>
											{selectedRocket.payload_weights[2]
												? selectedRocket.payload_weights[2].kg
												: ' - '}{' '}
											kg
											<span>
												{' '}
												/{' '}
												{selectedRocket.payload_weights[2]
													? selectedRocket.payload_weights[2].lb
													: ' - '}{' '}
												lb
											</span>
										</td>
									</tr>
									<tr className='line'></tr>
								</tbody>
							</table>
						</div>
						<div className='imgcontainer'>
							<img
								src={`images/${rocket}.png`}
								alt='rocket'
								className={rocket.toString()}
							/>
						</div>
					</div>
				</StyledSection>
			)}
		</>
	);
};

export default Rocket;

const StyledSection = styled.section`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100vw;
	height: 85vh;

	.wrapper {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 60%;
		height: 80%;
	}

	.name {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 3rem;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 300;
	}

	.imgcontainer {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 6rem;
	}

	img {
		height: 80vh;
	}

	.falcon1 {
		height: 30vh !important;
	}

	.overview {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	table {
		display: flex;
		width: 30vw;
		height: 100%;
		align-items: center;
		justify-content: center;
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

	span {
		color: #a1a1a1;
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
		.wrapper {
			justify-content: space-evenly;
			width: 100%;
			padding: 0.5rem;
		}

		table {
			width: 50vw;
		}
	}

	@media only screen and (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

		h3 {
			font-size: 1rem;
		}

		table {
			width: 65vw;
		}
		img {
			height: 60vh;
		}
		td {
			font-size: 0.8rem;
		}
	}
	@media only screen and (max-width: 360px) {
		h1 {
			font-size: 1.5rem;
		}

		h3 {
			font-size: 0.8rem;
		}

		table {
			width: 60vw;
		}
		img {
			height: 60vh;
		}
		td {
			font-size: 0.6rem;
		}
	}
`;
