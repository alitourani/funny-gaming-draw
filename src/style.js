const themeColorMain = "#424242";
const themeColorSecond = "#9E9E9E";

export default theme => ({
  mainContainer: {
    textAlign: "center",
    backgroundColor: "#F5F5F5",
    padding: "2rem"
  },
  AppLogo: {
    marginBottom: "2rem"
  },
  AppHeader: {
    minHeight: "5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "14px"
  },
  headerAnimationText: {
    color: "#536DFE",
  },
  AppLink: {
    color: "#09d3ac"
  },
  Typographies: {
    color: themeColorMain
  },
  HeadTypographies: {
    backgroundColor: "#303F9F",
    padding: "1vh",
    margin: "1vh",
    color: "#FFF",
    borderRadius: "1vh"
  },
  Selects: {
    width: "100%",
    color: themeColorMain,
    borderColor: themeColorMain
  },
  TextBoxes: {
    width: "97%",
    padding: "1vh"
  },
  Chips: {
    width: "70%",
    backgroundColor: themeColorSecond,
    marginTop: "1vh"
  },
  Icon: {
    marginTop: "1vh",
    color: "#616161"
  },
  Card: {
    maxWidth: 300,
    margin: "1vh"
  },
  CardImage: {
    width: 200
  },
  GridItems: {
    padding: "1vh"
  }
});
