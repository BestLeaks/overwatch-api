import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchInput, {createFilter} from 'react-search-input';
import User from '../components/User';
import PlayerInfo from '../components/PlayerInfo';
import QuickPlay from '../components/QuickPlay';
import CompPlay from '../components/CompPlay';
import TwitchForm from './TwitchForm';
import {Button, Icon, Modal, Col, Preloader} from 'react-materialize'

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
      comp_play: false,
      loading: false
    }

    this.searchUpdated = this.searchUpdated.bind(this)
    this.createTwitch = this.createTwitch.bind(this)
    this.searchFetch = this.searchFetch.bind(this)
    this.updateFetch = this.updateFetch.bind(this)
    this.quickPlay = this.quickPlay.bind(this)
    this.compPlay = this.compPlay.bind(this)
  }

  componentDidMount() {
    fetch('api/v1/player_stats', {credentials: "same-origin"})
    .then(response => response.json())
    .then(body => {
      this.setState({ players_stats: body})
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
  updateFetch(event){
    event.preventDefault();
    let nameID = this.state.name
    // this.setState({loading: true})
    let payload = {
      profile: nameID
    }
    fetch(`/api/v1/player_stats/refresh`,{
      method: 'PUT',
      body: JSON.stringify(payload),
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {this.setState({player_info: body, formShow: false})})
  }
  searchFetch(event){
    event.preventDefault();
    this.setState({loading: true})
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
    .then(body => {this.setState({player_info: body, name: nameID, fetch_status: true, searchTerm: '', show_stats: true, loading: false})
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
    let load;
    if(this.state.loading){
      load =
      <div className="center">
        <Col s={12}>
          <br/>
          <br/>
		     <Preloader flashing size="big"/>
	      </Col>
      </div>
    }
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
          <div className="hide-on-small-only">
            <div className="center">
              <button onClick={this.updateFetch} className="waves-effect waves-light btn"> Refresh </button>&nbsp;&nbsp;
              <button onClick={this.compPlay} className="waves-effect waves-light btn"> Competitive </button>&nbsp;&nbsp;
              <button onClick={this.quickPlay} className="waves-effect waves-light btn"> Quick</button>
            </div>
          </div>
          <div className="hide-on-med-and-up">
            <div className="center">
              <button onClick={this.updateFetch} className="waves-effect waves-light btn"> Refresh </button>
            </div>
            <br/>
            <div className="center">
              <button onClick={this.quickPlay} className="waves-effect waves-light btn"> Quick</button>&nbsp;&nbsp;
              <button onClick={this.compPlay} className="waves-effect waves-light btn"> Competitive </button>
            </div>
          </div>
        </div>
    }
    let addTwitchButton;
    if(this.state.name == this.state.battletag){
      if(this.state.player_info.stats.addTwitch === ''){
        addTwitchButton =
        <div>
          <div className="hide-on-small-only">
            <Modal
              header='Add Twitch.tv ID'
              trigger={<Button waves='light' className="right">Add Twitch <Icon right>settings</Icon></Button>}>
              <TwitchForm createTwitch = {this.createTwitch}/>
            </Modal>
          </div>
          <div className="hide-on-med-and-up">
          <div className="center">
            <Modal
              header='Add Twitch.tv ID'
              trigger={<Button waves='light' className="center">Add Twitch <Icon right>settings</Icon></Button>}>
              <TwitchForm createTwitch = {this.createTwitch}/>
            </Modal>
          </div>
          </div>
        </div>
      }else{
        addTwitchButton =
        <div>
          <div className="hide-on-small-only">
            <Modal
              header='Add Twitch.tv ID'
              trigger={<Button waves='light' className="right">Update Twitch <Icon right>settings</Icon></Button>}>
              <TwitchForm createTwitch = {this.createTwitch}/>
            </Modal>
          </div>
          <div className="hide-on-med-and-up">
          <div className="center">
            <Modal
              header='Add Twitch.tv ID'
              trigger={<Button waves='light' className="center">Update Twitch <Icon right>settings</Icon></Button>}>
              <TwitchForm createTwitch = {this.createTwitch}/>
            </Modal>
          </div>
          </div>
        </div>
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
    <div className="hide-on-med-and-up">
      <div className="mobile-overlay">
        <div id="mobile-background">
          <img src="https://s3.us-east-2.amazonaws.com/overwatch-api/mobile-background.jpg" />
        </div>
      </div>
      <div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
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
          <br/>
          <div>
            {load}
            {addTwitchButton}
            <br/>
            <br/>
          </div>
          {player_info_data}
          {quick_comp_buttons}
          <br/>
          <br/>
          {quick_play_data}
          {comp_play_data}
      </div>
    </div>

    <div className="hide-on-small-only">
    <div className="video">
    <video id="video-background" loop autoPlay>
      <source src="https://overwatch-a.akamaihd.net/video/pages/home/header-82b9abce067992beedde6d103b6241d616a7ee97cc0d4f3126277098c2e4b09004325f25c6a245656096bd333c880b0032e2cbdbed9d2514220e20718482e95b.mp4" type="video/mp4"/>
      <source src="https://overwatch-a.akamaihd.net/video/pages/home/header-82b9abce067992beedde6d103b6241d616a7ee97cc0d4f3126277098c2e4b09004325f25c6a245656096bd333c880b0032e2cbdbed9d2514220e20718482e95b.mp4" type="video/ogg"/>
      Your browser does not support the video tag.
    </video>
    </div>
      <div className="position">
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
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
          <br/>
          <div>
            {load}
            {addTwitchButton}
            <br/>
            <br/>
          </div>
          {player_info_data}
          {quick_comp_buttons}
          <br/>
          <br/>
          {quick_play_data}
          {comp_play_data}
      </div>
    </div>
  </div>
    )
  }
}





export default PlayerStats
