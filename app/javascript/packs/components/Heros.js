import React from 'react'
import {Row, Col, CardPanel, Card, CardTitle} from 'react-materialize'

const Heros = props => {
  let stats = Object.keys(props.data).filter(item => {
    return(
      item !== 'miscellaneous' && item !== 'average'
    )
  }).map((key) => {
    let upK = key.toUpperCase();
        //  return(
        let stats2 = Object.keys(props.data[key]).filter(item => {
          return(
            item !== 'selfHealing' && item !== 'turretDestroyed'
          )
        }).map((key1,index) =>{
          let capK = key1[0].toUpperCase() + key1.slice(1)
          let spaceK = capK.replace(/([A-Z])/g, ' $1').trim()
            return(
              <div key={index} className={key1} id={key1}>
                <b>{spaceK}: </b>
                {props.data[key][key1]}
              </div>
            )
          })
        return(
          <div key={key}>
            <br/>
            <h6>{upK}</h6>
            <br/>
            {stats2}
          </div>
        );
        // )


  })
  // let deaths = Object.keys(props.deaths)[0].map((key,index) =>{
  //   return(
  //     <p key={index}>
  //       props.deaths[Object.keys(props.deaths)[0]]
  //     </p>
  //   )
  // })
  let deaths
  if (props.deaths[Object.keys(props.deaths)[0]] == null){
    deaths = 0
  }else{
    deaths = props.deaths[Object.keys(props.deaths)[0]]
  }
  // let eliminations
  // if(props.eliminations[Object.keys(props.eliminations)['eliminations']] == null){
  //   eliminations = 0
  // }else{
  //   eliminations = props.eliminations[Object.keys(props.eliminations)['eliminations']]
  // }

  // <Card className='small' header={<CardTitle reveal image={'https://s3.us-east-2.amazonaws.com/overwatch-api/ana.png'} waves='light'/>}
  //     title={props.name}
  //     reveal={
  //         <p>TEST</p>
  //            }>
  //     <div>
  //     <p>TEST</p>
  //     </div>
  // </Card>
  return(
<div>
  <div className="hide-on-small-only">
    <Col s={12} m={6}>
      <div className="card horizontal green lighten-2">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={`https://s3.us-east-2.amazonaws.com/overwatch-api/${props.name}.png`} />
        </div>
        <div className="card-stacked">
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4"><b>{props.nameC}</b><i className="material-icons right">more_vert</i></span>
          <div className="block">
            <div className="floating-box center">{deaths}</div>
            <div className="floating-box"><b>Deaths</b></div>
          </div>
          <div className="block">
            <div className="floating-box center">{props.eliminations}</div>
            <div className="floating-box"><b>Eliminations</b></div>
          </div>
          <div className="block">
            <div className="floating-box center">{props.kda}</div>
            <div className="floating-box"><b>K:D</b></div>
          </div>
          <div className="block">
            <div className="floating-box center">{props.objective}</div>
            <div className="floating-box"><b>Objective Kills</b></div>
          </div>
          <div className="block">
            <div className="floating-box center">{props.won}</div>
            <div className="floating-box"><b>Games Won</b></div>
          </div>
          <div className="block">
            <div className="floating-box center">{props.time}</div>
            <div className="floating-box"><b>Playtime</b></div>
          </div>
        </div>
        <div className="card-action">
          <a className="blue-text text-accent-3"href={`https://playoverwatch.com/en-us/heroes/${props.name}/`}>Hero Info</a>
        </div>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4"><b>{props.nameC}</b><i className="material-icons right">close</i></span>
          {stats}
        </div>
      </div>
    </Col>
  </div>

  <div className="hide-on-med-and-up">
    <Col s={12} m={6}>
      <div className="card horizontal">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={`https://s3.us-east-2.amazonaws.com/overwatch-api/${props.name}.png`} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4"><b>{props.nameC}</b><i className="material-icons right">more_vert</i></span>
          </div>
          <div className="card-action">
            <span className="card-title activator deep-orange-text text-lighten-1">STATS</span>
          </div>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4"><b>{props.nameC}</b><i className="material-icons right">close</i></span>
          {stats}
        </div>
      </div>
    </Col>
  </div>
</div>
  )
}

export default Heros
