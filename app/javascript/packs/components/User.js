import React from 'react'

const User = props => {
  return(
    <ul>
    <a href={`/player_stats/${props.data.name}`}>{props.data.name}</a>
    </ul>
  )
}



export default User
