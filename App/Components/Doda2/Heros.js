import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { ResourceSelectors } from "../../Redux/Resources/Selectors";

const styles = StyleSheet.create({
  hero: {
    width: 26,
    height: 26,
    marginLeft: 3,
    borderRadius: 13,
  }
});

class Heros extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { dota2Heros = [], heros = [] } = this.props;
    dota2Heros = dota2Heros || []; 
    const heroAvatars = heros.map((i) => dota2Heros.find(({ hero_id }) => hero_id === i))
      .filter((h) => h);

    return (<View style={{ flexDirection: 'row' }}>
      {
        heroAvatars.map(({ image }) => (
          <Image key={image} style={styles.hero} source={{ uri: image }} />
        ))
      }
    </View>);
  }
}

export default connect(state => ({
  dota2Heros: ResourceSelectors.selectDota2(state)
})) (Heros);
