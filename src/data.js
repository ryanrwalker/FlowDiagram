let data = {
	icons: [
		"./img/default.svg",
		"./img/aws.svg",
		"./img/splunk.png",
		"./img/github.png",
		"./img/newrelic.svg"
	],
	flows: [
		{
			id: "test",
			name: "Some Web Service",
			nodes: [
				{
					id: "aaa",
					resourceId: "vis",
					description: "This is a short description about what the service does here",
					x: 0,
					y: 0
				},
				{
					id: "bbb",
					resourceId: "vim",
					description: "This is another service that's called after.",
					x: 300,
					y: 0
				}
			],
			arrows: [
				{
					from: "aaa",
					to: "bbb"
				}
			]
		},
		{
			id: "empty",
			name: "Empty Flow",
			nodes: []
		}
	],
	resources: [
		{
			id: "vis",
			name: "Vehicle Imaging Service",
			icon: "./img/aws.svg",
			description: "This service used to be the front door for Vipar's image ingestion. It's being slowly" + " replaced by VIP. This is some more text just so that I can see what will happen with word wrap" + " stuff. This text isn't really important for any other reason other than to just test that one" + " thing. Actually, you could probably stop reading this now.",
			keywords: "VIS",
			links: [
				{
					name: "Splunk",
					icon: "./img/splunk.png",
					href: "https://www.splunk.com"
				},
				{
					name: "AWS - Prod",
					icon: "./img/aws.svg",
					href: "https://aws.amazon.com"
				},
				{
					name: "NewRelic",
					icon: "./img/newrelic.svg",
					href: "https://www.newrelic.com"
				},
				{
					name: "Git Repo",
					icon: "./img/github.png",
					href: "https://www.github.com"
				}
			]
		},
		{
			id: "vim",
			name: "Vehicle Imaging Mapping Service",
			keywords: "VIM"
		}
	]
};

export default data;
