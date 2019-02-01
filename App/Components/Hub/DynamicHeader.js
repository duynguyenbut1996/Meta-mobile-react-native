import React, { Component } from "react";

import { Text, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { UserSelectors } from '../../Redux/User/Selectors';

const width = Dimensions.get('window').width;
const mainRatio = 750/width;

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props
    return (
      <Text style={{flex: 1,
        color: 'white',
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: Math.floor(34/mainRatio),
        alignSelf: 'center'}}>
        {`Hi, ${user.meta_name}`}
      </Text>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string
};

export default connect(state => ({
  user: UserSelectors.selectUser(state) || {}
}))(Header);
