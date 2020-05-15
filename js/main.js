var graph
var canvas
var verticiesCoords = []
var verticies = []


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
	var nVerticies = randomNumber(2,10)
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

	DFS(start, visited) {
		visited[start] = true;
		console.log("======")
		for (var i = 0; i < this.nVertices; i++) {
			if (this.adjMatrix[start][i] == 1 && visited[i] != true) {
				verticies[i].set('fill', 'lightgreen');
				console.log(i)
				console.log(verticies[i])
				setTimeout(() => { verticies[i].set('fill', 'lightslategray'); }, 2000);
				setTimeout(() => { this.DFS(i, visited); }, 4000);
			} 
		}

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
				selectionBackgroundColor :"blue"

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

			x+=200
			if (x > 1000) {
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
	/*
	var headLength = 15,
  
		x1 = points[0],
		y1 = points[1],
		x2 = points[2],
		y2 = points[3],
  
		dx = x2 - x1,
		dy = y2 - y1,
  
		angle = Math.atan2(dy, dx);
  
	angle *= 180 / Math.PI;
	angle += 90;
	
	
	var triangle = new fabric.Triangle({
	  angle: angle,
	  fill: '#207cca',
	  top: y2,
	  left: x2,
	  height: headLength,
	  width: headLength,
	  originX: 'center',
	  originY: 'center',
	  selectable: false
	});
	*/
	canvas.add(line);
	line.sendToBack()
	canvas.renderAll();
}

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

function beginDFS() {
	var form = $('#startVertexForm')[0].elements
	start = parseInt(form[0].value)
	console.log(start)
	graph.DFS(start, [])
}