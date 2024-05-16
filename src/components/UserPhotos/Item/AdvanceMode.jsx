import { Grid } from "@mui/material";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ItemTrong from "../../../lib/notThing/ItemTrong";
import { translate } from "../../../utils/i18n/translate";
import ItemPhoto from "./ItemPhoto";
const AdvanceMode = (props) => {
  const { userModel, userInfo, goToUser, isComment, index, listUser } = props;
  const moreThanOne = userModel?.length > 1;
  const listModule = moreThanOne
    ? [Navigation, Pagination, Mousewheel, Keyboard]
    : [];
  return (
    <Grid container xs={12} display={"flex"} justifyContent="center">
      {userModel?.length ? (
        <Swiper
          // direction={"vertical"}
          // pagination={pagination}
          initialSlide={index ? index : 0}
          cssMode={moreThanOne}
          navigation={moreThanOne}
          pagination={moreThanOne}
          mousewheel={moreThanOne}
          keyboard={moreThanOne}
          modules={listModule}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {userModel?.map((step, index) => {
            return (
              <SwiperSlide>
                <ItemPhoto
                  item={step}
                  key={step._id}
                  userInfo={userInfo}
                  goToUser={goToUser}
                  isAdvance
                  isComment={isComment}
                  listUser={listUser}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <ItemTrong content={translate("photoSharing:noPhoto")} />
      )}
      {/* <MobileStepper
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
      /> */}
    </Grid>
  );
};
export default AdvanceMode;
