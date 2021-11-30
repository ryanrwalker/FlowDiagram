import {ArrayModel, ObjectModel} from 'objectmodel';
import {v4 as uuidv4} from 'uuid';

export class Id extends ObjectModel({
	id: [String]
}) {

	/** These getters and setters are needed to dynamically create an id if one is
	 * not defined. You can't provide it in defaultTo() because that wouldn't generate
	 * a new id for each instance, but would reuse the same one
	 *
	 * https://github.com/sylvainpolletvillard/ObjectModel/issues/107
	 * **/
	get id() {
		if (!this._id) {
			this._id = uuidv4();
		}
		return this._id;
	}

	set id(id) {
		this._id = id;
	}
}

export class Link extends ObjectModel({
	icon: [String],
	href: [String],
	name: [String]
}) {
}

export class Tag extends Id.extend({
		links: ArrayModel([Link]),
		icon: [String]
	})
	.defaultTo({
		links: []
	}) {
}

export class Resource extends Id.extend({
		name: String,
		description: String,
		icon: [String],
		keywords: [String],
		links: [ArrayModel(Link)]
	})
	.defaultTo({
		name: "Untitled",
		description: "",
		links: []
	}) {
}

export class Node extends Id.extend({
		x: [Number],
		y: [Number]
	})
	.defaultTo({
		x: 0.0,
		y: 0.0
	}) {
}

export class Flow extends Id.extend({
		name: String,
		nodes: ArrayModel(Node),
		icon: [String]
	})
	.defaultTo({
		name: "Untitled",
		nodes: []
	}) {
}

export class Configuration extends ObjectModel({
	tags: [ArrayModel(Tag)],
	resources: [ArrayModel(Resource)],
	flows: [ArrayModel(Flow)],
	icons: [ArrayModel(String)]
})
	.defaultTo({
		tags: [],
		resources: [],
		views: [],
		icons: []
	}) {

	getResource(id) {
		return this.resources.find(resource => resource.id === id);
	}
}

