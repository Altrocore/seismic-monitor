import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function SeismicEvents() {
  const [dataCenters, setDataCenters] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/seismic-events')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.datacenters)) {
          setDataCenters(data.datacenters);
        } else {
          console.error('Data is not an array', data);
          setDataCenters([]); 
        }
      })
      .catch(error => {
        console.error('Error fetching seismic data:', error);
        setDataCenters([]); 
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {dataCenters.map((dataCenter, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {dataCenter.name}
              </Typography>
              <Typography color="textSecondary">
                {dataCenter.fullName}
              </Typography>
              <Typography variant="body2">
                {dataCenter.summary}
              </Typography>
              <Typography variant="body2">
                Website: <a href={dataCenter.website}>{dataCenter.website}</a>
              </Typography>
              
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default SeismicEvents;
