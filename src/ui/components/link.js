import React from 'react';
import Icon from "./icon";

export default class Link extends React.Component {

    onClick = () => {
        this.props.onClick?.call(this, this.props.link);
    }


    /**<OverlayTrigger trigger="click" placement="right" defaultShow={"false"}
     overlay={() => this.renderEditLinkPopover(link)}>**/

    render() {

        let link = this.props.link || {};

        return (
            <div className={this.props.className || "d-inline"} onClick={this.onClick}>
                <Icon icon={link?.icon} title={link?.name}/>
                <i className={"text-truncate text-nowrap"}
                   style={{fontSize: "0.8rem", opacity: 0.5}}>{link?.href || link?.url}</i>
            </div>
        );
    }
}
