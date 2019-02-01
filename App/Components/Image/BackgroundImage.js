import React from "react";
import glamorous from "glamorous-native";

const BackgroundImage = glamorous.image({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
});

BackgroundImage.displayName = "image.BackgroundImage";

const BG = ({ source }) => {
  return <BackgroundImage source={source} resizeMode="stretch" />;
};

export default BG;
