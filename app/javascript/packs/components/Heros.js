import React from 'react'

const Heros = props => {
  let stats = Object.keys(props.data).map((key) => {
      if (key !== "miscellaneous") {
        if (key !== 'average'){
        //  return(
        let stats2 = Object.keys(props.data[key]).map((key1,index) =>{
            return(
              <p key={index} className={key1}>
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
  return(

    <div>
    {props.name}
      {stats}
    </div>
  )
}

export default Heros
