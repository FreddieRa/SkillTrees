function mouseDragged() {
	switch (mode) {
		case 4:
			if (version == "check"){
				for (let node of Object.values(nodes)) {
					node.move()
				}
				return
			}
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



function mouseReleased() {
	if (startCoords.length != 0) {
		endCoords = [mouseX, mouseY]
		selected = getSelected(startCoords, endCoords)
		startCoords = []
	}
}