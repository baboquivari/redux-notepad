import React, { Component } from 'react';
import Sidebar from './components/Sidebar.js';
import Notes from './components/Notes.js';
import './App.css';

class App extends Component {
	render() {
		return ( 
			<div className="container">
				<Sidebar />
				<Notes />
			</div>
		);
	}
}

export default App;
