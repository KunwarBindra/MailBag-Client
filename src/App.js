import React from "react";
import { Container, Typography, Box } from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';
import Mail from "./components/mail";

function App() {
  const wrapperStyles = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  };

  const flexPart1Styles = {
    height: "100%",
    width: "30%",
    bgcolor: "black",
  };

  const flexSubPart1Styles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    width: "500px",
    margin: "70% auto",
    color: "white",
    textAlign: "center",
  };

  const flexPart2Styles = {
    height: "100%",
    width: "70%",
    bgcolor: "white",
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={wrapperStyles}>
        <Box sx={flexPart1Styles}>
          <Box sx={flexSubPart1Styles}>
            <TelegramIcon sx={{ fontSize: "120px" }} />
            <Typography variant="h2" component="div">
              MAILBAG
            </Typography>
          </Box>
        </Box>
        <Box sx={flexPart2Styles}><Mail /></Box>
      </Box>
    </Container>
  );
}

export default App;
