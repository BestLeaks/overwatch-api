import React from 'react'
import {Row, Col, CardPanel, Card, CardTitle} from 'react-materialize'
const CareerStats = props => {

  return(
    <div>
    <Row>
      <Col s={12} m={12}>
        <div className="card orange lighten-2">
          <div className="card-content">
            <span className="card-title center"><b>Career Stats</b></span>
            <div className="center">
            <div className="block1">
              <div className="floating-box">{props.assist}</div>
              <div className="floating-box"><b>Total Healing Done</b></div>
            </div>
            <div className="block1">
              <div className="floating-box">{props.most_elim_game}</div>
              <div className="floating-box"><b>Most Kills in Game</b></div>
            </div>
            <div className="block1">
              <div className="floating-box">{props.solo_kill_game}</div>
              <div className="floating-box"><b>Most Solo Kills in Game</b></div>
            </div>
            <div className="block1">
              <div className="floating-box">{props.most_dmg_game}</div>
              <div className="floating-box"><b>Most Damage Done in Game</b></div>
            </div>
            <div className="block1">
              <div className="floating-box">{props.all_dmg}</div>
              <div className="floating-box"><b>Damage Done Lifetime</b></div>
            </div>
            <div className="block1">
              <div className="floating-box">{props.all_elim}</div>
              <div className="floating-box"><b>Elimination Done Lifetime</b></div>
            </div>
            <div className="block">
              <div className="floating-box">{props.all_deaths}</div>
              <div className="floating-box"><b>Deaths in Lifetime</b></div>
            </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
    </div>
  )
}


export default CareerStats
