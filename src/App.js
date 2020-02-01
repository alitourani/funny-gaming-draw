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
  Avatar,
  Chip
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
    numberOfTeams: 2,
    gameList: config.gameList,
    candidates: config.participantsList,
    selectedGame: 0,
    players: config.participantsList
  };

  getSteps() {
    return ["Initiallization", "Choose Players", "Finalize"];
  }

  calculateTeams = classes => {
    const tempArray = this.state.players;
    let currentIndex = tempArray.length,
      randomIndex;
    let teams = [this.state.numberOfTeams];
    let teamArrayIndex = 0;
    // Hash Array
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // Swap elements
      teams[teamArrayIndex].push(tempArray[currentIndex]);
      teamArrayIndex++;
      if (teamArrayIndex === tempArray.length) teamArrayIndex = 0;
    }
    return (
      <Typography className={classes.Typographies}>Selected Game:</Typography>
    );
  };

  changeSelectGame = event => {
    this.setState({ selectedGame: event.target.value });
  };

  changeTeamNumbers = event => {
    this.setState({ numberOfTeams: event.target.value });
  };

  dismissPlayer = whomToDelete => () => {
    const playerList = this.state.candidates;
    playerList.map(item => {
      if (whomToDelete === item) {
        const chipToDelete = playerList.indexOf(item);
        playerList.splice(chipToDelete, 1);
      }
    }, this.setState({ players: playerList }));
  };

  getStepContent(step) {
    const classes = this.props.classes;
    switch (step) {
      case 0:
        return (
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.Typographies}>
                Selected Game:
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                variant="outlined"
                value={this.state.selectedGame}
                onChange={this.changeSelectGame}
                className={classes.Selects}
              >
                {this.state.gameList.map((game, index) => (
                  <MenuItem key={index} value={index}>
                    {game}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.Typographies}>
                Number of Teams:
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label="Enter a number"
                type="number"
                className={classes.TextBoxes}
                value={this.state.numberOfTeams}
                onChange={this.changeTeamNumbers}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return this.state.candidates.map((player, index) => (
          <Grid container key={index}>
            <Grid item xs={12} lg={12}>
              <Chip
                avatar={
                  <Avatar
                    alt={player}
                    src={require(`./img/player_${player}.png`)}
                  />
                }
                label={player}
                className={classes.Chips}
                onDelete={this.dismissPlayer(player)}
              />
            </Grid>
          </Grid>
        ));
      case 2:
        return (
          <Grid container>
            <Grid item lg={12}>
              <Typography
                variant="h4"
                className={classes.Typographies}
                style={{ marginBottom: "2vh" }}
              >
                Summary
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="h6" className={classes.Typographies}>
                Players:
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography className={classes.Typographies}>
                {this.state.players.map((player, index) => (
                  <Typography key={index}>{player}</Typography>
                ))}
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="h6" className={classes.Typographies}>
                Selected Game:
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="overline" className={classes.Typographies}>
                {config.gameList[this.state.selectedGame]}
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="h6" className={classes.Typographies}>
                Number of Teams:
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="overline" className={classes.Typographies}>
                {this.state.numberOfTeams}
              </Typography>
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
      if (this.state.numberOfTeams > 1)
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
                  <Typography
                    variant="h4"
                    className={classes.Typographies}
                    style={{ marginBottom: "2vh" }}
                  >
                    Draw Results
                  </Typography>
                  {this.calculateTeams(classes)}
                  <Button onClick={handleReset}>
                    <RotateLeft className={classes.Icon} />
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
                      <NavigateBefore className={classes.Icon} />
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={this.state.numberOfTeams < 2 ? true : false}
                    >
                      {this.state.activeStep === steps.length - 1 ? (
                        <AssignmentTurnedInIcon className={classes.Icon} />
                      ) : (
                        <NavigateNext className={classes.Icon} />
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
