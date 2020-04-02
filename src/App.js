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
  Chip,
  Divider,
  Grow
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Typical from 'react-typical';
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
    let teamIndex = 0;
    // Define Teams
    let teams = {};
    for (let i = 0; i < this.state.numberOfTeams; i++) {
      teams[`Team${i}`] = [];
    }
    // Fetch random players
    while (tempArray.length > 0) {
      /* 
      TODO: Wierd behavior: although config is read from config.js, by pulling from tempArray the config.participantsList value changes as well
      console.log(config.participantsList, tempArray, this.state.players);
      */
      let selectedIndex = Math.floor(Math.random() * tempArray.length);
      let item = tempArray[selectedIndex];
      teams[`Team${teamIndex}`].push(item);
      tempArray.splice(selectedIndex, 1);
      teamIndex++;
      if (teamIndex > (this.state.numberOfTeams - 1)) teamIndex = 0;
    }
    return (
      <Grid container>
        {Object.keys(teams).map(function (team, index) {
          return (
            <Grid container key={index}>
              <Grid item xs={12} lg={12}>
                <Typography className={classes.Typographies} variant="h5">
                  {team}:
                </Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Grid container>
                  {teams[team].map((member, memberIndex) => (
                    <Grow
                      in={true}
                      key={memberIndex}
                      style={{
                        transitionDelay: `${Math.floor(Math.random() * 200)}ms`
                      }}
                    >
                      <Grid item xs={2} lg={2}>
                        <img
                          src={require(`./img/player_${member}.png`)}
                          className={classes.CardImage}
                          alt={member}
                        />
                      </Grid>
                    </Grow>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
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
              <Typography variant="h6" className={classes.Typographies}>
                Select your game:
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6} className={classes.GridItems}>
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
            <Grid item xs={12} lg={6} className={classes.GridItems}>
              <Typography variant="h6" className={classes.Typographies}>
                Enter the number of teams:
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 10 } }}
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
            <Grid item lg={12} xs={12}>
              <Typography variant="h4" className={classes.HeadTypographies}>
                Summary
              </Typography>
            </Grid>
            <Grid item lg={4} xs={12} className={classes.GridItems}>
              <Typography variant="h6" className={classes.Typographies}>
                Players:
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12} className={classes.GridItems}>
              <div className={classes.Typographies}>
                {this.state.players.map((player, index) => (
                  <div key={index}>
                    <Typography variant="overline">{player}</Typography>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item lg={4} xs={4} className={classes.GridItems}>
              <Typography variant="h6" className={classes.Typographies}>
                Selected Game:
              </Typography>
            </Grid>
            <Grid item lg={8} xs={8} className={classes.GridItems}>
              <Typography variant="overline" className={classes.Typographies}>
                {config.gameList[this.state.selectedGame]}
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <Typography variant="h6" className={classes.Typographies}>
                Number of Teams:
              </Typography>
            </Grid>
            <Grid item lg={8} xs={8}>
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

    // Handle Next-step button
    const handleNext = () => {
      if (this.state.numberOfTeams > 1)
        this.setState({ activeStep: this.state.activeStep + 1 });
    };
    // Handle previous-step button
    const handleBack = () => {
      this.setState({ activeStep: this.state.activeStep - 1 });
    };
    // Handle reset button
    const handleReset = () => {
      this.setState({
        activeStep: 0,
        numberOfTeams: 2,
        gameList: config.gameList,
        candidates: config.participantsList,
        selectedGame: 0,
        players: config.participantsList
      });
    };
    return (
      <div className={classes.mainContainer}>
        <Grid container className={classes.AppHeader}>
          <Typography variant="h6" className={classes.headerAnimationText}>
            <Typical
              steps={['Your teammates in Foosball', 2000, 'Your teammates in Arcade Games', 2000, 'Your teammates in Counter Strike', 2000]}
              loop={Infinity}
              wrapper="p"
            />
          </Typography>
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
                  <Typography variant="h4" className={classes.HeadTypographies}>
                    Draw Results
                  </Typography>
                  {this.calculateTeams(classes)}
                  <Divider style={{ marginTop: "1vh" }} />
                  <Button onClick={handleReset}>
                    <RotateLeft className={classes.Icon} />
                  </Button>
                </div>
              ) : (
                  <div>
                    <div>{this.getStepContent(this.state.activeStep)}</div>
                    <div>
                      <Divider style={{ marginTop: "1vh" }} />
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
