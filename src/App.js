import React, { Component } from "react";
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
import { withStyles } from "@material-ui/styles";
// Icons
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import RotateLeft from "@material-ui/icons/RotateLeft";
import styleSheet from "./style";
const config = require("./config");

class GameDraw extends Component {
  state = {
    activeStep: 0,
    numberOfTeams: 1,
    gameList: config.gameList,
    candidates: config.participantsList,
    selectedGame: 0,
    players: []
  };

  getSteps() {
    return ["Initiallization", "Choose Players", "Finalize"];
  }

  changeSelectGame = event => {
    this.setState({ selectedGame: event.target.value });
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Grid container>
            <Grid item xs={12} lg={6}>
              Selected Game:
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                variant="outlined"
                value={this.state.selectedGame}
                onChange={this.changeSelectGame}
              >
                {this.state.gameList.map((game, index) => (
                  <MenuItem key={index} value={10}>
                    {game}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              Number of Teams:
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Enter a number" type="number" />
            </Grid>
          </Grid>
        );
      case 1:
        return this.state.candidates.map((player, index) => (
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Checkbox
                value="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
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
              {this.state.players}
            </Grid>
            <Grid item lg={4}>
              Selected Game:
            </Grid>
            <Grid item lg={8}>
              {this.state.selectedGame}
            </Grid>
            <Grid item lg={4}>
              Number of Teams:
            </Grid>
            <Grid item lg={8}>
              {this.state.numberOfTeams}
            </Grid>
          </Grid>
        );
      default:
        return "Unknown step!";
    }
  }

  render() {
    const steps = this.getSteps();
    const classes = this.props.classes;
    const handleNext = () => {
      this.setState({ activeStep: this.state.activeStep + 1 });
    };
    const handleBack = () => {
      this.setState({ activeStep: this.state.activeStep - 1 });
    };
    const handleReset = () => {
      this.setState({ activeStep: 0 });
    };

    return (
      <div className={classes.App}>
        <Grid container className={classes.AppHeader}>
          <Grid item lg={12}>
            <img
              src={require("./img/Logo.png")}
              className={classes.AppLogo}
              alt="logo"
            />
          </Grid>
          <Grid item lg={12}>
            <Stepper
              activeStep={this.state.activeStep}
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
              {this.state.activeStep === steps.length ? (
                <div>
                  <Typography>Results are here</Typography>
                  <Button onClick={handleReset}>
                    <RotateLeft />
                  </Button>
                </div>
              ) : (
                <div>
                  <Typography>
                    {this.getStepContent(this.state.activeStep)}
                  </Typography>
                  <div>
                    <Button
                      disabled={this.state.activeStep === 0}
                      onClick={handleBack}
                    >
                      <NavigateBefore />
                    </Button>
                    <Button onClick={handleNext}>
                      {this.state.activeStep === steps.length - 1 ? (
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
}

export default withStyles(styleSheet)(GameDraw);
