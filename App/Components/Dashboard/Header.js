import React, { Component } from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import styles from "../../Components/Styles/Dashboard/HubStyle";
import { connect } from "react-redux";
import { Images } from "../../Themes";
import { UserSelectors } from '../../Redux/User/Selectors'

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Header"
    };
  }

  render() {
    const { title, currentGame } = this.props;
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          source={Images[currentGame]}
          style={{ width: 30, height: 30, marginRight: 15 }}
        />
        <Text style={styles.header}>{title}</Text>
      </View>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string
};

export default connect(state => ({
  currentGame: UserSelectors.getCurrentGame(state)
}))(Header);
