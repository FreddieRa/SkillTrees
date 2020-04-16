for (let item of [
	"Data",
	"Djikstra",
	"Functions", 
	"keyPressed",
	"mouseDragged",
	"mousePressed",
	"Node", 
	"SaveAndLoad",
	"Start",
	"TreeSearch"
	]) {
	let imported = document.createElement('script');
	imported.src = "./Javascript/" + item + ".js";
	document.head.appendChild(imported);
}

function preload() {
	ex = loadStrings("examples/Default.txt")
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	rectMode(CENTER);
	textAlign(CENTER, CENTER);
	ts = 22;
	textSize(ts);
	version = "build";

	// File browser button
	browse = createFileInput(loadTree)
	browse.position(width - 250, 40)

	addExample = createButton("Load Example")
	addExample.mousePressed(function() {loadTree(ex[0], true)})
	addExample.position(width - 250, 60)
	
	// The desired cost for showing the average number of skill and attribute points
	costToUse = 0;
	// The maximum cost spreading out from a node in mode 2
	maxCost = 0;
	
	// A dictionary of nodes where their ID is the key
	nodes = {};
	connections = {};
	route = [];
	
	// The scale that everything is drawn at
	scaleFactor = 1;
	
	// Properties of nodes that should be saved
	toCopyNode  = ["id", "x", "y", "name", "type", "magnitude"]
	toCopyStart = ["id", "x", "y", "name", "skills", "attributes"]
	
	// All of the GUI for checking nodes
	loc = createElement('p');
	loc2 = createElement('p')
	loc.position(width-250, 80);
	loc.style.width = 250
	mainGUI = new dat.GUI({
		autoPlace: false,
		width: 200,
		height: 250
	});
	mainGUI.add(this, 'version', [ 'build', 'check' ]);
	let checker = mainGUI.addFolder("Checker")
	checker.add(this, 'maxCost', 0, 30, 1);
	checker.add(this, 'costToUse', 0, 30, 1);
	checker.add(this, 'skillAndAtt').name("Average skill/att");
	checker.add(this, 'calcUlts').name("Calculate ults");
	checker.add(this, 'calcAlls').name("Calculate all");
	checker.add(this, 'getCSV').name("Save a CSV");
	checker.add(this, 'calcLinks').name("Calculate links");
	checker.add(this, 'orphanCheck').name("Check orphans");
	checker.add(this, 'maxOfEachStat').name("maxOfEachStat");
	checker.add(this, 'checkMagnitudes').name("Check Magnitudes")
	checker.add(this, 'treeSearch').name("Tree Search")
	
	checker.add(this, 'dumpConsole').name("Dump Console");
	checker.add(this, 'clearConsole').name("Clear Console");
	loc.child(mainGUI.domElement)

	// The id of the node to be next added
	id = 0;
	startID = -1;
	
	// There is no GUI to begin with
	gui = false;

	// The current "from" and "to" IDs for adding a connection
	from = -1;
	to = -1;
	
	// This is the position of a selection box, and those selected
	selected = []
	startCoords = []
	endCoords = []
	
	// Curve
	cur = 3
	
	// Current contents of console
	consoleContents = []
	
	// This signifies whether there have been edits to the tree
	unchanged = true

	mode = 1;
	modes = {
		"build": {
			1: "Add node",
			2: "Add weight 1 connection",
			3: "Add other connection",
			4: "Move node",
			5: "Edit node",
			6: "Remove connection",
			7: "Remove node"
		},
		"check" :{
			1: "Shortest Distance",
			2: "All possibly reached",
			4: "Move tree"
		}}
}

function draw() {
	background(255);
	hovered = -1;
	
	// Pressing up and down arrow keys scale everything up and down
	if(mode == 4 && keyIsDown(UP_ARROW)){scaleFactor += 0.01}
	if(mode == 4 && keyIsDown(DOWN_ARROW)){scaleFactor -= 0.01}
	if (keyIsDown(219)) {cur -= 0.5; cur = max(cur, 0)}
	if (keyIsDown(221)) {cur += 0.5; cur = min(cur, 10)}


	{
		noStroke();
		fill(0);
		textSize(25);
		text(modes[version][mode], 140, 40)
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
				stroke(0)
				line(f.x, f.y, t.x, t.y)
				stroke(255)
				strokeWeight(10*scaleFactor)
				if (weight > 1) {
					textSize(ts*scaleFactor)
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
	} // Draw nodes
	
	
	if(startCoords.length != 0){
		stroke(color(100, 100, 200));
		strokeWeight(2);
		fill(color(100, 100, 200, 10))
		let x = (startCoords[0] + endCoords[0])/2
		let y = (startCoords[1] + endCoords[1])/2
		let w = abs(endCoords[0] - startCoords[0])
		let h = abs(endCoords[1] - startCoords[1])
		rect(x, y, w, h);
	} // Draw box
}