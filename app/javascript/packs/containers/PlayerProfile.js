import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch, browserHistory } from 'react-router';
import PlayerInfo from '../components/PlayerInfo';
import QuickPlay from '../components/QuickPlay';
import CompPlay from '../components/CompPlay';

class PlayerProfile extends Component {
  constructor(props) {
    super(props)
    this.state ={
      player_info: [],
      fetch_status: false,
      quick_play: true,
      comp_play: false
    }
    this.quickPlay = this.quickPlay.bind(this)
    this.compPlay = this.compPlay.bind(this)
  }

  quickPlay(event){
    event.preventDefault();
    this.setState({quick_play: true, comp_play: false})
  }

  compPlay(event){
    event.preventDefault();
    this.setState({quick_play: false, comp_play: true})
  }

  componentDidMount(){
    let playerName = this.props.match.params.name
    fetch(`/api/v1/player_stats/${playerName}`)
    .then(response => response.json())
    .then(data => {this.setState({player_info: data, fetch_status: true})})
  }

  render(){
    let player_info_data;
    if(this.state.fetch_status){
      player_info_data =
        <PlayerInfo
          data={this.state.player_info}
        />
    }
    let quick_comp_buttons;
    if(this.state.fetch_status){
      quick_comp_buttons =
        <div>
          <button onClick={this.quickPlay}> QuickPlay Stats </button>
          <button onClick={this.compPlay}> CompPlay Stats </button>
        </div>
    }
    let quick_play_data;
    if(this.state.quick_play && this.state.fetch_status){
      quick_play_data =
      <QuickPlay
        data={this.state.player_info.player_data.quickPlayStats}
      />
    }

    let comp_play_data;
    if(this.state.comp_play && this.state.fetch_status){
      comp_play_data =
      <CompPlay
        data={this.state.player_info.player_data.competitiveStats}
      />
    }

    return(
      <div>
      {player_info_data}
      {quick_comp_buttons}
      {quick_play_data}
      {comp_play_data}
      </div>
    )
  }
}
export default PlayerProfile
