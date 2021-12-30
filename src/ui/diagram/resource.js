import React from 'react';
import Tag from './tag';

class Resource extends React.Component {

	render() {

		const {resource} = this.props.data;
		const {id, name, icon, description, keywords, tags} = resource;

		return (<div className="fd-node" title={id}>

			<div className="fd-title">
				<img src={"img/" + (icon || "default.svg")} title={name} alt={name}/>{name}
			</div>

			<div className="fd-content">{description}</div>

			{keywords?.length > 0 && //
			<div className="fd-content fd-hint">
				<label>Nicknames: </label>{keywords}
			</div>}

			<div className="fd-content fd-tag-container">
				{tags?.map((tag, index) => {
					return <Tag data={tag} key={index}/>;
				})}
			</div>
		</div>);
	}
}

export default Resource;
