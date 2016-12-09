import React, { Component } from 'react';
import FacebookPlayer from 'react-facebook-player';

class FacebookPlayerWrap extends Component {
  constructor(props) {
    super(props);

    let defaultState = {
      player: null,
      autoplay: true,
      timeouts: {}
    };

    this.state = defaultState;
  }

  onReady = (player) => {
    this.setState({
      player: player,
    });
  }

  playVideo = () => {
    const { player } = this.state;
    if (player) player.play();
  }

  pauseVideo = () => {
    const { player } = this.state;
    if (player) player.pause();
  }

  render() {
    const { videoId, appId } = this.props.facebook;
    return (
      <FacebookPlayer
          videoId={ videoId }
          appId={ appId }
          onReady={ this.onReady }
          />
      </div>
    );
  }
}