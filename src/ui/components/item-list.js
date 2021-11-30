import React from 'react';
import Icon from "./icon";
import Button from "react-bootstrap/Button";

export class DefaultItem extends React.Component {

	render() {
		let item = this.props.item || {};
		return (<div className={"p-3"}>
			<Icon icon={item.icon} title={item.name} className={""}/>
			{item.description && <div className={"fd__description-preview mt-2"}>{item.description}</div>}
		</div>);
	}
}

export default class ItemList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: props.selectedIndex
		};
	}

	onSelectItem = (item, index) => {
		this.setState({
			selectedIndex: index
		});
		this.props.onSelectItem?.call(this, item, index);
	}

	onClickItem = (item, index) => {
		this.props.onClickItem?.call(this, item, index);
	}

	render() {

		let items = this.props.items || [];
		let ItemComponent = (this.props.type || DefaultItem);

		/* These will determine how things are rendered */
		let editable = (this.props.editable || this.props.onEditItem);
		let selectable = (editable || this.props.selectable || this.props.onSelectItem);
		let clickable = (selectable || this.props.clickable || this.props.onClickItem);

		return (<div>

			{/* The List of Items */}
			<div className={this.props.className || "d-flex flex-column"} style={this.props.style}>

				{/* Create Each Item */}
				{items.map((item, index) => {
					let selected = (selectable && index === this.state.selectedIndex) && "selected";
					let is_button = (clickable && !selected) && "button";
					return (<div className={selected || is_button || ""} key={index} role={is_button}
								 onClick={() => {
									 if (selectable && !selected) {
										 this.onSelectItem(item, index);
									 }
									 if (clickable) {
										 this.onClickItem(item, index);
									 }
								 }}>
						<ItemComponent item={item}/>
					</div>);
				})}

				{/* Nothing Here... */}
				{items?.length === 0 && <div style={{textAlign:"center", padding:"1rem 0"}}>Nothing here...</div>}
			</div>

			{/* Optional Edit Buttons */}
			{editable && <div className={"d-flex gap-2 pt-2 mt-2 justify-content-end"}
							  style={{borderTop: "1px dotted var(--border-color)"}}>

				{/* Move Up */}
				{false && <Button variant={"secondary"} size={"sm"}
						onClick={this.onClickMoveUp}
						disabled={this.state.selectedIndex === undefined}>Move Up</Button>}

				{/* Move Down */}
				{ false && <Button variant={"secondary"} size={"sm"}
						onClick={this.onClickMoveDown}
						disabled={this.state.selectedIndex === undefined || this.state.selectedIndex >= this.props.links?.length - 1}>Move
					Down</Button>}

				{/* Add New */}
				<Button variant={"success"} size={"sm"}
						onClick={this.onClickNew}>Add</Button>

				{/* Edit */}
				<Button variant={"primary"} size={"sm"}
						disabled={this.state.selectedIndex === undefined || items?.length === 0}
						onClick={this.onClickDelete}>Edit</Button>

			</div>}

			{/* Any Additional Children */}
			{this.props.children}
		</div>);
	}
}
