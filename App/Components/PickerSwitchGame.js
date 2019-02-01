import React, { Component } from "react";
import { Picker, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Icon from "react-native-vector-icons/FontAwesome";
import UserActions from "../Redux/UserRedux";
import { UserSelectors } from '../Redux/User/Selectors'

const games = [
  { label: "Dota2", value: "dota2" },
  { label: "Mobile Legends", value: "mlbb" }
];
class PickerSwitchGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem() {
    return games.map((item, index) => (
      <Picker.Item key={index} label={item.label} value={item.value} />
    ));
  }

  componentDidMount() {
    const { currentGame } = this.props

    this.setState({
      value: currentGame
    })
  }

  render() {
    const { value } = this.state;

    return (
      <View style={styles.wrapperSwitchGame}>
        <Text style={styles.switchGame}>Switch game</Text>
        <Icon
          style={styles.iconDoubleDown}
          name="angle-double-down"
          size={15}
          color="#52bfb0"
        />
        <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={select => {
            this.setState({ value: select }, () => {
              this.props.updateCurrentGame(select);
            });
          }}
          prompt={`Select Game`}
        >
          {this.renderItem()}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperSwitchGame: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    justifyContent: "flex-end"
  },
  switchGame: {
    color: "#52bfb0",
    letterSpacing: 2,
    position: "absolute",
    right: 25,
    zIndex: 1,
    paddingBottom: 3
  },
  picker: {
    width: 95,
    height: 50
  },
  iconDoubleDown: {
    position: "absolute",
    right: 10
  }
});

export default connect(
  state => ({
    currentGame: UserSelectors.getCurrentGame(state)
  }),
  dispatch => bindActionCreators(UserActions, dispatch)
)(PickerSwitchGame);
