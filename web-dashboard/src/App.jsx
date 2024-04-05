import "./App.css";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Admin from './components/Dashboards/Admin'
import User from './components/Dashboards/User'
import Driver from './components/Dashboards/Driver'

function App() {

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/admindashboard" element={<Admin />} />
					<Route path="/userdashboard" element={<User />} />
					<Route path="/driverdashboard" element={<Driver />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
