import React from 'react'
import {Row, Col, CardPanel, Card, CardTitle} from 'react-materialize'

const Heros = props => {
  let stats = Object.keys(props.data).map((key) => {
    let upK = key.toUpperCase();
      if (key !== "miscellaneous") {
        if (key !== 'average'){
        //  return(
        let stats2 = Object.keys(props.data[key]).filter(item => {
          return(
            item !== 'selfHealing'
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
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={`https://s3.us-east-2.amazonaws.com/overwatch-api/${props.name}.png`} />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">{props.nameC}<i className="material-icons right">more_vert</i></span>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4"><b>{props.nameC}</b><i className="material-icons right">close</i></span>
          {stats}
        </div>
      </div>
    </Col>

  )
}

export default Heros
