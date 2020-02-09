// Basic rectangle intersection function
function intersect(x, y, w, h) {
	let inX = between(mouseX, (x - w / 2), (x + w / 2))
	let inY = between(mouseY, (y - h / 2), (y + h / 2))
	return (inX && inY)
}

function addConnection(to, from, weight = 1, type = "Normal") {
	if (to != from) {
		let weight = 1;
		nodes[from].connections[to] = weight;
		nodes[to].connections[from] = weight;
		connections[from][to] = weight;
		connections[to][from] = weight;
	}
	from = -1
}

function extractName(string) {
	let split = string.split(",").map(x => x.trim());
	let name = split[0].toUpperCase();
	if (name in skillTable || name in attTable) {
		let title = "";
		let type = "";
		let mag = 1;

		if (name in skillTable) {
			title = skillTable[name];
			type = "Skill"
		} else {
			title = attTable[name];
			type = "Attribute"
		}

		if (split.length == 2) {
			mag = split[1]
		}

		return [title, type, mag]
		//temp = new Node(id, mouseX, mouseY, title, type, mag)
	} else if (name == "ULT") {
		return [split[1], "Ultimate", 0]
		//temp = new Node(id, mouseX, mouseY, split[1], "Ultimate", 0)
	} else if (name == "BLANK") {
		return ["", "Blank", 0]
		//temp = new Node(id, mouseX, mouseY, "", "Blank", 0)
	} else {
		return [split[0], "Other", 0]
		//temp = new Node(id, mouseX, mouseY, split[0], "Other", 0)
	}
}

function getSelected(coord1, coord2) {
	let sel = []
	for (let [key, value] of Object.entries(nodes)) {
		if (between(value.x, coord1[0], coord2[0]) && between(value.y, coord1[1], coord2[1])) {
			sel.push(key)
		}
	}
	return sel
}

function between(x, a, b) {
	let betA = min(a, b) <= x;
	let betB = x <= max(a, b);
	return (betA && betB)
}




















//