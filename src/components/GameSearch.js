import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../js/requests'

// Components
import GameItem from './GameItem'
import Loading from './Loading'
import ErrorManager from './ErrorManager'

class GameSearch extends Component{

  constructor(props){
    super(props)
    this.state = {
      items: [],
      isLoaded: true,
      status: null
    }
    this.games = {}
  }

  handleChange(event){
    this.setState({
      isLoaded: null,
      items: []
    })
    const gam_name = event.target.value
    GET_AUTH(`/gameslike?gam_name=${ gam_name }&page=1`).then(
      (res) => {
        this.setState({
          isLoaded: true,
          items: res.data
        })
      }
    ).catch(
      (error) => {
        console.log(error)
        this.setState({
          isLoaded: false,
          status: (error.response) ? error.response.status : 0
        })
      }
    )
  }

  render(){
    const { items, isLoaded } = this.state
    const form = (
      <div className="row">
        <div className="input-field col s12 m8 offset-m2">
          <i className="material-icons prefix">search</i>
          <input id="icon_prefix" type="text"   placeholder="Search a game"
                 onChange={ (e) => this.handleChange(e) }/>
        </div>
      </div>
    )
    if(isLoaded){
      var games = items.map(
        (game) => (<GameItem key={ game.id } game={ game } />)
      )

      return(
        <div>
          { form }
          <div className="row">
            { games }
          </div>
        </div>
      )
    }else if(isLoaded == null){
      return(
        <div>
          { form }
          <Loading />
        </div>
      )
    }else{
      return(<ErrorManager status={ this.state.status } />)
    }
  }
}

export default GameSearch
