function mousePressed() {
	startCoord = []
	if (!intersect(width - 125, height/2, 250, height)) {
		switch (version) {
				
			case "build":
				switch (mode) {
					case 1: // Add node
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
										unchanged = false;
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
											unchanged = false;
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
									gui.domElement.parentNode.removeChild(gui.domElement)
									if (gui.node == nodes[hovered].id) { gui = false; return false }
								}
								let node = nodes[hovered]
								loc2.position(node.x, node.y)
								gui = new dat.GUI({autoPlace: false});
								gui.node = node
								let name = gui.add(node, 'name').listen();
								if (node instanceof Node) {
									gui.add(node, 'type', ["Skill", "Attribute", "Ultimate", "Blank", "Other"]).listen();
									gui.add(node, 'magnitude', 0, 8).step(1);
		
									name.onFinishChange(function(value) {
										// Fires when a controller loses focus.
										let ext = extractName(value)
										node.name = ext[0]
										node.type = ext[1]
									});
								} else {
									const skills = gui.addFolder("Skills");
									const attributes = gui.addFolder("Attributes");
									for(let key of Object.keys(node.skills)) {
										skills.add(node.skills, key, 0, 8).step(1)//.listen();
									}
									for(let key of Object.keys(node.attributes)) {
										attributes.add(node.attributes, key, 0, 8).step(1)//.listen();
									}
								}
							loc2.child(gui.domElement)
							} else {
								if (gui && !intersect(gui.node.x+125, gui.node.y+100, 250, 200)) {
									gui.domElement.parentNode.removeChild(gui.domElement)
									gui = false;
									return false
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
										unchanged = false;
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
								unchanged = false;
							}
							break;
						}
				} break;
				
				
				
			case "check":
				switch (mode) {
					case 1: // Shortest distance
						{
							if (hovered != -1) {
								if (from == -1) {
									from = hovered
								} else {
									to = hovered
									if (to != from) {
										[cost, route] = solveToFrom(to, from, true)
									}
									from = -1
								}
							}
							break;
						}
		
					case 2: // All reachable
						{
							if (hovered != -1) {
								from = hovered
							}
							break;
						}
				} break;
		}
	}
}