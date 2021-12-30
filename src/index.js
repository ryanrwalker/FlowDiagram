import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {Configuration} from "./models";
import data from "./data";
import Nav from "react-bootstrap/Nav";
import MainView from "./ui/views/main-view";
import ResourceView from "./ui/views/resource-view";
import FlowView from "./ui/views/flow-view";
import Icon from "./ui/components/icon";

class FlowDiagram extends React.Component {

	constructor(props) {
		super(props);

		let config = new Configuration(data);

		let resource = config.resources[0];

		this.state = {
			views: [
				{
					breadcrumb: <div><Icon icon={"/img/diagram-3-fill.svg"}/> flow-diagram</div>,
					type: MainView,
					props: {
						onClickResource: this.onClickResource,
						onClickFlow: this.onClickFlow
					}
				},
				{
					breadcrumb: resource.name,
					type: ResourceView,
					props: {resource}
				}
			],
			config: config
		};
	}

	pushView = (view) => {
		this.setState((state) => ({
			views: [
				...state.views,
				view
			]
		}));
	}

	popView = (count) => {
		if (this.state.views?.length > 1 && count) {
			this.setState((state) => {
				let views = [...state.views];
				views.pop();
				return {views: views};
			}, () => this.popView(count - 1));
		}
	}

	onClickResource = (resource) => {
		this.pushView({
			breadcrumb: resource?.name,
			type: ResourceView,
			props: {resource}
		});
	}

	onClickFlow = (flow) => {
		this.pushView({
			breadcrumb: flow?.name,
			type: FlowView,
			props: {flow}
		});
	}

	onClickBreadcrumb = (value, index) => {
		let totalViews = this.state.views?.length;
		if (index < totalViews) {
			this.popView((totalViews - index) - 1);
		}
	}

	render() {

		/* Only the last view will be displayed */
		let views = (this.state.views || []);
		let view = views[views.length - 1] || {};
		let CurrentView = view.type;

		return (<div className={"h-100 d-flex flex-column " + (this.state.locked ? "locked" : "")}>

			{/* Navigation Bar */}
			<Nav defaultActiveKey={views.length - 1}>

				{/* Breadcrumbs for each View */}
				{views?.map((view, index) => {

					let isCurrent = index === views.length - 1;
					return (<Nav.Link key={index}
									  disabled={isCurrent}
									  className={isCurrent ? "me-auto" : ""}
									  onClick={() => this.onClickBreadcrumb(view, index)}>
						{view.breadcrumb || "Unknown"}
						{!isCurrent && <Icon icon={"/img/caret-right-fill.svg"} />}
					</Nav.Link>);
				})}

				{/* Lock/Unlock */}
				<Nav.Link onClick={() => this.setState(state => ({
					locked: !state.locked
				}))}>
					<Icon icon={this.state.locked ? "/img/lock-fill.svg" : "/img/unlock-fill.svg"} />
					<span className={"ms-2"}>{this.state.locked ? "Locked" : "Unlocked"}</span>
				</Nav.Link>
			</Nav>

			{/* Outer wrapper for the entire page */}
			<div className={"flex-grow-1"} style={{overflowY: "scroll"}}>

				{/* Current View */}
				<CurrentView {...view.props} config={this.state.config} locked={this.state.locked} />

			</div>
		</div>);
	}
}

/**
 * This is where React injects itself into the DOM
 */
ReactDOM.render( //
	(<FlowDiagram/>), //
	document.body //
);

