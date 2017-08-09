import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch, browserHistory } from 'react-router';
import PlayerInfo from '../components/PlayerInfo';
import QuickPlay from '../components/QuickPlay';
import CompPlay from '../components/CompPlay';
import TwitchForm from './TwitchForm';
import {Button, Icon, Modal} from 'react-materialize'
class PlayerProfile extends Component {
  constructor(props) {
    super(props)
    this.state ={
      player_info: [],
      fetch_status: false,
      quick_play: true,
      comp_play: false,
      battletag: '',
      name: 'empty',

    }
    this.createTwitch = this.createTwitch.bind(this)
    this.quickPlay = this.quickPlay.bind(this)
    this.compPlay = this.compPlay.bind(this)
    this.redirect = this.redirect.bind(this)
  }
  redirect(name){
     document.location.replace(`/player_stats/${name}`)
   }

  createTwitch(payload){
    let playerName = this.props.match.params.name
    fetch(`/api/v1/player_stats/${playerName}`,{
      method: 'PUT',
      body: JSON.stringify(payload),
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {this.redirect(body.stats.name)})
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
    fetch(`/api/v1/player_stats/${playerName}`,{credentials: "same-origin"})
    .then(response => response.json())
    .then(data => {
      this.setState({player_info: data, fetch_status: true, name: playerName}, () => {
      let battleTag;
      if (this.state.player_info.length !== 0 ){
        if (Object.keys(this.state.player_info.user).length !== 0){
          battleTag = this.state.player_info.user.battletag.replace("#","-")
          this.setState({battletag: battleTag})
        }
      }
      })
      })
  }


  render(){
    let player_info_data;
    if(this.state.fetch_status){
      player_info_data =
        <PlayerInfo
          data={this.state.player_info.stats}
          twitchID={this.state.player_info.stats.addTwitch}
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
        data={this.state.player_info.stats.player_data.quickPlayStats}
      />
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

    let comp_play_data;
    if(this.state.comp_play && this.state.fetch_status){
      comp_play_data =
      <CompPlay
        data={this.state.player_info.stats.player_data.competitiveStats}
      />
    }

    return(
      <div>
      {addTwitchButton}
      
      {player_info_data}
      {quick_comp_buttons}
      {quick_play_data}
      {comp_play_data}
      </div>
    )
  }
}
export default PlayerProfile
