import React from 'react';
import ReactFlow, {addEdge, Background, Controls, Handle} from "react-flow-renderer";
import Icon from "../components/icon";
import Card from "react-bootstrap/Card";

const nodeTypes = {
	resource: ({data}) => {
		return <div className={"card p-2"} style={{maxWidth: "200px"}}>
			<Handle style={{
				width: "30px",
				height: "10px"
			}}/>
			<Icon icon={data?.flow?.icon} title={data?.node?.description}/>
		</div>
	}
};

export default class FlowView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			flow: JSON.parse(JSON.stringify(props.flow))
		};
	}

	render() {

		// Get the current flow
		let flow = this.props.flow || {};
		let config = this.props.config || {};

		// Wrap nodes with ReactFlow metadata
		let nodes = flow.nodes?.map(node => ({
			id: node.id,
			type: 'resource',
			data: {
				config: config,
				flow: flow,
				node: node,
				label: node.description || "Some description"
			},
			position: {
				x: node.x,
				y: node.y
			}
		})) || [];

		// Add arrows
		flow.arrows?.forEach((arrow, index) => {
			let temp = {
				id: "e3-" + index,
				source: arrow.from,
				target: arrow.to,
				label: arrow.description || "Something",
				animated: true,
				arrowHeadType: 'arrow'
			};
			nodes.push(temp);
			console.log({
				arrow,
				index,
				temp,
				nodes
			});
		});

		const onConnect = (params) => {
			console.log(params);
			//setElements((els) => addEdge(params, els));
		}

		let locked = this.props.locked;

		return (<div className={"h-100 d-flex flex-row p-3"}>
			<Card title={"Flow Details"}>
				Details
			</Card>

			{/* The Almighty Flow */}
			<ReactFlow className={"h-100"}
					   nodeTypes={nodeTypes} elements={nodes}
					   maxZoom={1.75} minZoom={0.2}
					   nodesConnectable={locked}
					   onLoad={(a) => console.log(a)}>
				<Controls className={"fd-box-shadow"}/>
				<Background color="#EEEEEE" gap={32} size={0.5} variant={"lines"}/>
			</ReactFlow>
		</div>);
	}
}
