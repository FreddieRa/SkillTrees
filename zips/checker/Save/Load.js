function saveTree() {
	let name = ""
	let newNodes = {}
	for (let [key, value] of Object.entries(nodes)) {
			newNodes[key] = simplifyNode(value)
	}
	let string = `[${JSON.stringify(newNodes)}, ${JSON.stringify(connections)}, ${str(id)}, ${scaleFactor}, ${startID}]`
	if (startID != -1) {
		name = nodes[startID].name
	} else if(0 in nodes){
		name = nodes[0].name
	} else {
		name = prompt("Filename:")
	}
	name = name.replace(/\s/g, "_")
	saveStrings([string], `${name}.txt`)
}

function simplifyNode(node) {
	let temp = {}
	let copy = node.type == "Start" ? toCopyStart : toCopyNode
	for(let item of copy){
		temp[item] = node[item]
	}
	return temp;
}

function loadTree(file) {
	let string = file.data.replace(/(\r\n|\n|\r)/gm, "");
	let loaded = eval(string)
	startID = loaded[4];
	
	nodes = {}
	for (let [key, val] of Object.entries(loaded[0])) {
		if(key != startID) {
			let temp = new Node(...toCopyNode.map(x => val[x]))
			nodes[val.id] = temp
		} else {
			let temp = new Start(...toCopyStart.map(x => val[x]))
			nodes[val.id] = temp
		}
	}
	connections = loaded[1]

	id = loaded[2];
	
	scaleFactor = loaded[3];
	
	

}