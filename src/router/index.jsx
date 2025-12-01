import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import ExampleComponent from '../components/ExampleComponent';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/example" element={<ExampleComponent />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;