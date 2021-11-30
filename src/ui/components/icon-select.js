import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Icon from './icon';

export default class IconSelect extends React.Component {

    onSelect = (icon) => {
        this.props.onSelect?.call(this, icon);
    }

    render() {

        let icons = this.props.icons || [];

        return (
            <Dropdown disabled={icons.length === 0} onSelect={this.onSelect}>
                <Dropdown.Toggle>
                    <Icon icon={this.props.icon}/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        this.props.icons?.map((icon, index) => {
                            return (
                                <Dropdown.Item eventKey={icon} key={index}>
                                    <Icon icon={icon}/>
                                </Dropdown.Item>
                            );
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
