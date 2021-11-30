import React from "react";

const SIZE = "8px";

class BorderSide extends React.Component {
	render() {
		return <div style={{
			border:"1px solid var(--theme-primary-color)",
			minWidth: SIZE,
			flexShrink: 1,
			...this.props.style
		}}/>;
	}
};

export default class Border extends React.Component {

	render() {
		return (<div className={["d-flex", this.props.className].join(" ")}>

			{/* Left Border */}
			<BorderSide style={{borderRightWidth: "0px"}}/>

			{/* Content */}
			<div style={{padding: SIZE + " 0px", flexGrow: "1"}}>
				{this.props.children}
			</div>

			{/* Right Border */}
			<BorderSide style={{borderLeftWidth: "0px"}}/>
		</div>);
	}
}

