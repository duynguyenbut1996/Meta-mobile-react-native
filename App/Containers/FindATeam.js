import React, { Component } from "react";
import { View, Picker, TextInput, Text, ListView, TouchableOpacity } from 'react-native';
import {
  MainContainer,
} from "../Components";
import TeamCard from '../Components/Cards/TeamCard';
import styles from './Styles/FindATeam';
import Algolia from "../Services/Algolia";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResourceActions from "../Redux/ResourcesRedux";

const DsFormat = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class FindATeam extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: ds.cloneWithRows([]),
      teamName: "",
      searchParams: {},
      result: {},
    };
  }
  
  componentDidMount() {

    this.handleSearch();
    this.props.teamDotaRequest()
  }

  async handleSearch() {
    const query = this.state.searchParams;
    query.teamName = this.state.teamName;
    const result = await Algolia.searchTeam(query, 'dota2Team');
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
    return (
      <MainContainer style={styles.container}>
        <View style={styles.filterBar}>
          <TextInput 
          value={teamName}
          onChangeText={text => {
            this.setState({ teamName: text });
            this.handleSearch();
            }
          }
          style={styles.textInput}
          />
          <Picker
            type="dropdown"
            selectedValue={this.state.searchParams.country}
            style={styles.pickerInput}
            onValueChange={(value)=> {
              this.updateSearchParams('country', value);
              this.handleSearch();
            }}>
            <Picker.Item label="Country" value="" />
            <Picker.Item label="SG" value="SG" />
            <Picker.Item label="AG" value="AG" />
            <Picker.Item label="AL" value="AL"/>
            <Picker.Item label="AM" value="AM"/>
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
              <TeamCard team={rowData} />
              <View style={styles.divider}/>
            </View>
            }
          />
        </View>
      </MainContainer>
    );
  }
}

export default connect(null,
  dispatch =>
    bindActionCreators(
      { teamDotaRequest: ResourceActions.teamDotaRequest },
      dispatch
    )
  )(FindATeam);

