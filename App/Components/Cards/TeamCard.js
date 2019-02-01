import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import styles from './styles/TeamCard'
import Popover from 'react-native-popover-view'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import FullButton from '../Buttons/FullButton'

class TeamCard extends Component {
  constructor() {
    super()
    this.state = { isVisible: false }
  }
  onPressFollow = () => {}
  onPressConnect = () => {}
  togglePopover() {
    this.setState({ isVisible: !this.state.isVisible })
  }

  render() {
    const { team } = this.props
    let rankIcon = require('../../Images/dota2/rank_icons/SeasonalRank1-1.png');
    rankIcon = Dota2Icons.rank[`${team.rank}`] || rankIcon;
    return (
      <View style={styles.teamCard}>
        <View style={styles.teamInfo}>
          <View style={styles.avatar}>
            <Image style={styles.avatarImage} source={{ uri: team.avatar__url }} />
          </View>
          <View style={styles.info}>
            <View style={styles.names}>
              <Image style={styles.rankIcon} source={rankIcon} />
              <Text style={styles.metaName}> {team.name} </Text>
            </View>
            <View style={styles.gameInfo}>
              <Icon name="list" size={12} color="#FFF" />
              <Text style={styles.gameInfoText}> {team.server} </Text>
              <Icon name="language" size={12} color="#FFF" />
              <Text style={styles.gameInfoText}> {team.language} </Text>
              <Icon name="graduation-cap" size={12} color="#FFF" />
              <Text style={styles.gameInfoText}> {team.organisation} </Text>
            </View>
            <View style={styles.gameProfile}>
              <Image
                style={styles.statusIcon}
                source={require('../../Images/icons/recurring.png')}
              />
              <Text style={styles.title}> { team.is_recruiting ?'Recruiting': 'Not Recruiting'} </Text>
              <Image
                style={styles.statusIcon}
                source={require('../../Images/icons/scrim.png')}
              />
              <Text style={styles.title}> {team.is_scrim_ready ? 'Ready to Scrim': 'Not Ready to Scrim'} </Text>
            </View>
            <View style={styles.gameProfile} />
          </View>
        </View>
        <View style={styles.buttons}>
          <FullButton label="FOLLOW" style={styles.button} color="#479b93" />
          <FullButton
            label="REQUEST TO JOIN"
            style={{ ...styles.button, marginLeft: 9 }}
            color="#d48a11"
          />
          <TouchableOpacity
            ref={ref => (this.touchable = ref)}
            onPress={() => this.togglePopover()}
          >
            <Icon
              style={styles.ellipsis}
              name="ellipsis-h"
              size={25}
              color="#FFF"
            />
          </TouchableOpacity>
          <Popover
            isVisible={this.state.isVisible}
            fromView={this.touchable}
            arrowStyle={{ backgroundColor: '#000000' }}
            onClose={() => this.togglePopover()}
          >
            <View style={styles.popover}>
              <TouchableOpacity style={styles.popoverTouch}>
                <View style={{ width: 100, paddingLeft: 45 }}>
                  <Image
                    style={styles.scrimIcon}
                    source={require('../../Images/icons/scrim.png')}
                  />
                </View>
                <Text style={styles.popoverText}> Scrim </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.popoverTouch}>
                <View style={{ width: 100, paddingLeft: 45 }}>
                  <Icon color="#7F7F7F" size={20} name="flag" />
                </View>
                <Text style={styles.popoverText}> Report </Text>
              </TouchableOpacity>
            </View>
          </Popover>
        </View>
      </View>
    )
  }
}

export default TeamCard
