import React from 'react';
import logo from './logo.svg';
import './App.css';
import RobotList from './components/organisms/robot-list.component';

function App() {
  return (
    <div className="App">
      <div>Robot List</div>
      <RobotList />
    </div>
  );
}

export default App;
