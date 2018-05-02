import React, { Component } from 'react'
import defaultAvatar from '../assets/user.svg'
import Loading from './Loading'
import ErrorManager from './ErrorManager'
import { GET_AUTH, BASE_URL } from '../js/requests'

class PlayerProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      isLoaded: null,
      avatar: null,
      status: null
    }
  }

  componentDidMount() {
    const $ = window.$
    document.title = "SPairing"
    $(document).ready(function() {
      $('ul.tabs').tabs()
    })
  }

  componentWillMount() {
    const { match: { params } } = this.props


    // const game_id = this.props.game_id
    const route = `/player_profiles/${params.userId}`
    GET_AUTH(route).then(
      (res) => {
        this.setState({
          profile: res.data,
          isLoaded: true
        })
      }
    ).catch(
      (error) => {
        this.setState({
          isLoaded: false,
          status: (error.response) ? error.response.status : 0
        })
      }
    )
  }

  render() {
    const { profile, isLoaded } = this.state

    if (isLoaded != null && isLoaded) {
      const username = profile.pp_username
      const email = profile.email
      const elo = profile.pp_spairing_elo
      const location = (profile.location) ? profile.location.loc_name : 'Not available'
      const avatar =  BASE_URL + profile.pp_avatar.url
      var avatarImg = (profile.pp_avatar.url) ?
          <img className="circle responsive-img" alt="" src={ avatar } height="160" width="160"/> :
          <img className="circle responsive-img" alt="" src={ defaultAvatar } height="160" width="160"/>
      var friends = profile.friends.map((item, i) => (<h5 className="leftText"  key={i}>{item.pp_username}</h5>))
      var games = profile.games.map((item, i) => (<h5 className="leftText" key={i}>{item.gam_name}</h5>))
      return (
        <div>
          <div className="row">
            <div className="center-align">
              <br />
              {avatarImg}
              <h3>{ username }</h3>
              <h5 className="secondary-color-text">{ email }</h5>
              <h4>Current player level (Rating): { elo }</h4>
              <h4>Location: { location }</h4>
            </div>
          </div>
          <div className="row center-align">
            <a href="/updateprofile" className="waves-effect waves-light btn primary-color">Edit Profile</a>
          </div>
          <div className="row">
            <div className="col s6">
              <h3 className="leftText">Friends</h3>
              <ul>{ friends }</ul>
            </div>
            <div className="col s6">
              <h3 className="leftText">Games</h3>
              <ul>{ games }</ul>
            </div>
          </div>
        </div>)
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default PlayerProfile
