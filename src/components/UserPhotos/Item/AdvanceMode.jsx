import { Button, Grid, MobileStepper, useTheme } from "@mui/material";
import React, { useState } from "react";
import ItemPhoto from "./ItemPhoto";
import SwipeableViews from "react-swipeable-views";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
const AdvanceMode = (props) => {
  const { userModel, userInfo, listUser, goToUser, isComment, index } = props;
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(index ? index : 0);
  const maxSteps = userModel.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Grid item xs={12} display={"flex"} justifyContent="center">
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ display: "flex", justifyContent: "center" }}
      >
        {userModel?.map((step, index) => {
          return Math.abs(activeStep - index) <= 1 ? (
            <ItemPhoto
              item={step}
              key={step._id}
              userInfo={userInfo}
              goToUser={goToUser}
              isAdvance
              isComment={isComment}
            />
          ) : null;
        })}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="bottom"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Grid>
  );
};
export default AdvanceMode;
