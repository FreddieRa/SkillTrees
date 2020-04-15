function treeSearch() {
    let problems = [];
    let costs = {};
    let mod = 0
    for (let item of Object.values(skillTable)) {
        mod = item in nodes[startID].skills ? nodes[startID].skills[item] : 0
        costs[item] = {1: (4-mod), 2: 2, 3: 2, 4: 2};
    }
    for (let item of Object.values(attTable)) {
        mod = item in nodes[startID].attributes ? nodes[startID].attributes[item] : 0
        costs[item] = {1: (4-mod), 2: 2, 3: 2, 4: 2};
    }
    // STILL NEED TO FIND OUT IF THIS IS FROM ORIGIN OR FROM OTHER NODES
    // let results = solve(connections, startID)
    let results = connections
    for (let [key, value] of Object.entries(nodes)) {
        if (["Skill", "Attribute"].includes(value.type)) {
            let name = value.name
            //let cost = results[key].dist
            let cost = min(Object.values(results[key]))
            if (cost in costs[name] && costs[name][cost] > 0) {
                costs[name][cost] = costs[name][cost] - 1
            } else {
                print("Too many of cost: " + cost + " for " + value.name)
                problems.push(value.name)
            }
        }
    }
    for (problem of problems) {
        highlight(problem)
    }
}

/*
function treeSearch(distance, nodes) {
    let poss = [];
    let visited = [];
    let current = [];
    
    for(let [key, value] of Object.entries(nodes[startID])) {

        if(value == distance) {
            
        }
    }

    return [poss, visited];
}
// */

/*
function randomPath(distance, visited) {
    if (distance == 0){return visited}
    let leaves = JSON.parse(JSON.stringify(visited))
    let foundNext = false;
    while (!foundNext && leaves.length != 0) {
        let from = random(leaves)
        let nodeID = -1
        let fromLeaves = JSON.parse(JSON.stringify(Object.keys(connections[from])))
        while (fromLeaves.length != 0) {
            nodeID = random(fromLeaves)
            // STILL NEED TO CHECK DISTANCE
            if (!(nodeID in connections[from])) {

            }
        }
    }
}
// */