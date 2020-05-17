var graph
var canvas
var verticiesCoords = []
var verticies = []
var DFSstack = []
var visited = []
var prevNode


$(document).ready(function() {
	canvas = new fabric.Canvas('myCanvas');

	
	canvas.on('mouse:over', function(e) {
		if (e.target) {
			if(e.target._objects) {
				// is circle
				e = e.target._objects[0]
				e.set('fill', 'lightgrey');
			} 	
			canvas.renderAll();
		}
	});

	canvas.on('mouse:out', function(e) {
		if (e.target) {
			if(e.target._objects) {
				// is circle
				e = e.target._objects[0]
				e.set('fill', 'lightslategray');
			} 	
			canvas.renderAll();
		}
	});
})

function randomNumber(max, min) {
	return Math.floor(Math.random() * (max - min) + min);
}

function generateGraph() {
	console.log("Generating Graph...");

	// generate random number of verticies
	var nVerticies = randomNumber(2,6)
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
		}
		for (var i=0; i < nVertices; i++) {
			for (var j=0; j <= i; j++) {
				this.adjMatrix[i][j] = randomNumber(0,2);
				this.adjMatrix[j][i] = this.adjMatrix[i][j]
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

	startDFS(start) {
		//DFSstack.unshift(start)
		visited[start] = true
		prevNode=start

		var DFSStatus = ""

		for (var i = 0; i < this.nVertices; i++) {
			if (this.adjMatrix[start][i] == 1 && !visited[i] && start!=i) {
				visited[i] = true;
				DFSstack.unshift(i);
				DFSStatus+= "- Adding node " + i + " to the stack. <br>";
			}
		}
		document.getElementById("currDFSStatus").innerHTML = DFSStatus;
	}

	iterateDFS() {

		var DFSStatus = ""

		if (DFSstack.length == 0 ) {
			DFSStatus = "- Done";
		} else {
			verticies[prevNode].set('fill', 'maroon');
			canvas.renderAll();
			var node = DFSstack.pop()
			DFSStatus+= "- Popping node " + node + " off the stack. <br>";	
			verticies[node].set('fill', 'lightgreen');
			canvas.renderAll();
			console.log("Removing node " + node + " from the stack...");
			for (var i = 0; i < this.nVertices; i++) {
				if (this.adjMatrix[node][i] == 1 && !visited[i] && node!=i) {
					visited[i] = true;
					DFSstack.unshift(i);
					DFSStatus+= "- Adding node " + i + " to the stack";	
				}
			}	
			prevNode=node
		}

		document.getElementById("currDFSStatus").innerHTML = DFSStatus;

	}

	printGraph() { 
		var print = " "

		for (var j=0; j < this.nVertices; j++) {
			print = print + '   ' + j
		}
		print = print + ' <-j'
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

		var x = 30
		var y = 30
		for (var i=0; i < this.nVertices; i++) {
			var circle = new fabric.Circle({
				originX: 'center',
  				originY: 'center',
				radius : 60,
				fill: 'lightslategray',
				hasBorders : true,
				borderColor: "black",
				selectionBackgroundColor :"blue",
			});
			
			verticies.push(circle)

			var text = new fabric.Text("v" + i.toString(), {
				fontSize: 30,
				originX: 'center',
  				originY: 'center'
			});

			if ( i%2 == 1 ) {
				y+=100
			}

			var group = new fabric.Group([ circle, text ], {
			left: x,
			top: y,
			hoverCursor: 'default',
			selectable: false,
			hasControls: false,
			});

			canvas.add(group);
			
			var vertex = {
				x: x,
				y: y
			}
			verticiesCoords.push(vertex)

			if ( i%2 == 1 ) {
				y-=100
			}

			x+=350
			if (x > 1050) {
				x = 30
				y+=300
			}
		}
	//console.log(verticies);
	this.printLinks()
	} 
	  
	printLinks() {
		
		for (var i=0; i < this.nVertices; i++) {
			for (var j=0; j <= i; j++) {
				if (this.adjMatrix[i][j] == 1 && i!=j) {
					createLine([verticiesCoords[i].x+60, verticiesCoords[i].y+60, verticiesCoords[j].x+60, verticiesCoords[j].y+60])
				}
			}
		}

	}
}

function createLine(points) {
	var line = new fabric.Line(points, {
	  strokeWidth: 5,
	  stroke: '#7db9e8',
	  originX: 'center',
	  originY: 'center',
	  hasControls: false,
	  hasBorders: false,
	  hasRotatingPoint: false,
	  hoverCursor: 'default',
	  selectable: false
	});
	
	canvas.add(line);
	line.sendToBack()
	canvas.renderAll();
}



function beginDFS() {
	var form = $('#startVertexForm')[0].elements
	start = parseInt(form[0].value)
	console.log(start)
	graph.startDFS(start)
	var currDFSStack = ""
	for (var i = DFSstack.length; i > 0; i--) {
		currDFSStack += DFSstack[i-1] + "<br>" + "---" + "<br>"
	}
	document.getElementById("currDFSStack").innerHTML = currDFSStack
}

function iterateDFS() {
	graph.iterateDFS()
	var currDFSStack = ""
	for (var i = DFSstack.length; i > 0; i--) {
		currDFSStack += DFSstack[i-1] + "<br>" + "---" + "<br>"
	}
	document.getElementById("currDFSStack").innerHTML = currDFSStack
}

function clearGraph() {
	canvas.clear()
}