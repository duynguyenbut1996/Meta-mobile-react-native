import glamorous from "glamorous-native";
import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { Colors } from "../../Themes";

import Text from "../Typography/Text";

const CardContainer = glamorous.view(({ theme }) => ({
  marginHorizontal: theme.Metrics.marginHorizontal,
  marginBottom: theme.Metrics.marginVertical,
  flexDirection: "column",
  backgroundColor: theme.Colors.cardBackground
}));

const CardHeader = glamorous.view({
  flexDirection: "row",
  width: "100%",
  padding: 10
});

export default class Card extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    headerRight: PropTypes.element,
    variant: PropTypes.string.isRequired,
    currentGame: PropTypes.string.isRequired
  };

  static defaultProps = {
    headerRight: undefined
  };

  render() {
    const { headerRight, title, variant, children, currentGame } = this.props;

    let colorsHeader = Colors[currentGame].header

    return (
      <CardContainer>
        <CardHeader style={{ backgroundColor: colorsHeader }}>
          <Text>{title}</Text>
          {!!headerRight && (
            <View style={{ marginLeft: "auto", width: "30%" }}>
              {headerRight}
            </View>
          )}
        </CardHeader>
        {children}
      </CardContainer>
    );
  }
}
