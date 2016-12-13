//library imports
import React, { Component } from 'react';

export default class ProductList extends Component  {
	_goToReveal = (evt) => {
		let target = evt.target,
			seekTo = target.getAttribute('data-seek');
		if(!!seekTo){
			this.props.onUpdateHandler({
				'goTo': ~~seekTo
			});
		}
	}

	render() {
		let className = 'list-wrapper';
		let visibleItems = this.props.visibleItems ? this.props.visibleItems : {};
		let itemKeys = Object.keys(visibleItems);
		let listItems = !!itemKeys.length ? itemKeys.map((itemKey, index, array)=>{
			let liClassName = index === array.length-1 ? 'item-element animate-in' : 'item-element';
			let item = this.props.items[itemKey];
			return (
				<li key={item.id} className={liClassName}>
					<div className="col-2">
						<img src={item.imgURL} alt={item.name} />
					</div>
					<div className="col-2">
						<h3>{item.name}</h3>
						<p>ID: {item.id}</p>
						<p>SKU: {item.sku}</p>
						<p>Price: {item.price}</p>
						<p><button>Add to Cart</button></p>
						<p><button onClick={this._goToReveal} data-seek={itemKey}>See it in action</button></p>
					</div>
				</li>
			);
		}): <li key='no-products' className='loading-element'>Products in video appear here</li>;

		return (
			<ul className={className}>{listItems}</ul>
		);
	}
}