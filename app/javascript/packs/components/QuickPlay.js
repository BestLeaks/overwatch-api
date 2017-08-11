import React from 'react'
import CareerStats from './CareerStats'
import Heros from './Heros'
const QuickPlay = props => {

let OverallGames = props.data.careerStats.allHeroes.game.gamesWon
// let data2 = props.data.careerStats
// var filter_allH = Object.keys(data2).filter((filt) => filt != "allHeroes")
let Heroes = Object.keys(props.data.careerStats).map((key,index) => {
  let name = key.replace(":","-")
  let replaced_name = name.replace("ú","u")
  let replaced = replaced_name.replace("ö",'o')
  let upperCased = replaced.toUpperCase();
  if (key !== "allHeroes") {
    if (Object.keys(props.data.careerStats[key]).length === 7){
  return(
    <Heros
      key={index}
      nameC = {upperCased}
      name={replaced}
      data = {props.data.careerStats[key]}
      deaths={props.data.careerStats[key].deaths}
      eliminations={props.data.careerStats[key].combat.eliminations}
      kda={props.data.careerStats[key].combat.eliminationsPerLife}
      objective={props.data.careerStats[key].combat.objectiveKills}
      accuracy={props.data.careerStats[key].combat.weaponAccuracy}
      won={props.data.careerStats[key].game.gamesWon}
      time={props.data.careerStats[key].game.timePlayed}

    />
  )}
}
})


// <p>{data.assist.selfHealing}</p>
// console.log(props.data.careerStats)
// console.log(filter_allH)
// <CareerStats
//   data={props.data.careerStats.allHeroes.assists}
// />
  return(
    <div>
    <h4 className="center"><b>Quick Play</b></h4>
    <CareerStats
      assist={props.data.careerStats.allHeroes.assists.healingDone}
      most_elim_game={props.data.careerStats.allHeroes.best.eliminationsMostInGame}
      solo_kill_game={props.data.careerStats.allHeroes.best.soloKillsMostInGame}
      most_dmg_game={props.data.careerStats.allHeroes.best.allDamageDoneMostInGame}
      all_dmg={props.data.careerStats.allHeroes.combat.allDamageDone}
      all_elim={props.data.careerStats.allHeroes.combat.eliminations}
      all_deaths={props.data.careerStats.allHeroes.deaths.deaths}

    />
    <br/>

    <div className="row">
      {Heroes}
    </div>

    </div>
  )
}



export default QuickPlay
