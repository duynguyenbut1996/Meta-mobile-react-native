import React, { Component } from "react";
import { View, Picker, TextInput, Text, ListView, TouchableOpacity } from 'react-native';
import {
  MainContainer,
} from "../Components";
import PlayerCard from '../Components/Cards/PlayerCard';
import styles from './Styles/FindAPlayer';
import Algolia from "../Services/Algolia";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResourceActions from "../Redux/ResourcesRedux";
import { UserSelectors } from '../Redux/User/Selectors'

const DsFormat = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class FindAPlayer extends Component {
  
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
    this.props.dotaRequest()
  }

  componentWillReceiveProps(nextProps) {
    const { currentGame } = this.props;
    if (nextProps.currentGame !== 'dota2') {
      this.props.navigation.navigate('FindAPlayerMLBB');
    }
  }

  async handleSearch() {
    const query = this.state.searchParams;
    query.metaUserName = this.state.metaName;
    const result = await Algolia.searchPlayer(query, 'dota2Player');
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
            selectedValue={this.state.searchParams.playerType}
            onValueChange={(value)=> {
              this.updateSearchParams('playerType', value);
              this.handleSearch();
            }}
            >
              <Picker.Item label="Player Type" value="" />
              <Picker.Item label="Casual" value="Casual" />
              <Picker.Item label="Aspiring Pro" value="Aspiring Pro" />
              <Picker.Item label="Semi-Pro" value="Semi-Pro" />
              <Picker.Item label="Pro" value="Pro" />
          </Picker>
          <Picker
            type="dropdown"
            selectedValue={this.state.searchParams.server}
            style={styles.pickerInput}
            onValueChange={(value)=> {
              this.updateSearchParams('server', value);
              this.handleSearch();
            }}>
            <Picker.Item label="Server" value="" />
            <Picker.Item label="India" value="India" />
            <Picker.Item label="US East" value="US East" />
            <Picker.Item label="US West" value="US West"/>
            <Picker.Item label="China UC" value="China UC"/>
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
      { 
        dotaRequest: ResourceActions.dotaRequest,
        
       },
      dispatch
    )
  )(FindAPlayer);
