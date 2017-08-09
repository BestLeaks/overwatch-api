import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchInput, {createFilter} from 'react-search-input';
import User from '../components/User';
import PlayerInfo from '../components/PlayerInfo';
import QuickPlay from '../components/QuickPlay';
import CompPlay from '../components/CompPlay';
import TwitchForm from './TwitchForm';
import {Button, Icon, Modal} from 'react-materialize'

const KEYS_TO_FILTERS = ['name']
class PlayerStats extends Component {
  constructor(props) {
    super(props)
    this.state={
      players_stats: [],
      searchTerm: '',
      player_info: [],
      name: 'empty',
      battletag: '',
      fetch_status: true,
      show_stats: '',
      quick_play: true,
      comp_play: false
    }

    this.searchUpdated = this.searchUpdated.bind(this)
    this.createTwitch = this.createTwitch.bind(this)
    this.searchFetch = this.searchFetch.bind(this)
    this.quickPlay = this.quickPlay.bind(this)
    this.compPlay = this.compPlay.bind(this)
  }

  componentDidMount() {
    fetch('api/v1/player_stats', {credentials: "same-origin"})
    .then(response => response.json())
    .then(body => {
      this.setState({ players_stats: body })
    })

  }
  quickPlay(event){
    event.preventDefault();
    this.setState({quick_play: true, comp_play: false})
  }
  compPlay(event){
    event.preventDefault();
    this.setState({quick_play: false, comp_play: true})
  }
  searchUpdated (term) {
    this.setState({ searchTerm: term })
  }
  createTwitch(payload){
    fetch(`/api/v1/player_stats/${this.state.name}`,{
      method: 'PUT',
      body: JSON.stringify(payload),
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {this.setState({player_info: body, formShow: false})})
  }
  searchFetch(event){
    event.preventDefault();
    let replace = this.state.searchTerm
    let nameID = replace.replace("#","-");
    let payload = {
      profile: nameID
    }
    fetch('/api/v1/player_stats/data', {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: "same-origin"
    })
    .then(response => {
    if (response.status > 400) {
      this.setState({fetch_status: false})
      console.log("false")
      let errorMessage = `${response.status} (${response.statusText})`,
      error = new Error(errorMessage);
      throw(error);
    } else {
      return response;
      }
    })
    .then(response => response.json())
    .then(body => {this.setState({player_info: body, name: nameID, fetch_status: true, searchTerm: '', show_stats: true})
    let battleTag;
    if (this.state.player_info.length !== 0 ){
      if (Object.keys(this.state.player_info.user).length !== 0){
        battleTag = this.state.player_info.user.battletag.replace("#","-")
        this.setState({battletag: battleTag})
      }
    }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){

    let invalid;
    if (this.state.fetch_status == false)
    {
      invalid = "Invalid Username"
    }
    let filteredName;
    if (this.state.searchTerm === ''){
      filteredName = []
    }else{
      filteredName = this.state.players_stats.stats.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    }
    let user_names = filteredName.map((data,index) => {
      return(
        <User
          key={index}
          data={data}
        />
      )
    })
    let player_info_data;
    let quick_comp_buttons;
    if(this.state.show_stats){
      player_info_data =
        <PlayerInfo
          data={this.state.player_info.stats}
          twitchID={this.state.player_info.stats.addTwitch}
        />
      quick_comp_buttons =
        <div>
          <button onClick={this.quickPlay}> QuickPlay Stats </button>
          <button onClick={this.compPlay}> CompPlay Stats </button>
        </div>
    }
    let addTwitchButton;
    if(this.state.name == this.state.battletag){
      if(this.state.player_info.stats.addTwitch === ''){
        addTwitchButton =
        <Modal
          header='Add Twitch.tv ID'
          trigger={<Button waves='light' className="right">Add Twitch <Icon right>settings</Icon></Button>}>
          <TwitchForm createTwitch = {this.createTwitch}/>
        </Modal>
      }else{
        addTwitchButton =
        <Modal
          header='Update Twitch.tv ID'
          trigger={<Button waves='light' className="right">Update Twitch <Icon right>settings</Icon></Button>}>
          <TwitchForm createTwitch = {this.createTwitch}/>
        </Modal>
      }
    }

    let quick_play_data;
    if(this.state.quick_play && this.state.show_stats){
      quick_play_data =
      <QuickPlay
        data={this.state.player_info.stats.player_data.quickPlayStats}
      />
    }
    let comp_play_data;
    if(this.state.comp_play && this.state.show_stats){
      comp_play_data =
      <CompPlay
        data={this.state.player_info.stats.player_data.competitiveStats}
      />
    }
    return(
      <div>
        <p>{invalid}</p>
          <div className="wrapper card">
        <SearchInput className="search-input" onChange={this.searchUpdated} placeholder="  Enter BattleTag"/>
        <div className="search-results">
          {user_names}
        </div>
          </div>
        <div className="center">
        <Button waves='light' onClick={this.searchFetch}> Search <Icon right>search</Icon></Button>
        </div>

        {addTwitchButton}
        {player_info_data}
        {quick_comp_buttons}
        {quick_play_data}
        {comp_play_data}


      </div>
    )
  }
}





export default PlayerStats
