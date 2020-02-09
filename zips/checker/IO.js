function keyPressed() {
	if (Object.keys(modes).includes(key) && !intersect(width - 150, 0, 250, 250)) {
		mode = int(key)
		from = -1;
		to = -1;
		route = [];
	}
	if (key == "#") {
		saveTree()
	}
}

function mousePressed() {
	if (!intersect(width - 150, 0, 250, 250)) {
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
		}
	}
}

function mouseDragged() {
	switch (mode) {
		case 4:
			for (let node of Object.values(nodes)) {
				node.move()
			}
	}
}