import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function VolcanoReports() {
  const [volcanoes, setVolcanoes] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/volcano-reports')
      .then(response => response.json())
      .then(data => {
        setVolcanoes(data);
      })
      .catch(error => {
        console.error('Error fetching volcano data:', error);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {volcanoes.map((volcano, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {volcano.volcName}
              </Typography>
              <Typography color="textSecondary">
                Threat Level: {volcano.threat}
              </Typography>
              <Typography variant="body2">
                {volcano.volcUrl ? <a href={volcano.volcUrl} target="_blank" rel="noopener noreferrer">More Info</a> : 'No additional information available'}
              </Typography>
              {volcano.imgUrl && (
                <img src={volcano.imgUrl} alt={volcano.volcName} style={{ maxWidth: '100%', height: 'auto' }} />
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default VolcanoReports;
