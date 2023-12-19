import React, { useState } from "react";
import "./register.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "../PaymentForm/Payment.js";
import Form from "../UserForm/Form.js";

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [click, setClick] = useState(false);
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const handleNext = () => {
    setActiveStep((activeStep + 1) % steps.length);
  };

  const handleBack = () => {
    if (disableNextBtn) {
      setDisableNextBtn(false);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = ["Register", "Payment"];
  const nextBtnTxt = ["Register", "Pay"];
  const components = [
    <Form
      click={click}
      setClick={setClick}
      handleNext={handleNext}
      userDetails={userDetails}
      setUserDetails={setUserDetails}
    />,
    <Payment
      click={click}
      setClick={setClick}
      handleNext={handleNext}
      userDetails={userDetails}
      setUserDetails={setUserDetails}
    />,
  ];

  return (
    <div className="registerContainer">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {components[activeStep]}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={() => setClick(true)} disabled={disableNextBtn}>
              {nextBtnTxt[activeStep]}
            </Button>
          </Box>
        </React.Fragment>
      </Box>
      <ToastContainer />
    </div>
  );
}
