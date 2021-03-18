import React, { useRef } from 'react';
import { GrFormClose } from 'react-icons/gr';
import styled from 'styled-components';

const Modal = ({ showModal, setShowModal, selectedMission }) => {
	const modalRef = useRef();

	const closeModal = (e) => {
		if (modalRef.current === e.target) {
			setShowModal(false);
		}
	};

	return (
		<>
			{showModal ? (
				<StyledSection ref={modalRef} onClick={closeModal}>
					<div className='modal-wrapper'>
						<div className='title-wrapper'>
							<GrFormClose
								className='close-btn'
								onClick={() => setShowModal(false)}
							/>
							<div className='title'>
								<h2>{selectedMission.name.toUpperCase()}</h2>
								<h1>OVERVIEW</h1>
							</div>
							<img src={selectedMission.links.patch.small} alt='patch' />
						</div>

						<ul className='description'>
							<li>
								<h3>PAYLOAD:</h3>
								<h3>{selectedMission.payloads[0].name.toUpperCase()}</h3>
							</li>
							<li>
								<h3>ORBIT</h3>
								<h3>{selectedMission.payloads[0].orbit.toUpperCase()}</h3>
							</li>
							<li>
								<h3>MAX DISTANCE</h3>
								<h3>{selectedMission.payloads[0].periapsis_km} km</h3>
							</li>
							<li>
								<h3>REUSED</h3>
								<h3>{selectedMission.payloads[0].reused.toString()}</h3>
							</li>
							<li>
								<h3>TYPE</h3>
								<h3>{selectedMission.payloads[0].type.toUpperCase()}</h3>
							</li>
							<li>
								<h3>MANUFACTURER</h3>
								<h3>
									{selectedMission.payloads[0].manufacturers[0].toUpperCase()}
								</h3>
							</li>
							<li>
								<p>{selectedMission.details}</p>
							</li>
						</ul>
					</div>
				</StyledSection>
			) : null}
		</>
	);
};

export default Modal;

const StyledSection = styled.section`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100vw;
	min-height: 100vh;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.5);
	z-index: 10;
	.modal-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		width: 30%;
		border-radius: 0.2rem;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 1);
		background: #005288;
		z-index: 10;
		padding: 1rem;
		position: relative;
	}

	.close-btn {
		width: 2rem;
		height: 2rem;
		position: absolute;
		top: 10px;
		right: 10px;
		transition: all 0.1s ease-in-out;
		cursor: pointer;
	}

	.close-btn:hover {
		transform: scale(1.5);
	}

	.title-wrapper {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-evenly;
		margin: 1rem;
	}

	img {
		height: 8rem;
		width: auto;
		padding: 0.5rem;
	}

	.description {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #b3b3b3;
	}

	h1 {
		font-size: 2rem;
	}

	h2 {
		font-size: 1rem;
		font-weight: 400;
	}

	h3 {
		font-size: 0.8rem;
		font-weight: 400;
		padding: 0.8rem;
	}

	p {
		font-size: 0.8rem;
		font-weight: 300;
		margin: 1rem 0.5rem;
		margin-bottom: 0rem;
	}

	li:last-of-type {
		border-bottom: none;
	}
	@media only screen and (max-width: 1024px) {
		.modal-wrapper {
			width: 40%;
		}
	}

	@media only screen and (max-width: 768px) {
		.modal-wrapper {
			width: 60%;
		}
	}
	@media only screen and (max-width: 480px) {
		.modal-wrapper {
			width: 90%;
		}
	}
	@media only screen and (max-width: 480px) {
		h1 {
			font-size: 1.5rem;
		}

		h2 {
			font-size: 0.8rem;
			font-weight: 400;
		}
		.modal-wrapper {
			padding: 0.5rem;
		}
	}
`;
