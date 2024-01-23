import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SeismicEvents from './components/SeismicEvents';
import FeltReports from './components/FeltReports';
import VolcanoReports from './components/VolcanoReports';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              <Button color='inherit' component={Link} to="/">
                Seismic Activity Monitor
              </Button>
            </Typography>
            <Button color="inherit" component={Link} to="/seismic-events">
              Seismic Events
            </Button>
            <Button color="inherit" component={Link} to="/volcano-reports">
              Volcano Reports
            </Button>
            <Button color="inherit" component={Link} to="/felt-reports">
              Felt Reports
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/seismic-events" element={<SeismicEvents />} />
          <Route path="/volcano-reports" element={<VolcanoReports />} />
          <Route path="/felt-reports" element={<FeltReports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
