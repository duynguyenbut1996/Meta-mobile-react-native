import React, { Component } from "react";
//import {Image} from "react-native"
import { connect } from "react-redux";

import {
  BackgroundImage,
  ViewContainer,
  MainContainer,
  Text
} from "../Components";

import { Images } from "../Themes";

export class TestScreen extends Component {
  render() {
    const { user } = this.props;

    return (
      <MainContainer>
        <BackgroundImage source={Images.background} />
        <ViewContainer>
          <Text>Received Request</Text>
        </ViewContainer>
      </MainContainer>
    );
  }
}

export default connect(state => ({
}))(TestScreen)
