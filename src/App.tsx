import React from 'react';
import "flexboxgrid";
import RobotList from './components/organisms/robot-list.component';

function App() {
  return (
    <div className="App">
        <div className="container">
            <div>Robot List</div>
            <RobotList />
        </div>
    </div>
  );
}

export default App;
