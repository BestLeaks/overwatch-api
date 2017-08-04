import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchInput, {createFilter} from 'react-search-input';
import User from '../components/User';
import PlayerInfo from '../components/PlayerInfo';
import QuickPlay from '../components/QuickPlay';
import CompPlay from '../components/CompPlay';

const KEYS_TO_FILTERS = ['name']
class PlayerStats extends Component {
  constructor(props) {
    super(props)
    this.state={
      players_stats: [],
      searchTerm: '',
      player_info: [],
      name: '',
      fetch_status: true,
      show_stats: '',
      quick_play: true,
      comp_play: false
    }
    this.searchUpdated = this.searchUpdated.bind(this)
    this.searchFetch = this.searchFetch.bind(this)
    this.quickPlay = this.quickPlay.bind(this)
    this.compPlay = this.compPlay.bind(this)
  }

  componentDidMount() {
    fetch('api/v1/player_stats')
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

  searchFetch(event){
    event.preventDefault();
    let replace = this.state.searchTerm
    let nameID = replace.replace("#","-");
    let payload = {
      profile: nameID
    }
    fetch('/api/v1/player_stats/data', {
      method: 'POST',
      body: JSON.stringify(payload)
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
     .then(body => {this.setState({player_info: body, name: nameID, fetch_status: true, searchTerm: '', show_stats: true})})
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
      filteredName = this.state.players_stats.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    }
    let user_names = filteredName.map((data,index) => {

      return(
        <User
        key={index}
        data={data}/>
      )
    })
    let player_info_data;
    let quick_comp_buttons;
    if(this.state.show_stats){
      player_info_data =
        <PlayerInfo
          data={this.state.player_info}
        />
      quick_comp_buttons =
        <div>
          <button onClick={this.quickPlay}> QuickPlay Stats </button>
          <button onClick={this.compPlay}> CompPlay Stats </button>
        </div>
    }
    let quick_play_data;
    if(this.state.quick_play && this.state.show_stats){
      quick_play_data =
      <QuickPlay
        data={this.state.player_info.player_data.quickPlayStats}
      />
    }
    let comp_play_data;
    if(this.state.comp_play && this.state.show_stats){
      comp_play_data =
      <CompPlay
        data={this.state.player_info.player_data.competitiveStats}
      />
    }
    return(
      <div>
        <p>{invalid}</p>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <button onClick={this.searchFetch}>Search </button>
        {user_names}
        {player_info_data}
        {quick_comp_buttons}
        {quick_play_data}
        {comp_play_data}


      </div>
    )
  }
}





export default PlayerStats
