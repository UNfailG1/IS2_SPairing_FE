import React from 'react'

const Forum = ({ item, onClick }) => {
  const { sf_name, sf_description } = item
  const noMargin = { margin: 0 }
  return (
    <div className="row valign-wrapper" style={ noMargin }>
      <div className="col s7">
        <p>
          <b><a href="#!" onClick={ () => onClick() }>{ sf_name }</a></b><br/>
          { sf_description }
        </p>
      </div>
      <div className="col s2 center-align">
        Una cantidad
      </div>
      <div className="col s3 center-align">
        Una fechita
      </div>
    </div>
  )
}

export default Forum
