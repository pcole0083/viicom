import React, { Component } from 'react';
import YouTubePlayer from 'youtube-player';

export default class Player extends Component {
	constructor(props, context) {
        super(props, context);

        var defaultState = {
        	player: null,
        	autoplay: true,
        	timeouts: {}
        };

        this.state = defaultState;
    }

    componentDidMount() {
    	this.loadPlayer(this.props.videoId);
    }

    loadPlayer = (videoId) => {
    	let player1;
 
		player1 = this._youTubePlayer();

		this.setState({
			player: player1
		});
    }

    _youTubePlayer = (videoId) => {
    	let player1;

    	player1 = YouTubePlayer('ready-player-1', {
			videoId: videoId
		});

		let stateNames = {
	        '-1': 'unstarted',
	        0: 'ended',
	        1: 'playing',
	        2: 'paused',
	        3: 'buffering',
	        5: 'video cued'
	    };
		 
		// 'playVideo' is queue until the player is ready to received API calls and after 'loadVideoById' has been called. 
		if(!!this.state.autoplay){
			player1
				.playVideo()
				.then(() => {
					console.log('Playback will begin shortly.');
				});
		}

		player1.on('stateChange', (event) => {
			let currentState = stateNames[event.data];
			if (!stateNames[event.data]) {
            	throw new Error('Unknown state (' + event.data + ').');
        	}
        	if(currentState === 'playing'){
        		Object.keys(this.props.items).forEach((value) => {
        			this._createTimeoutListener(~~value);
        		});
        	}
        	if(currentState === 'paused' || currentState === 'ended'){
        		Object.keys(this.props.items).forEach((value) => {
        			clearTimeout(this.state.timeouts[value]);
        		});
        	}
		});

		return player1;
    }

    _showProduct = (id) => {
    	//console.log(id);
    	return function(){
    		let visibleItems = this.props.visibleItems;
    		visibleItems[''+id] = this.props.items[''+id];
    		this.props.onUpdateHandler({
    			visibleItems: visibleItems
    		});
    	}.bind(this);
    }

    _createTimeoutListener = (stopPlayAt) => {
    	let time = this.state.player.getCurrentTime();
    		time.then((timeV) => {
    			let rate = this.state.player.getPlaybackRate();
    			rate.then((rateV) => {
    				let remainingTime = (stopPlayAt - timeV) / rateV,
    					timeKey = ''+stopPlayAt;

    				let newTimeout = {};

			    	clearTimeout(this.state.timeouts[''+stopPlayAt]);

			    	newTimeout[timeKey] = setTimeout(function(){
			    		this.logEvent(stopPlayAt, remainingTime, this._showProduct(stopPlayAt) )();
			    	}.bind(this), remainingTime*1000);

			    	this.setState({
			    		timeouts: Object.assign(this.state.timeouts, newTimeout)
			    	});
    			});
    		});
    		
    }

    logEvent = (stopPlayAt, remainingTime, callback) => {
    	return () => {
	    	let time = this.state.player.getCurrentTime();
	    	time.then((timeV) => {
	    		console.log('timeV: '+timeV);
	    		if(~~(Object.keys(this.state.timeouts)[0] <= timeV)){
	    			if(!!callback){
	    				callback();
	    			}
	    		}
	    		else {
	    			//testing has shown about 0.05 seconds off time called.
	    			setTimeout(function(){
	    				this.logEvent(stopPlayAt, remainingTime, callback)();
	    			}.bind(this), 100);
	    		}
	    	});
    	}
    }

	render() {
		return (
			<div id="ready-player-1">Loading...</div>
		);
	}
}
