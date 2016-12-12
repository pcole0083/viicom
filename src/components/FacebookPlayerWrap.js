import React, { Component } from 'react';
import FacebookPlayer from 'react-facebook-player';

export default class FacebookPlayerWrap extends Component {
    constructor(props) {
        super(props);

        let defaultState = {
            player: null,
            autoplay: true,
            timeouts: {}
        };

        this.state = defaultState;
    }

    onReady = (id, player) => {
        this.setState({
            player: player
        });
    }

    playVideo = () => {
        const { player } = this.state;
        if (player) {
            player.play();
        }
    }

    pauseVideo = () => {
        const { player } = this.state;
        if (player) player.pause();
    }

    onPlay = (player) => {
        if(!this.state.player){
            this.setState({
                player: player
            });
        }

        Object.keys(this.props.items).forEach((value) => {
            this._createTimeoutListener(~~value);
        });
    }

    onPause = () => {
        Object.keys(this.props.items).forEach((value) => {
            clearTimeout(this.state.timeouts[value]);
        });
    }

    _createTimeoutListener = (stopPlayAt) => {
        let time = 0;
        let remainingTime = (stopPlayAt - time),
            timeKey = ''+stopPlayAt;

        let newTimeout = {};

        clearTimeout(this.state.timeouts[''+stopPlayAt]);

        newTimeout[timeKey] = setTimeout(function(){
            this.logEvent(stopPlayAt, remainingTime, this._showProduct(stopPlayAt) )();
        }.bind(this), remainingTime*1000);

        this.setState({
            timeouts: Object.assign(this.state.timeouts, newTimeout)
        });           
    }

    _showProduct = (id) => {
        //console.log(id);
        return function() {
            let visibleItems = this.props.visibleItems;
            visibleItems['' + id] = this.props.items['' + id];
            this.props.onUpdateHandler({
                visibleItems: visibleItems
            });
        }.bind(this);
    }

    logEvent = (stopPlayAt, remainingTime, callback) => {
        let player = this.state.player;
        return () => {
            if(!!player){
                let time = player.getCurrentPosition();
                if((~~Object.keys(this.state.timeouts)[0] <= time) && !!callback) {
                    callback();
                }
                else {
                    setTimeout(function(){
                        this.logEvent(stopPlayAt, remainingTime, callback)();
                    }.bind(this), 100);
                }
            }
            else if(!!callback){
                callback();
            }
        }
    }

    _noop = () => {
        return;
    }

    render() {
        const { videoId, appId } = this.props.facebook;
        return (
            <div className="video-wrapper fvid-wrapper"><FacebookPlayer appId={appId} videoId={videoId} autoplay="true" onReady={this.onReady} onStartedPlaying={this.onPlay} onPaused={this.onPause} onStartedBuffering={this._noop} onFinishedBuffering={this._noop} /></div>
        );
    }
}
