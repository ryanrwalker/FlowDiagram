import React from 'react';
import Image from "react-bootstrap/Image";

export default class Icon extends React.Component {

	render() {
		return (<>
			<Image src={this.props.icon || "img/default.svg"}
				   className={this.props.className || "icon"}
				   draggable={false}/>
			{this.props.title && <span className={"text-truncate ms-2"}>{this.props.title}</span>}
		</>);
	}
}
