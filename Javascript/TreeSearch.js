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
    let results = connections
    for (let [key, value] of Object.entries(nodes)) {
        if (value.name in costs) {
            let name = value.name
            //let cost = results[key].dist
            let cost = min(Object.values(results[key]))

            if (cost in costs[name] && costs[name][cost] > 0) {
                costs[name][cost] = costs[name][cost] - 1
            } else {
                if (cost != 0) {
                    let str = "Too many of cost: " + cost + " for " + value.name
                    consoleContents.push(str)
                    print(str)
                    problems.push(value.name)
                }
            }
        }
    }

    let few = false
    for (let item of Object.values(Object.assign({}, skillTable, attTable))) {
        for (let [cost, value] of Object.entries(costs[item])) {
            if (value > 0) {
                let str = "Too few of cost: " + cost + " for " + item
                consoleContents.push(str)
                print(str)
                few = true
            }
        }
    }

    if (problems.length != 0) {
        for (problem of problems) {
            highlight(problem)
        }
    } else {
        if (!few) {
            print("All okay!")
        }
    }
}

function getXinY(number, stat, cons = connections) {
    let result = solve(cons, startID)
    let costs = {}
    let routes = {}
    for(let [key, value] of Object.entries(nodes)) {
        if (value.name == stat) {
            let temp = result[key]
            let cost = temp.dist
            let route = [from].concat(temp)
            costs[cost] = key
            routes[key] = route
        }
    }
}