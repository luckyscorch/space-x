import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//components
import Nav from './components/Nav';
import Home from './components/Home';
import Footer from './components/Footer';
import Rocket from './components/Rocket';
import Missions from './components/Missions';
//styleing
import styled from 'styled-components';

function App() {
	return (
		<Router>
			<StyledDiv>
				<Nav />
				<Switch>
					<Route path='/' exact>
						<Home />
					</Route>
					<Route path='/missions'>
						<Missions />
					</Route>
					<Route path='/:rocket'>
						<Rocket />
					</Route>
				</Switch>
				<Footer />
			</StyledDiv>
		</Router>
	);
}

export default App;

const StyledDiv = styled.div`
	height: 100vh;
	width: 100%;
	background: url('images/background.jpg');
	background-position: center;
	background-size: cover;
`;
