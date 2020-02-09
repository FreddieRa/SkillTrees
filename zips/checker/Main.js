function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	rectMode(CENTER);
	textAlign(CENTER, CENTER);
	ts = 22;
	textSize(ts);

	// File browser
	browse = createFileInput(loadTree)
	browse.position(width - 250, 40)

	// The desired cost for showing the average number of skill and attribute points
	costToUse = 0;
	// The maximum cost spreading out from a node in mode 2
	maxCost = 0;

	// Properties of nodes that should be saved
	toCopyNode  = ["id", "x", "y", "name", "type", "magnitude"]
	toCopyStart = ["id", "x", "y", "name", "skills", "attributes"]

	// The scale that everything is drawn at
	scaleFactor = 1;

	loc = createElement('p');
	loc.position(0, 50);
	mainGUI = new dat.GUI({
		autoPlace: true
	});
	mainGUI.add(this, 'maxCost', 0, 30, 1);
	mainGUI.add(this, 'costToUse', 0, 30, 1);
	mainGUI.add(this, 'skillAndAtt').name("Average skill/att");
	mainGUI.add(this, 'calcUlts').name("Calculate ults");
	mainGUI.add(this, 'calcAlls').name("Calculate all");
	mainGUI.add(this, 'getCSV').name("Save a CSV");
	mainGUI.add(this, 'calcLinks').name("Calculate links");
	mainGUI.add(this, 'orphanCheck').name("Check orphans");
	mainGUI.add(this, 'maxOfEachStat').name("maxOfEachStat");
	
	mainGUI.add(this, 'dumpConsole').name("Dump Console");
	

	loc.child(mainGUI.domElement)


	// A dictionary of nodes where their ID is the key
	nodes = {};
	connections = {};
	route = [];

	// The id of the node to be next added
	id = 0;
	startID = -1;

	// There is no GUI to begin with
	gui = false;

	// The current "from" and "to" IDs for adding a connection
	from = -1;
	to = -1;
	
	// Current contents of console
	consoleContents = []

	mode = 1;
	modes = {
		1: "Shortest Distance",
		2: "All possibly reached",
		4: "Move tree"
	}
}

function draw() {
	background(255);
	hovered = -1;

	{
		noStroke();
		fill(0);
		textSize(25);
		text(modes[mode], 140, 30)
	} // Modes

	{
		fill(0)
		for (let [from, dict] of Object.entries(connections)) {
			for (let [to, weight] of Object.entries(dict)) {
				let f = nodes[from]
				let t = nodes[to]
				if (weight != null) {
					strokeWeight(max(1, weight) * scaleFactor)
				}
				if (route.includes(from) && route.includes(to)) {
					stroke("#13c1d1")
				} else {
					stroke(0)
				}
				line(f.x, f.y, t.x, t.y)
				stroke(255)
				strokeWeight(10 * scaleFactor)
				textSize(ts * scaleFactor)
				if (weight > 1) {
					text(weight, (f.x + t.x) / 2, (f.y + t.y) / 2)
				}
			}
		}
	} // Draw connections

	for (let [key, val] of Object.entries(nodes)) {
		val.hover = false;
		if (intersect(val.x, val.y, val.width, val.height)) {
			hovered = key;
			val.hover = true;
		}
		val.update();
		val.show()
	}
}