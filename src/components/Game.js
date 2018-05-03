import React, { Component } from 'react'
import Loading from './Loading'
import ErrorManager from './ErrorManager'
import { GET_AUTH } from '../js/requests'

class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      game: {},
      isLoaded: null,
      status: null
    }
  }

  componentDidMount() {
    const $ = window.$
    document.title = "SPairing"
    $(document).ready(function(){
      $('.parallax').parallax()
      $('ul.tabs').tabs();
    })
  }

  componentDidUpdate() {
    const $ = window.$
    $(document).ready(function(){
      $('.parallax').parallax()
      $('ul.tabs').tabs();
    })
}
  componentWillMount() {

    const { match: { params } } = this.props

    GET_AUTH(`/games/${ params.gameId }`).then(
      (res) => {
        console.log(res);
        this.setState({
          game: res.data,
          isLoaded: true
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


//   <div>
//   <div className="row">
//     <div className="center-align">
//       <h1>{ items.gam_name }</h1>
//       <i className="large material-icons">info_outline</i>
//       <p className="gameinfo">{ items.gam_description }</p>
//       <a href={ items.gam_link }>
//         <h6 className="secondary-color-text">{ items.gam_link }</h6>
//       </a>
//       <div className="row">
//         <h6>PEGI Rating:
//         </h6>
//         <h6>{ pegi.peg_name }</h6>
//         <br/>
//         <img src={ pegi.peg_image } alt="pegiImage" className="gameImage"/>
//       </div>
//     </div>
//   </div>
//   <div>
//     <h3>Top Rated Player</h3>
//     <ul className="collection">
//       <li className="collection-item avatar">
//         <span className="title">
//           <h5>{ pgpNick }</h5>
//         </span><br/>
//         <h5>Reputation:</h5>
//         <h5>{ pgpRep }</h5><br/>
//         <h5>Rating:</h5>
//         <h5>{ pgpRate }</h5>
//         <a href="#!" className="secondary-content">
//           <i className="material-icons">grade</i>
//         </a>
//       </li>
//     </ul>
//   </div>
// </div>)

  render() {
    const { game, isLoaded } = this.state
    const noPadding = { padding: 0 }, noMargin = { margin: 0 }

    if (isLoaded) {
      // const pegi = this.state.items.pegi
      // const pgp = this.state.items.player_game_profiles[0]
      // const pgpNick = pgp.pgp_nickname
      // const pgpRep = pgp.pgp_reputation
      // const pgpRate = pgp.pgp_rate
      const gam_img = (game.gam_image) ? game.gam_image :
                'https://semantic-ui.com/images/wireframe/image.png'
      var genres = game.genres.map(g => g.gen_name).join(', ')
      var platforms = game.platforms.map(p => p.plat_name).join(', ')

      return (
        <div>
          <div className="parallax-container">
            <h2 className="white-text container">
              { game.gam_name }
            </h2>
            <div className="parallax">
              <img src={ gam_img } alt= {game.gam_name}/>
            </div>
          </div>
          <div className="section" style={ noPadding }>
            <div className="row" style={ noMargin }>
              <div className="col s12" style={ noPadding }>
                <ul className="tabs">
                  <li className="tab col s4"><a className="primary-color-dark" href="#test1">About</a></li>
                  <li className="tab col s4"><a className="primary-color-dark" href="#test2">Forum</a></li>
                  <li className="tab col s4"><a className="primary-color-dark" href="#test3">NoName</a></li>
                </ul>
              </div>
              <div id="test1" className="col s12">
                <p className="flow-text">
                  <b>Genre: </b>
                  { genres }
                </p>
                <p className="flow-text">
                  <b>Platforms: </b>
                  { platforms }
                </p>
                <p className="flow-text">
                  <br/>
                  <b>Description: </b>
                  { game.gam_description }
                </p>
              </div>
              <div id="test2" className="col s12">
                Test 2
              </div>
              <div id="test3" className="col s12">
                Test 3
              </div>
            </div>
          </div>
        </div>
      )
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {

      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default Game
