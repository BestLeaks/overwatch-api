import React from 'react'
import CareerStats from './CareerStats'
import Heros from './Heros'

const CompPlay = props => {

  let OverallGames = props.data.careerStats.allHeroes.game.gamesWon
  // let data2 = props.data.careerStats
  // var filter_allH = Object.keys(data2).filter((filt) => filt != "allHeroes")
  let Heroes = Object.keys(props.data.careerStats).map((key,index) => {
    let name = key.replace(":","-")
    let replaced_name = name.replace("ú","u")
    let replaced = replaced_name.replace("ö",'o')
    let upperCased = replaced.toUpperCase();
    let timeP = props.data.careerStats[key].game.timePlayed.replace("seconds","")
    // let timePlayed = timeP.substring(0, timeP.indexOf('.'))
    if (key !== "allHeroes") {
    return(
      <Heros
        key={index}
        nameC = {upperCased}
        name={replaced}
        data = {props.data.careerStats[key]}
        oGames= {OverallGames}
        deaths={props.data.careerStats[key].deaths || 0}
        eliminations={props.data.careerStats[key].combat.eliminations}
        kda={props.data.careerStats[key].combat.eliminationsPerLife}
        objective={props.data.careerStats[key].combat.objectiveKills}
        accuracy={props.data.careerStats[key].combat.weaponAccuracy}
        won={props.data.careerStats[key].game.gamesWon}
        time={timeP}
      />
    )}
  })

  return(

    <div>
    <h4 className="center"><b>Competitive Play</b></h4>
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

export default CompPlay
