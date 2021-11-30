import React from 'react';

class Tag extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false
		};

		this.toggleOpen = this.toggleOpen.bind(this);
	}

	set listener(value) {
		document.removeEventListener('mousedown', this.toggleOpen);
		if (value) {
			document.addEventListener('mousedown', this.toggleOpen)
		}
	}

	componentDidMount() {
		this.listener = this.state.open;
	}

	componentWillUnmount() {
		this.listener = false;
	}

	openHref(href) {
		window.open(href, '_blank').focus();
	}

	toggleOpen() {
		let tag = this.props.data || {};
		switch (tag.links?.length) {

			// If there aren't any links, then there's nothing to do when clicking this
			case undefined:
			case 0:
				break;

			// If there's only one link, just open it directly
			case 1:
				this.openHref(tag.links[0].href);
				break;

			// There are more than one link. Open the link selection popup
			default:
				this.setState({
					open: !this.state.open
				}, () => {
					this.listener = this.state.open
				});
				break;
		}
	}

	render() {

		let tag = this.props.data || {};
		let alt = (tag.links?.length > 1) ? "Click to See Options" : (tag.name || "Click to Open");

		return (<div className="fd-tag" key={tag.id} title={alt}
					 onClick={this.toggleOpen}
					 onMouseDown={(e) => {
						 e.preventDefault();
						 e.stopPropagation();
					 }}>

			{tag.icon && // Render the icon
			<img src={"/img/" + tag.icon} alt={alt}/>}

			{!tag.icon && tag.name?.length > 0 && // Render the name
			<span>{tag.name}</span>}

			{tag.links?.length > 1 && //
			<img src={"/img/down-arrow.svg"} alt={alt}/>}

			{this.state.open === true && //
			<div className="fd-link-container" key={tag.id + "-links"}>
				{tag.links?.map((link, index) => {
					return <div className="fd-link" onClick={() => this.openHref(link.href)}
								key={tag.id + "-links-" + index}>
						{link.name}
					</div>
				})}
			</div>}
		</div>);
	}
}

export default Tag;
