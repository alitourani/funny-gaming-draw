import React from "react";
import {
  Button,
  TextField,
  Grid,
  Stepper,
  Typography,
  Step,
  StepLabel
} from "@material-ui/core";
// Icons
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import RotateLeft from "@material-ui/icons/RotateLeft";
import "./App.css";
const config = require("./config");

function getSteps() {
  return ["Initiallization", "Choose Players", "Finalize"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <Grid container>
          <Grid item lg={6}>
            Number of Teams
          </Grid>
          <Grid item lg={6}>
            <TextField id="standard-basic" label="Standard" />
          </Grid>
          <Grid item lg={6}>
            Players
          </Grid>
          <Grid item lg={6}>
            <TextField id="standard-basic" label="Standard" />
          </Grid>
        </Grid>
      );
    case 1:
      return config.participantsList.map((player, index) => (
        <Typography>{player}</Typography>
      ));
    case 2:
      return <Button href="#contained-buttons">Click to Draw</Button>;
    default:
      return "Unknown step!";
  }
}

export default function GameDraw() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="App">
      {console.log("Hi", config)}
      <Grid container className="App-header">
        <Grid item lg={12}>
          <img
            src={require("./img/Logo.png")}
            className="App-logo"
            alt="logo"
          />
        </Grid>
        <Grid item lg={12}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset}>
                  <RotateLeft />
                </Button>
              </div>
            ) : (
              <div>
                <Typography>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    <NavigateBefore />
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? (
                      <AssignmentTurnedInIcon />
                    ) : (
                      <NavigateNext />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
