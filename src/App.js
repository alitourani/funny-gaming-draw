import React from "react";
import {
  Button,
  TextField,
  Grid,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Select,
  MenuItem,
  Checkbox
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
            Select Game
          </Grid>
          <Grid item lg={6}>
            <Select value={0}>
              {config.gameList.map((game, index) => (
                <MenuItem key={index} value={10}>
                  {game}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item lg={6}>
            Select Number of Teams
          </Grid>
          <Grid item lg={6}>
            <TextField label="Requires a number" />
          </Grid>
        </Grid>
      );
    case 1:
      return config.participantsList.map((player, index) => (
        <Grid container>
          <Grid item lg={6}>
            <Checkbox
              checked={true}
              value="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </Grid>
          <Grid item lg={6}>
            <Typography>{player}</Typography>
          </Grid>
        </Grid>
      ));
    case 2:
      return (
        <Grid container>
          <Grid item lg={12}>
            Summary
          </Grid>
          <Grid item lg={4}>
            Players:
          </Grid>
          <Grid item lg={8}>
            Sample
          </Grid>
          <Grid item lg={4}>
            Selected Game:
          </Grid>
          <Grid item lg={8}>
            Sample
          </Grid>
          <Grid item lg={4}>
            Number of Teams:
          </Grid>
          <Grid item lg={8}>
            Sample
          </Grid>
        </Grid>
      );
    default:
      return "Unknown step!";
  }
}

export default function GameDraw() {
  const [activeStep, setActiveStep, selectedGame] = React.useState(0);
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
      <Grid container className="App-header">
        <Grid item lg={12}>
          <img
            src={require("./img/Logo.png")}
            className="App-logo"
            alt="logo"
          />
        </Grid>
        <Grid item lg={12}>
          <Stepper
            activeStep={activeStep}
            style={{ backgroundColor: "transparent" }}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={index} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography>Results are here</Typography>
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
                  <Button onClick={handleNext}>
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
