function keyPressed() {
	selected = []
	let h = gui ? height*10 : 250
	if (Object.keys(modes[version]).includes(key)) {
		mode = int(key)
		from = -1;
		to = -1;
		route = [];
	}
	if (key == "#") {
		saveTree()
	}
	// Exporting Image
	//*
	if (key == "`") {
		let name = prompt("Filename:")
		name = name.replace(/\s/g, "_")
		saveCanvas(name, "jpg")
	}//*/
	
	// Snapping to grid
	if (key == "8") {
		for (let [key, value] of Object.entries(nodes)) {
			// The value here determines how coarse the grid is
			value.snapTo(20*scaleFactor);
		}
	}
	
	// Showing costs
	if (key == "9") {
		calcAlls()
		maxOfEachStat()
		unchanged = true
	}
	
	// Searching and highlighting nodes
	if (keyIsDown(CONTROL) && key == "f") {
		let string = prompt("String:")
		if(string) {
			string = (string).toLowerCase()
			for (let [key, value] of Object.entries(nodes)) {
				if (value.name.toLowerCase().includes(string)) {
					selected.push(key)	
				}
			}
		}
		return false
	}
	return true
}