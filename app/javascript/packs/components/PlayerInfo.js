import React from 'react'

const PlayerInfo = props => {
  let level;
  if (props.data.prestige != "")
  {
    level = (props.data.player_data.prestige * 100) + props.data.player_data.level
  }
  let rating;
  if (props.data.player_data.rating !== 0)
  {
    rating = <span>Rating: {props.data.player_data.rating} <img src={props.data.player_data.ratingIcon}  height="42" width="42" /></span>
  }
  return(
    <div>
      <p>Name: {props.data.name}</p>
      <img src={props.data.player_data.icon} />
      <p>Level: {level}</p>
      {rating}
      <p>Games Won: {props.data.player_data.gamesWon}</p>
    </div>
  )
}



export default PlayerInfo
