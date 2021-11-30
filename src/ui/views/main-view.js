import React from 'react';
import ItemList from "../components/item-list";
import Icon from "../components/icon";
import Card from "react-bootstrap/Card";
import Border from "../components/border";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function MainViewCol(props) {
	return (<Col lg={props.lg || 12} xl={props.xl || 6}>
		<Card>
			<Row>
				<Col lg={4} md={12}>
					<Card.Title>{props?.title || "Undefined"}</Card.Title>
					{props?.children}
				</Col>
				<Col lg={8} md={12}>
					<Border style={{minHeight: "200px"}}>
						<ItemList {...props?.itemList} />
					</Border>
				</Col>
			</Row>
		</Card>
	</Col>);
}

export default class MainView extends React.Component {

	onClickResource = (resource) => {
		this.props.onClickResource?.call(this, resource);
	}

	onClickFlow = (flow) => {
		this.props.onClickFlow?.call(this, flow);
	}

	render() {

		let config = this.props?.config || {};


		return (<Container>
			<Row>
				<MainViewCol title={"Resources"}
							 itemList={{
								 items: config.resources,
								 onClickItem: this.onClickResource
							 }}>
					A resource can represent anything that's interacted with, whether that be
					an application or a tool. This can be something that your organization owns
					as well as something external.
				</MainViewCol>

				<MainViewCol title={"Flows"}
							 itemList={{
								 items: config.flows,
								 onClickItem: this.onClickFlow
							 }}>
					A flow describes a specific relationship between Resources.
				</MainViewCol>

				<MainViewCol title={"Icons"}
							 itemList={{
								 items: config.icons,
								 className: "d-flex flex-wrap flex-shrink-1 flex-grow-0",
								 type: ({item}) => (<div className={"p-3"}><Icon icon={item}/></div>),
								 selectable: true
							 }}>
					Icons can be associated to Resources, Flows, or other entities.
				</MainViewCol>

			</Row>
		</Container>);
	}
}
