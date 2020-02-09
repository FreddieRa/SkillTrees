function keyPressed() {
	selected = []
	if (Object.keys(modes).includes(key) && !intersect(width - 150, 0, 250, 250)) {
		mode = int(key)
		from = -1;
		to = -1;
	}
	if (key == "#") {
		saveTree()
	}
	if (key == "8") {
		for (let [key, value] of Object.entries(nodes)) {
			// The value here determines how coarse the grid is
			value.snapTo(20*scaleFactor);
		}
	}
}



function mousePressed() {
	startCoord = []
	let h = gui ? height*10 : 250
	if (!intersect(width - 150, 0, 250, 250)) {
		switch (mode) {
			case 1: // Add node
				if (!intersect(width - 150, 0, 250, h)) {
					let string = prompt("Node:");
					let temp = {};
					// Here "dex, 1" would go to ["DEX", "1"]
					if (string == null) {
						break
					} else if (string == "start") {
						let name = prompt("Name:");
						// START
						let skills = {}
						for (let skill of Object.values(skillTable)) {
							skills[skill] = 0
						}
						
						let atts = {}
						for (let att of Object.values(attTable)) {
							atts[att] = 1
						}
						temp = new Start(id, mouseX, mouseY, name, skills, atts)
						nodes[id] = temp;
						connections[id] = {};
						startID = id;
						id += 1;
						break;
						// END
					}
					let ext = extractName(string)
					temp = new Node(id, mouseX, mouseY, ext[0], ext[1], ext[2])
					nodes[id] = temp;
					connections[id] = {};
					id += 1;
					break;
				}

			case 2: // Add connection of 1
				{
					if (hovered != -1) {
						if (from == -1) {
							from = hovered
						} else {
							to = hovered
							if (to != from) {
								let weight = 1;
								nodes[from].connections[to] = weight;
								nodes[to].connections[from] = weight;
								connections[from][to] = weight;
								connections[to][from] = weight;
							}
							from = -1
						}
					}
					break;
				}

			case 3: // Add other connection
				{
					if (hovered != -1) {
						if (from == -1) {
							from = hovered
						} else {
							to = hovered
							if (to != from) {
								let weight = 1;
								weight = prompt("Weight:")
								if (int(weight) === parseInt(weight, 10)) {
									nodes[from].connections[to] = weight;
									nodes[to].connections[from] = weight;
									connections[from][to] = weight;
									connections[to][from] = weight;
								} else {
									print("Not a valid weight")
								}
							}
							from = -1
						}
					}
					break;
				}

			case 4:
				if (keyIsDown(SHIFT)) {
					startCoords = [mouseX, mouseY]
					endCoords = [mouseX, mouseY]
					//print(startCoord)
				}
				break;

			case 5: // Edit node
				{
					if (hovered != -1) {
						if (gui) {
							gui.destroy()
						}
						let node = nodes[hovered]
						gui = new dat.GUI();
						let name = gui.add(node, 'name').listen();
						if (node instanceof Node) {
							gui.add(node, 'type', ["Skill", "Attribute", "Ultimate", "Blank", "Other"]).listen();
							gui.add(node, 'magnitude');

							name.onFinishChange(function(value) {
								// Fires when a controller loses focus.
								let ext = extractName(value)
								node.name = ext[0]
								node.type = ext[1]
							});
						} else {
							const skills = gui.addFolder("Skills");
							Object.keys(node.skills).forEach((key) => {
								skills.add(node.skills, key);
							});
						
							const attributes = gui.addFolder("Attributes");
							Object.keys(node.attributes).forEach((key) => {
								attributes.add(node.attributes, key);
							});
						}

					}
					break;
				}

			case 6: // Delete connection
				{
					if (hovered != -1) {
						if (from == -1) {
							from = hovered
						} else {
							to = hovered
							if (to != from) {
								delete nodes[from].connections[to]
								delete nodes[to].connections[from]
								delete connections[from][to]
								delete connections[to][from]
							}
							from = -1
						}
					}
					break;
				}

			case 7:
				{
					if (hovered != -1) {
						let tempId = hovered;
						let connected = Object.keys(connections[tempId])
						for (let connection of connected) {
							delete connections[connection][tempId]
						}
						delete connections[tempId]
						if(nodes[tempId].type == "Start"){startID = -1}
						delete nodes[tempId]
					}
					break;
				}
		}
	}
}

function mouseReleased() {
	if (startCoords.length != 0) {
		endCoords = [mouseX, mouseY]
		selected = getSelected(startCoords, endCoords)
		startCoords = []
	}
}

function mouseDragged() {
	switch (mode) {
		case 4:
			if (keyIsDown(SHIFT)) {
				endCoords = [mouseX, mouseY]
			} else {
				if (hovered != -1) {
					hoveredNode = nodes[hovered]
					hoveredNode.x = mouseX;
					hoveredNode.y = mouseY;
				} else {
					if (selected.length != 0) {
						for (let id of selected) {
							let node = nodes[id]
							node.move()
						}
					} else {
						for (let node of Object.values(nodes)) {
							node.move()
						}
					}
				}
			}
	}
}