// Basic rectangle intersection function
function intersect(x, y, w, h) {
	let inX = (x - w / 2 <= mouseX && mouseX <= x + w / 2)
	let inY = (y - h / 2 <= mouseY && mouseY <= y + h / 2)
	return (inX && inY)
}

function orphanCheck() {
	let orphans = []
	for (let [key, value] of Object.entries(nodes)) {
		if (Object.keys(connections[value.id]).length === 0) {
			orphans.push(value.id)
		}
	}
	print(orphans)
}

function solveToFrom(to, from, show = false) {
	let result = solve(connections, from)[to]
	let cost = result.dist
	let route = [from].concat(result)
	if (show) {
		let str1 = "Cost: " + cost + " Route: " + route
		print(str1)
		consoleContents.push(str1)
	}
	return [cost, route]
}

function calcUlts(show = true) {
	route = [];
	let costs = {};
	for (let [key, value] of Object.entries(nodes)) {
		if (value.type == "Ultimate") {
			route.push(key)
			if(show){
				let str1 = "ID: " + value.id + " Name: " + value.name
				print(str1)
				consoleContents.push(str1)
			}
			let cost = solveToFrom(key, startID, show)[0]
			costs[value.name] = cost
		}
	}
	return costs
}

function calcLinks() {
	// {"109":{"108":"2","110":"2","114":"2"}}
	let links = {}
	for (let [from, connecs] of Object.entries(connections)) {
		for (let [to, weight] of Object.entries(connecs)) {
			if(weight in links) {
				links[weight] += 0.5
			} else {
				links[weight] = 0.5
			}
		}
	}
	print(links)
	consoleContents.push(links)
}

function calcAlls() {
	let maximum = getMaxCost();
	let results = {}
	for (let [key, value] of Object.entries(nodes)) {
		let cost = solveToFrom(key, startID, false)[0]
		value.cost = cost;
		value.costColour = lerpColor(color("#10eb2e"), color("#e61c0e"), cost / maximum)
		results[value.id] = {"name": value.name, "cost": cost}
	}
	consoleContents.push(results)
}

function getMaxCost() {
	let solutions = solve(connections, startID);
	let distArray = []
	for (var s in solutions) {
		distArray.push(solutions[s].dist)
	}
	print("getMaxCost")
	return max(distArray)
}

function average(array) {
	let total = 0;
	let avg = 0;
	for(let item of array){total += item}
	if(array.length){avg = total / array.length}
	return avg
}

function skillAndAtt(cost = costToUse, show = true) {
	// Clear route, used later
	route = [];

	let solutions = solve(connections, startID);
	// Arrays storing the total number of skills/atts aquired along a path
	let skills = [];
	let atts = [];

	for (let [key, sol] of Object.entries(solutions)) {
		if (sol.dist == cost) {
			route.push(key)
			let skillNum = 0;
			let attNum = 0;

			for (let step of sol) {
				skillNum += int(nodes[step].type == "Skill");
				attNum += int(nodes[step].type == "Attribute");
			}
			skills.push(skillNum);
			atts.push(attNum);
		}
	}
	let sAvg = average(skills);
	let aAvg = average(atts);
	if (show) {
		let str1 = "Skill Average: " + sAvg + " Skills: " + skills
		let str2 = "Atttribute Average: " + aAvg + " Attributes: " + atts
		consoleContents.push(str1)
		consoleContents.push(str2)
		print(str1)
		print(str2)
	}
	return {"Skills": sAvg, "Attributes": aAvg}
}

function getCSV() {
	let table = new p5.Table();
	
	table.addColumn('Cost');
	table.addColumn('Average number of skills')
	table.addColumn('Average number of attributes')
	
	
	let maxCost = getMaxCost();
	let distToUlts = calcUlts(false);
	
	let maxSkill = 0;
	let maxAtt = 0;
	
	let averages = {}
	
	for(let i = 0; i < maxCost+1; i++) {
		let result = skillAndAtt(i, false)
		let avgSkills = result.Skills
		let avgAtts = result.Attributes
		maxSkill = avgSkills > maxSkill ? avgSkills : maxSkill
		maxAtt = avgAtts > maxAtt ? avgAtts : maxAtt
		let tempObj = {"Skills": maxSkill, "Attributes": maxAtt}
		averages[i] = tempObj
	}
	
	for(let n in averages){
		let temp = table.addRow();
		temp.setNum('Cost', n)
		temp.setNum('Average number of skills', averages[n].Skills)
		temp.setNum('Average number of attributes', averages[n].Attributes)
	}
	
	let name = nodes[startID].name.replace(/\s/g, "_")
	saveTable(table, `${name}_Table.txt`)
	
	print(distToUlts)
	print(averages)
}

function maxOfEachStat(show = true) {
	let statDict = {}
	let stats = Object.values(Object.assign({}, skillTable, attTable)) 
	// for(let att of Object.values(attTable)){stats[att] = 1}
	if (startID != undefined && startID != -1) {
		let start = nodes[startID]
		print(start)
		for(let [skill, mag] of Object.entries(start.skills)) {statDict[skill] = int(mag);}
		for(let [att, mag] of Object.entries(start.attributes)) {statDict[att] = int(mag);}
	}
	for (let [key, value] of Object.entries(nodes)) {
		if (key != startID) {
			if (stats.includes(value.name)) {
				if(value.name in statDict) {
					statDict[value.name] += int(value.magnitude);
				} else {
					statDict[value.name] = int(value.magnitude);
				}
			}
		}
	}
	print(statDict)
	for(let [name, value] of Object.entries(statDict)) {
		if (value > 8) {
			print("WARNING VALUE GREATER THAN 8 FOUND: " + name)
		}
	}
}


function dumpConsole() {
	let array = consoleContents.map(x => JSON.stringify(x))
	//let contents = array.join('\n')
	saveStrings(array, 'console.txt');
}


















//