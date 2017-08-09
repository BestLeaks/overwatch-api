import React from 'react'
import CareerStats from './CareerStats'
import Heros from './Heros'
const QuickPlay = props => {

let OverallGames = props.data.careerStats.allHeroes.game.gamesWon
// let data2 = props.data.careerStats
// var filter_allH = Object.keys(data2).filter((filt) => filt != "allHeroes")
let Heroes = Object.keys(props.data.careerStats).map((key,index) => {
  let name = key.replace(":","-")
  if (key !== "allHeroes") {
  return(
    <Heros
      key={index}
      name={name}
      data = {props.data.careerStats[key]}
      oGames= {OverallGames}
    />
  )}
})


// <p>{data.assist.selfHealing}</p>
// console.log(props.data.careerStats)
// console.log(filter_allH)
  return(
    <div>
      <li>QuickPlay</li>
    <div className="row">
      {Heroes}
    </div>
    <CareerStats
      data={props.data.careerStats.allHeroes.assists}
    />
    </div>
  )
}



export default QuickPlay
