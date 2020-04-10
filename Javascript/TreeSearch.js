function treeSearch(distance, name) {
    let ids = []
    let costs = {}
    let paths = {}
    let results = solve(connections, from)
    for (let [key, value] of Object.entries(nodes)) {
        if (value.name.toLowerCase().includes(name)) {
            
            ids.push(key)	
        }
    }
   
    solveToFrom
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