import React, { useContext } from 'react';
import { AppContext } from '../context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
	const { rockets, getPathName } = useContext(AppContext);

	return (
		<>
			{rockets.length > 0 ? (
				<StyledNav>
					<Link to='/'>
						<img src='images/logo.svg' alt='Spacex-logo' />
					</Link>
					<ul>
						{rockets.map((rocket) => {
							return (
								<Link
									key={rocket.id}
									to={getPathName(rocket.name).toLowerCase()}
								>
									<h3>{rocket.name.toUpperCase()}</h3>
								</Link>
							);
						})}
						<Link to='/missions'>
							<button>MISSIONS</button>
						</Link>
					</ul>
				</StyledNav>
			) : null}
		</>
	);
};

export default Nav;

const StyledNav = styled.nav`
	min-height: 10vh;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 5rem;

	img {
		height: 2.5rem;
	}

	ul {
		display: flex;
		max-width: 600px;
		width: 60vw;
		align-items: center;
		justify-content: space-around;
	}

	h3 {
		color: #fff;
		font-size: 0.9rem;
		transition: all 0.1s ease-in-out;
	}

	a {
		text-decoration: none;
	}

	h3:hover {
		transform: scale(0.95);
		color: #005288;
	}

	button {
		width: 8rem;
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
		padding: 1rem;

		img {
			height: 2.2rem;
		}

		h3 {
			font-size: 0.8rem;
		}

		button {
			width: 6rem;
			font-size: 0.8rem;
		}
	}

	@media only screen and (max-width: 768px) {
		flex-direction: column;
		padding: 0.5rem;

		ul {
			width: 100%;
			justify-content: space-evenly;
		}

		img {
			margin-bottom: 0.5rem;
		}
	}

	@media only screen and (max-width: 480px) {
		h3 {
			font-size: 0.7rem;
		}
		button {
			width: 5rem;
			font-size: 0.7rem;
		}
	}
`;
