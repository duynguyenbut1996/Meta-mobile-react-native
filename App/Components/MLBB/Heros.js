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

class MLBBHeros extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { mlbbHeros = [], heros = [] } = this.props;
    mlbbHeros = mlbbHeros || [];
    const heroAvatars = heros.map((i) => mlbbHeros.find(({ hero_id }) => hero_id === i))
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
  mlbbHeros: ResourceSelectors.mlbbListHeroes(state)
})) (MLBBHeros);
