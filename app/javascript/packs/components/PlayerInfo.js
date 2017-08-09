import React from 'react'
import {Row, Col, CardPanel, Card, CardTitle} from 'react-materialize'

const PlayerInfo = props => {
  let level;
  if (props.data.prestige != "")
  {
    level = <b>{(props.data.player_data.prestige * 100) + props.data.player_data.level}</b>
  }
  let rating;
  let ratingNum;
  if (props.data.player_data.rating !== 0)
  {
    rating = <span><img src={props.data.player_data.ratingIcon}  height="38px" width="38px"/></span>
    ratingNum = <p><b>{props.data.player_data.rating}</b></p>
  }

  return(
    <div>
      <div className="hide-on-small-only">
        <Row>
      		<Col s={12} m={12}>
          <div className="card horizontal">
            <div className="card-image">
              <img src={props.data.player_data.icon} height="230px" width="230px"/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <h5><b>{props.data.name}</b></h5>
                  <div className="block">
                    <div className="floating-box">{rating}</div>
                    <div className="floating-box"><b>{ratingNum}</b></div>
                  </div>
              </div>
              <div className="card-action">
                <a href={props.twitchID} ><i className="fa fa-twitch fa-lg"></i></a>
                <div className="right"><h6>Total Games Won <b>{props.data.player_data.gamesWon}</b> &nbsp; LEVEL {level} </h6></div>
              </div>
            </div>
          </div>
      		</Col>
        </Row>
      </div>


      <div className="hide-on-med-and-up">
        <Card className='small' header={<CardTitle reveal image={props.data.player_data.icon} waves='light'/>}
        		title={props.data.name}
        		reveal={
              <div>
                {rating}{ratingNum}
              </div>
                   }>
            <div>
            <div><p>Games Won <b>{props.data.player_data.gamesWon}</b></p><div className="right"><a href={props.twitchID} ><i className="fa fa-twitch fa-lg"></i></a></div></div>
            </div>
        </Card>
      </div>
    </div>
  )
}



export default PlayerInfo
