import React, { Component } from 'react';
import Player from './components/Player.js';
import FacebookPlayerWrap from './components/FacebookPlayerWrap.js';
import ProductList from './components/ProductList.js';
import getProducts from './helpers/getProducts.js';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props, context) {
        super(props, context);

        var defaultState = {
            playerType: 'youtube', // youtube, facebook
            videoId: 'M7lc1UVf-VE',
            items: getProducts(),
            visibleItems: {}
        };

        this.state = defaultState;
    }

    _getUpdatedState = (data, propToUpdate) => {
        if(!data){
            return console.warn('No state data sent');
        }

        var state = this.state;
        if(!!propToUpdate && !!state[propToUpdate]){
            state[propToUpdate] = data;
        }
        else {
            state = Object.assign({}, this.state, data);
        }

        this.setState(state);
    }

    render() {
        var player = null;
        switch (this.playerType){
            case 'facebook':
                player = <FacebookPlayerWrap {...this.state} onUpdateHandler={this._getUpdatedState} />
                break
            default:
                player = <Player {...this.state} onUpdateHandler={this._getUpdatedState} />
        }

        return (
            <div className="App">
                <div className="module-wrapper">
                    {player}
                    <ProductList {...this.state} onUpdateHandler={this._getUpdatedState} />
                </div>
            </div>
        );
    }
}

export default App;
