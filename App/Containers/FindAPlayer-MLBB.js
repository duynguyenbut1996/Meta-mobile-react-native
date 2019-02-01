import React, { Component } from "react";
import { View, Picker, TextInput, Text, ListView, TouchableOpacity } from 'react-native';
import {
  MainContainer,
} from "../Components";
import PlayerCard from '../Components/Cards/PlayerCard-MLBB';
import styles from './Styles/FindAPlayer';
import Algolia from "../Services/Algolia";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResourceActions from "../Redux/ResourcesRedux";
import { UserSelectors } from '../Redux/User/Selectors'

const DsFormat = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class FindAPlayerMLBB extends Component {
  
  constructor() {
    super();
    this.state = {
      dataSource: DsFormat.cloneWithRows([]),
      metaName: "",
      searchParams: {},
      result: {},
    };
  }

  componentDidMount() {
    this.handleSearch();
    this.props.mlbbRequest()
  }

  componentWillReceiveProps(nextProps) {
    const { currentGame } = this.props;
    console.log(currentGame);
    if (nextProps.currentGame === 'dota2') {
      this.props.navigation.navigate('FindAPlayerDota');
    }
  }

  async handleSearch() {
    const query = this.state.searchParams;
    query.metaUserName = this.state.metaName;
    const result = await Algolia.searchPlayer(query, 'mlbbPlayer');
    console.log(result);
    console.log(query);
    this.setState({ dataSource: DsFormat.cloneWithRows(result.hits) });
  }

  updateSearchParams(key, value) {
    let { searchParams } = this.state;
    if (!searchParams) {
      searchParams = {};
    }
    if (value === '') {
      delete searchParams[key];
    }
    searchParams[key] = value;
    this.setState({ searchParams });
  }

  render() {
    const { metaName } = this.state;
    return (
      <MainContainer style={styles.container}>
        <View style={styles.filterBar}>
          <TextInput
            value={metaName}
            onChangeText={text => {
              this.setState({ metaName: text });
              this.handleSearch();
            }
          }
            style={styles.textInput}
          />
           <Picker
            type="dropdown" 
            style={styles.pickerInput}
            selectedValue={this.state.searchParams.role}
            onValueChange={(value)=> {
              this.updateSearchParams('role', value);
              this.handleSearch();
            }}
            >
              <Picker.Item label="Role" value="" />
              <Picker.Item label="Fighter" value="Fighter" />
              <Picker.Item label="Tank" value="Tank" />
              <Picker.Item label="Support" value="Support" />
              <Picker.Item label="Marksman" value="Marksman" />
              <Picker.Item label="Mage" value="Mage" />
          </Picker>
          <Picker
            type="dropdown" 
            style={styles.pickerInput}
            selectedValue={this.state.searchParams.playerType}
            onValueChange={(value)=> {
              this.updateSearchParams('rank', value);
              this.handleSearch();
            }}
            >
              <Picker.Item label="Rank" value="" />
              <Picker.Item label="Warrior III" value="Warrior III" />
              <Picker.Item label="Warrior II" value="Warrior II" />
              <Picker.Item label="Warrior I" value="Warrior I" />
              <Picker.Item label="Elite III" value="Elite III" />
              <Picker.Item label="Elite II" value="Elite II" />
              <Picker.Item label="Elite I" value="Elite I" />
              <Picker.Item label="Master III" value="Master III" />
              <Picker.Item label="Master II" value="Master II" />
              <Picker.Item label="Master I" value="Master I" />
              <Picker.Item label="Grandmaster III" value="Grandmaster III" />
              <Picker.Item label="Grandmaster II" value="Grandmaster II" />
              <Picker.Item label="Grandmaster I" value="Grandmaster I" />
              <Picker.Item label="Epic V" value="Epic V" />
              <Picker.Item label="Epic IV" value="Epic IV" />
              <Picker.Item label="Epic III" value="Epic III" />
              <Picker.Item label="Epic II" value="Epic II" />
              <Picker.Item label="Epic I" value="Epic I" />
              <Picker.Item label="Legend V" value="Legend V" />
              <Picker.Item label="Legend IV" value="Legend IV" />
              <Picker.Item label="Legend III" value="Legend III" />
              <Picker.Item label="Legend II" value="Legend II" />
              <Picker.Item label="Legend I" value="Legend I" />
              <Picker.Item label="Mythic" value="Mythic" />
              <Picker.Item label="Glorious Mythic" value="Glorious Mythic" />
          </Picker>
          <View style={styles.more}>
            <TouchableOpacity>
              <Text style={styles.textMore}> {'More filters >>'} </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listPlayerContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <View style={styles.listPlayer}>
              <PlayerCard player={rowData} />
              <View style={styles.divider}/>
            </View>
            }
          />
        </View>
      </MainContainer>
    );
  }
}

export default connect(state => {
  return {
    currentGame: UserSelectors.getCurrentGame(state),
  }
},
  dispatch =>
    bindActionCreators(
      { mlbbRequest: ResourceActions.mlbbRequest },
      dispatch
    )
  )(FindAPlayerMLBB);
