import React from 'react';
import "./Prezzi.scss";

function Prezzi() {
	return (
		<div className="prezzi">
			<p className="title">Multi Range</p>
			<input type="radio" name="price" id="10"/>
			<label>10</label><br/>
			<input type="radio" name="price" id="10-100"/>
			<label>10-100</label><br/>
			<input type="radio" name="price" id="100-500"/>
			<label>100-500</label><br/>
			<input type="radio" name="price" id="500"/>
			<label>500</label><br/>
			<input type="radio" name="price" id="all" defaultChecked/>
			<label>All</label><br/>
		</div>
	);
}

export default Prezzi;