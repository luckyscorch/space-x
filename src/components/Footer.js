import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ImTwitter, ImFlickr3, ImYoutube } from 'react-icons/im';

const Footer = () => {
	const [companyInfo, setCompanyInfo] = useState({});

	useEffect(() => {
		getInfo();
	}, []);

	const getInfo = async () => {
		const response = await fetch('https://api.spacexdata.com/v4/company');
		const data = await response.json();
		setCompanyInfo(data);
	};

	return (
		<>
			{Object.keys(companyInfo).length === 0 ? null : (
				<StyledFooter>
					<div className='social'>
						<p>Social Media</p>
						<div className='logo-container'>
							<a href={companyInfo.links.flickr}>
								<ImFlickr3 className='flickr logo' />
							</a>
							<a href={companyInfo.links.twitter}>
								<ImTwitter className='twitter logo' />
							</a>
							<a href='https://www.youtube.com/user/spacexchannel'>
								<ImYoutube className='youtube logo' />
							</a>
						</div>
					</div>
					<p className='summary'>{companyInfo.summary}</p>
				</StyledFooter>
			)}
		</>
	);
};

export default Footer;

const StyledFooter = styled.div`
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	min-height: 5vh;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 0 5rem;

	.social {
		display: flex;
		min-width: 10rem;
		align-items: center;
		justify-content: space-evenly;
		margin: 0.2rem;
	}

	p {
		font-size: 0.7rem;
		font-weight: 400;
		text-align: center;
	}

	.logo-container {
		display: inline-block;
	}

	.logo {
		margin-bottom: -2px;
		width: 25px;
		color: #fff;
		transition: all 0.2s ease-in-out;
	}
	.logo:hover {
		transform: scale(1.4);
		color: #3b87b9;
	}

	.summary {
		margin-left: 0.5rem;
	}

	@media only screen and (max-width: 768px) {
		.summary {
			display: none;
		}
	}
`;
