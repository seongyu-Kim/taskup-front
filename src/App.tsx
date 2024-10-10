// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProject from './pages/CreateProject/CreateProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<CreateProject />} />
      </Routes>
    </Router>
  );
}

export default App;
