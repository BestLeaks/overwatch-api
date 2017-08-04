import React from 'react'

const User = props => {
  return(
    <li><a href={`/player_stats/${props.data.name}`}>{props.data.name}</a></li>
  )
}



export default User
