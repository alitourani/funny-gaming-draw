const colorOrange = "#FFCA28";

export default theme => ({
  App: {
    textAlign: "center"
  },
  AppLogo: {
    marginBottom: "2vh"
  },
  AppHeader: {
    backgroundColor: "#F5F5F5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "14px"
  },
  AppLink: {
    color: "#09d3ac"
  },
  Typographies: {
    color: colorOrange
  },
  Selects: {
    width: "100%",
    color: colorOrange,
    borderColor: colorOrange
  },
  TextBoxes: {
    width: "100%"
  },
  Chips: {
    width: "70%",
    backgroundColor: colorOrange,
    marginTop: "1vh"
  },
  Icon: {
    marginTop: "3vh",
    color: "#616161"
  },
  Card: {
    maxWidth: 300,
    margin: "1vh"
  },
  CardImage: {
    height: 120
  }
});
