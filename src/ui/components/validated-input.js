import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";

export default class ValidatedInput extends React.Component {

	onChange = (event) => {
		this.props.onChange?.call(this, event?.target?.value || "");
	}

	render() {

		let label = this.props.label;

		return (<Form className={this.props.className} style={this.props.style}>
			<Form.Label>{this.props.label}</Form.Label>
			<Form.Group>
				{this.props.children}
				<Form.Control as={this.props.type}
							  type={this.props.type || "input"}
							  placeholder={this.props.placeholder || "Enter text"}
							  value={this.props.value || ""}
							  onChange={this.onChange}/>
			</Form.Group>
		</Form>);
	}
}
