import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import ExampleComponent from '../components/ExampleComponent';

function AppRouter() {
  return (
    <Router basename={import.meta.env.BK_SITE_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/example" element={<ExampleComponent />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;