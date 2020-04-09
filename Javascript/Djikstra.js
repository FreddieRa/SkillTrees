function solve(graph, s) {
	var solutions = {};
	solutions[s] = [];
	solutions[s].dist = 0;

	while (true) {
		var parent = null;
		var nearest = null;
		var dist = Infinity;

		//for each existing solution
		for (var n in solutions) {
			if (!solutions[n])
				continue
			var ndist = solutions[n].dist;
			var adj = graph[n];
			//for each of its adjacent nodes...
			for (var a in adj) {
				//without a solution already...
				if (solutions[a])
					continue;
				//choose nearest node with lowest *total* cost
				var d = int(adj[a]) + int(ndist);
				if (d < dist) {
					//reference parent
					parent = solutions[n];
					nearest = a;
					dist = d;
				}
			}
		}

		//no more solutions
		if (dist === Infinity) {
			break;
		}

		//extend parent's solution path
		solutions[nearest] = parent.concat(nearest);
		//extend parent's cost
		solutions[nearest].dist = dist;
	}
	/*
	for (var s in solutions) {
		if (!solutions[s]) continue;
		console.log(" -> " + s + ": [" + solutions[s].join(", ") + "]   (dist:" + solutions[s].dist + ")");
	}
	*/
	return solutions;
}