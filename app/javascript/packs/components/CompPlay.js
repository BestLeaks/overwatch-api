import React from 'react'
import CareerStats from './CareerStats'
import Heros from './Heros'

const CompPlay = props => {

  let OverallGames = props.data.careerStats.allHeroes.game.gamesWon
  // let data2 = props.data.careerStats
  // var filter_allH = Object.keys(data2).filter((filt) => filt != "allHeroes")
  let Heroes = Object.keys(props.data.careerStats).map((key,index) => {
    if (key !== "allHeroes") {
    return(
      <Heros
        key={index}
        name={key}
        data = {props.data.careerStats[key]}
        oGames= {OverallGames}
      />
    )}
  })

  return(

    <div>
    <li>CompPlay</li>
    {Heroes}
    <CareerStats
      data={props.data.careerStats.allHeroes.assists}
    />
    </div>
  )
}

export default CompPlay
