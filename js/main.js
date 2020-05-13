var graph

$(document).ready(function() {

	

})

function generateGraph() {
	console.log("Generating Graph...");

	// generate random number of verticies
	var max = 15;
	var min = 2;
	var nVerticies = Math.floor(Math.random() * (max - min + 1) + min);
	graph = new Graph(nVerticies);
	console.log(nVerticies)

	
	for (var i = 0; i < nVerticies; i++) {
		graph.addVertex();
	}

	graph.printGraph();

}

class Graph {

	constructor(nVertices) {
		this.nVertices=nVertices;
		this.adjMatrix = [];
		for (var i=0; i < nVertices; i++) {
			this.adjMatrix[i] = [];
			for (var j=0; j < nVertices; j++) {
				this.adjMatrix[i][j] = 0;
			}
		}
	}

	addVertex(v) { 
    // initialize the adjacent list with a 
    // null array 
    
	}

	// add edge to the graph 
	addEdge(v, w) { 
		// get the list for vertex v and put the 
		// vertex w denoting edge between v and w 
		this.AdjList.get(v).push(w); 
	
		// Since graph is undirected, 
		// add an edge from w to v also 
		//this.AdjList.get(w).push(v); 
	} 

	printGraph() { 
		var print = " "

		for (var j=0; j < this.nVertices; j++) {
			print = print + '   ' + j
		}
		print = print + '\n'
		for (var j=0; j < this.nVertices+2; j++) {
			print = print + '---'
		}
		print = print + '\n'
		for (var i=0; i < this.nVertices; i++) {
			print=print + i
			for (var j=0; j < this.nVertices; j++) {
				print = print + ' | ' + this.adjMatrix[i][j];
			}
			print = print + '\n'
		}
		console.log(print)

		var c = document.getElementById("myCanvas")
		var ctx = c.getContext("2d")
		var x = 50
		var y = 50
		ctx.font = "30px Verdana";
		for (var i=0; i < this.nVertices; i++) {
			ctx.beginPath()
			ctx.arc(x, y, 40, 0, 2 * Math.PI);
			ctx.stroke();
			if (i < 10) {
				ctx.fillText(i, x-10, y+10);
			} else {
				ctx.fillText(i, x-20, y+10);
			}
			x+=150
			if (x > 1000) {
				x = 50
				y+=125
			}
		}

	
	} 
}