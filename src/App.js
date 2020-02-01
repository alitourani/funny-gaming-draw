import React from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

export default function TransferList() {
  const classes = useStyles();

  return (
    <div className="App">
    <Grid container className="App-header">
      <img src={require('./img/Logo.png')} className="App-logo" alt="logo" />
      <Typography variant="h4" gutterBottom>
      Sample
      </Typography>

      <Grid item lg={4}>
Select Game
      </Grid>
      <Grid item lg={4}>
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
        
    </Grid>
      </Grid>
      <Grid item lg={4}>
        <Button variant="contained" href="#contained-buttons">
        Click to Draw
        </Button>
      </Grid>
      
    
    
    </Grid>  
    </div>
  );
}
