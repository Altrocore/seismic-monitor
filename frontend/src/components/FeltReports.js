import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import SeismicMap from './SeismicMap';

function FeltReports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/felt-reports')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log to see what the data looks like
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching felt reports:', error);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SeismicMap events={data} />
        </Grid>
        {Array.isArray(data) ? data.map((report, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {report.ev_event_time}
                </Typography>
                <Typography variant="h5" component="h2">
                  Magnitude: {report.ev_mag_value}
                </Typography>
                <Typography color="textSecondary">
                  Location: {report.ev_region}
                </Typography>
                <Typography variant="body2" component="p">
                  Depth: {report.ev_depth} meters
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )) : <p>Data is not available</p>}
      </Grid>
    </div>
  );
}

export default FeltReports;
