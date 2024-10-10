// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProject from './pages/CreateProject/CreateProject';
import ViewProject from './pages/ViewProject/ViewProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<CreateProject />} />
        <Route path="/view" element={<ViewProject />} />
      </Routes>
    </Router>
  );
}

export default App;
