import React from 'react'
import {Row, Col, CardPanel, Card, CardTitle} from 'react-materialize'

const Heros = props => {
  let stats = Object.keys(props.data).map((key) => {
      if (key !== "miscellaneous") {
        if (key !== 'average'){
        //  return(
        let stats2 = Object.keys(props.data[key]).filter(item => {
          return(
            item !== 'selfHealing'
          )
        }).map((key1,index) =>{
            return(
              <p key={index} className={key1} id={key1}>
                {key1}:
                {props.data[key][key1]}
              </p>
            )
          })
        return(
          <p key={key}>
            {key}:
            {stats2}
          </p>
        );
        // )
      }
    }
  })

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

    <Col s={12} m={6}>
      <div className="card horizontal">
        <div className="card-image">
          <img src='https://s3.us-east-2.amazonaws.com/overwatch-api/ana.png' />
        </div>
        <div className="card-content black-text">
          <span className="card-title"><a href={`/hero/${props.name}`}>{props.name}</a></span>
          <p>Test</p>
          <br />
          <p><b>Test</b></p>
        </div>
      </div>
    </Col>

  )
}

export default Heros
