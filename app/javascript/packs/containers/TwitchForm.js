import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TwitchForm extends Component {
  constructor(props) {
    super(props)
    this.state={
      twitchID: ''
    }
  this.handleChange = this.handleChange.bind(this)
  this.handleFormSubmit = this.handleFormSubmit.bind(this)
  this.handleClearForm = this.handleClearForm.bind(this)
  }
  handleChange(event){
    this.setState({twitchID: event.target.value})
  }
  handleClearForm(event){
    event.preventDefault();
    this.setState({twitchID: ''})
  }
  handleFormSubmit(event){
    event.preventDefault();
    let formPayload = {
      twitchID: this.state.twitchID
    }
    this.props.createTwitch(formPayload)
    this.handleClearForm(event);
  }
  render(){
    return(
      <form className="form" onSubmit={this.handleFormSubmit}>
        <label>Twitch ID</label>
        <input type="text" onChange={this.handleChange} value={this.state.twitchID}/>
        <input type="submit" className="waves-effect waves-light btn" name="Submit"/>
      </form>

    )
  }
}


export default TwitchForm
