import React from 'react';
import ValidatedInput from "../components/validated-input";
import Border from "../components/border";
import ItemList from "../components/item-list";
import Link from "../components/link";
import IconSelect from "../components/icon-select";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export default class ResourceView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	onUpdateResource = (updates) => {
		this.props.onUpdateResource?.call(this, updates);
	}

	onUpdateSelectedLink = (updates) => {
		let links = [...this.props.resource?.links];

	}

	render() {

		let resource = this.props.resource || {};

		return (<Container>
			<Row>

				{/* Resource Details */}
				<Col md={12} lg={12}>
					<Card>
						<Card.Title>Resource Details</Card.Title>
						<Row>

							<Col className={"flex-shrink-1 w-auto"}>
								<Form.Label>Icon</Form.Label>
								<IconSelect icons={this.props.config?.icons} />
							</Col>

							{/* Resource Name */}
							<Col>
								<ValidatedInput label={"Name"} placeholder={"Enter a name"}
												value={resource?.name}
												onChange={(name) => this.onUpdateResource({name})}>

									{/* Resource Icon */}
								</ValidatedInput>
							</Col>

							{/* Resource Keywords */}
							<Col sm={12} md={6}>
								<ValidatedInput label={"Keywords, Acronyms, Nicknames, Etc"}
												placeholder={"Enter keywords"}
												value={resource?.keywords}
												onChange={(keywords) => this.onUpdateResource({keywords})}/>
							</Col>

							{/* Resource Description */}
							<Col md={12} sm={12}>
								<ValidatedInput label={"Description"}
												placeholder={"Enter a description of the resource"}
												value={resource?.description} type={"textarea"}
												textStyle={{
													resize: "vertical",
													minHeight: "200px",
													maxHeight: "400px"
												}}
												onChange={(description) => this.onUpdateResource({description})}/>
							</Col>
						</Row>
					</Card>
				</Col>

				{/* Resource Links */}
				<Col md={12} lg={6}>
					<Card>
						<Card.Title>Links</Card.Title>
						<Row>

							{/* List of Links */}
							<Col md={12}>
								<Border style={"min-width: 200px;"}>
									<ItemList items={resource.links}
											  type={({item}) => {
												  console.log(item);
												  return <Link link={item} className={"p-1"}/>;
											  }}
											  onSelectItem={(item, index) => {
											  }}
											  editable={!this.props.locked}/>
								</Border>
							</Col>

							{!this.props.locked && <Col md={12}>

								{/* Link Name */}
								<ValidatedInput label={"Link Name"} placeholder={"Enter link name"}
												value={this.state.selectedLink?.name} className={"mt-3"}
												onChange={(name) => this.onUpdateSelectedLink({name})}>

									{/* Link Icon */}
									<IconSelect icons={this.props.icons}
												icon={this.state.selectedLink?.icon}
												onSelect={(icon) => this.onUpdateSelectedLink({icon})}/>
								</ValidatedInput>

								{/* Link Url */}
								<ValidatedInput label={"Link Url"} placeholder={"Enter link url"}
												className={"mt-3"} style={{minHeight: "100%"}}
												value={this.state.selectedLink?.href}
												onChange={(url) => this.onUpdateSelectedLink({url})}/>
							</Col>}

						</Row>
					</Card>
				</Col>

				{/* Files */}
				<Col md={12} lg={6}>
					<Card>
						<Card.Title>Files</Card.Title>
						<Border style={"min-width: 200px;"}>
							<ItemList items={resource.files}
									  type={({item}) => {
										  console.log(item);
										  return <Link link={item} className={"p-1"}/>;
									  }}
									  onSelectItem={(item, index) => {
									  }}
									  editable={this.props.editable}/>
						</Border>
					</Card>
				</Col>

			</Row>
		</Container>);
	}
}
