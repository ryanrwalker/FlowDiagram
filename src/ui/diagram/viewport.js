import React from 'react';
import ReactFlow, {Background, Controls} from 'react-flow-renderer';
import Resource from './resource';

const onLoad = (reactFlow) => {
    //console.log('flow loaded:', reactFlow);
    reactFlow.fitView();
};

const nodeTypes = {
    special: (props) => {
        return <Resource data={props.data}/>;
    }
};

class Viewport extends React.Component {

    render() {

        // Get the current view
        let config = this.props.config || {};
        let view = this.props.view || {};

        // Wrap nodes with ReactFlow metadata
        let nodes = view.nodes?.map(node => {
            return {
                id: node.id,
                type: 'special',
                data: {
                    config: config,
                    view: view,
                    node: node,
                    resource: config.getResource(node.id)
                },
                position: {
                    x: node.x,
                    y: node.y
                },
                draggable: true
            };
        }) || [];

        return (
            <div style={

                {...(this.props.style || {}), height: "100%", width: "100%"}

            }>
                <ReactFlow nodeTypes={nodeTypes} onLoad={onLoad}
                           elements={nodes} maxZoom={1} minZoom={0.5}>
                    <Controls className={"fd-box-shadow"}/>
                    <Background color="#aaa" gap={16}/>
                </ReactFlow>
            </div>);
    }
}

export default Viewport;
