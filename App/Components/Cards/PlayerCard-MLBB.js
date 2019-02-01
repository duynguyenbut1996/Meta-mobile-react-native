import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image } from 'react-native';
import MLBBIcons from '../../Themes/MLBB';
import styles from './styles/PlayerCard';
import Popover from 'react-native-popover-view';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Heros from '../MLBB/Heros';
import FullButton from '../Buttons/FullButton';
import { getMLBBRankIcon } from '../../utils/game';


class PlayerCardMLBB extends Component {
  constructor() {
    super();
    this.state = { isVisible: false }
  }
  onPressFollow = () => {

  }
  onPressConnect = () => {

  }
  togglePopover() {
    this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    const { player } = this.props;
    let rankIcon = require('../../Images/mlbb/rank_icons/Warrior.png');
    rankIcon = getMLBBRankIcon(player.rank) || rankIcon;
    let role = '';
    if (player.preferred_roles.length) {
      role = player.preferred_roles[0];
    }
    return (
      <View style={styles.playerCard}>
        <View style={styles.playerInfo}>
          <View style={styles.avatar}>
            <Image style={styles.avatarImage} source={{ uri: player.user__avatar }} />
          </View>
          <View style={styles.info}>
            <View style={styles.names}>
              <Text numberOfLines={1} style={styles.metaName}> { player.user__meta_name } </Text>
              <Text numberOfLines={1} style={styles.displayName}> { player.user__full_name } </Text>
              <Image style={styles.rankIcon} source={rankIcon} />
            </View>
            <View style={styles.gameInfo}>
              {
                player.user__country ? (<Icon name="globe" size={12} color="#FFF" />) : null
              }
              <Text numberOfLines={1} style={styles.gameInfoText}> { player.user__country } </Text>
              {
                player.preferred_server ? (<Icon name="list" size={12} color="#FFF" />) : null
              }
              <Text numberOfLines={1} style={styles.gameInfoText}> { player.preferred_server } </Text>
              {
                player.user__preferred_languages.length ? (<Icon name="language" size={12} color="#FFF" />) : null
              }
              <Text numberOfLines={1} style={styles.gameInfoText}> { player.user__preferred_languages} </Text>
              {
                player.user__school ? (<Icon name="graduation-cap" size={12} color="#FFF" />) : null
              }
              <Text numberOfLines={1} style={styles.gameInfoText}> { player.user__school } </Text>
            </View>
            <View style={styles.gameProfile}>
              <Text style={styles.title}> { 'Role' } </Text>
              <Text style={styles.gameInfoText}> {role} </Text>
              <Text style={styles.title}> { 'HEROES' } </Text>
              <Heros heros={player.preferred_heroes_list} />
            </View>
            <View style={styles.gameProfile} />
          </View>
        </View>
        <View style={styles.buttons}>
          <FullButton label="INVITE TO TEAM" style={styles.button} color="#479b93" />
          {/* <FullButton label="CONNECT" style={{...styles.button, marginLeft: 9 }} color="#47986a" />
          <TouchableOpacity ref={ref => this.touchable = ref} onPress={() => this.togglePopover()}>
            <Icon style={styles.ellipsis} name="ellipsis-h" size={25} color="#FFF" />
          </TouchableOpacity>
          <Popover
            isVisible={this.state.isVisible}
            fromView={this.touchable}
            arrowStyle={{ backgroundColor: '#000000' }}
            onClose={() => this.togglePopover()}>
            <View style={styles.popover}>
              <TouchableOpacity style={styles.popoverTouch}>
                <View style={{ width: 100, paddingLeft: 45 }}>
                  <Icon color="#7F7F7F" size={20} name='handshake-o'/>
                </View>
                <Text style={styles.popoverText}> Party Up </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.popoverTouch}>
                <View style={{ width: 100, paddingLeft: 45 }}>
                  <Icon color="#7F7F7F" size={20} name='flag'/>
                </View>
                <Text style={styles.popoverText}> Report </Text>
              </TouchableOpacity>
            </View>
          </Popover> */}
        </View>
      </View>
    );
  }
}

export default PlayerCardMLBB;
