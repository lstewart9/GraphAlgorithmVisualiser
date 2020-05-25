var graph
var canvas


$(document).ready(function() {
	document.getElementById("canvasDiv").hidden = false
	canvas = new fabric.Canvas('myCanvas');
	canvas.setHeight(592)
	canvas.setWidth(920)
	canvas.renderAll()
	
	
	canvas.on('mouse:over', function(e) {
		if (e.target) {
			if(e.target._objects) {
				// is circle
				e = e.target._objects[0]
				e.set('stroke', 'lightgrey');
			} 	
			canvas.renderAll();
		}
	});

	canvas.on('mouse:out', function(e) {
		if (e.target) {
			if(e.target._objects) {
				// is circle
				e = e.target._objects[0]
				e.set('stroke', 'black');
			} 	
			canvas.renderAll();
		}
	});
})

function randomNumber(max, min) {
	return Math.floor(Math.random() * (max - min) + min);
}

function showDFSDetails() {
	document.getElementById("DFSdetails").hidden = false
}

function closeBFSDetails() {
	document.getElementById("BFSdetails").hidden = true
}

function showBFSDetails() {
	document.getElementById("BFSdetails").hidden = false
}

function closeDFSDetails() {
	document.getElementById("DFSdetails").hidden = true
}

function generateGraph() {
	console.log("Generating Graph...");

	clearGraph()

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
		this.verticiesCoords = []
		this.verticies = []
		this.DFSstack = []
		this.BFSqueue = []
		this.visited= []
		this.prevNode = null
		this.currNode = null
		//node: number of not already nodes added
		this.prevAddedNodes = []
		this.prevAddedNodesOrder = []
		this.startNode = null
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
		this.visited[start] = true
		var DFSStatus = ""

		this.startNode = start

		//add start node to order list
		this.prevAddedNodesOrder.push(start)
		this.prevAddedNodes[start] = 0;

		this.verticies[start].set('fill', 'lightgreen');
		canvas.renderAll();

		for (var i = 0; i < this.nVertices; i++) {
			if (this.adjMatrix[start][i] == 1 && !this.visited[i] && start!=i) {
				this.visited[i] = true;
				this.DFSstack.push(i);
				DFSStatus+= "- Adding node " + i + " to the stack. <br>";
				this.prevAddedNodes[start]++;
			}
		}
		document.getElementById("currDFSStatus").innerHTML = DFSStatus;
	}

	iterateDFS() {

		var DFSStatus = ""

		if (this.DFSstack.length == 0 ) {
			DFSStatus = "- Done";
		} else {

			this.prevNode = this.prevAddedNodesOrder[this.prevAddedNodesOrder.length-1]

			this.verticies[this.prevNode].set('fill', 'maroon');
			canvas.renderAll();

			this.currNode = this.DFSstack.pop()
			DFSStatus+= "- Popping node " + this.currNode + " off the stack. <br>";	
			this.verticies[this.currNode].set('fill', 'lightgreen');
			canvas.renderAll();

			this.prevAddedNodesOrder.push(this.currNode)
			this.prevAddedNodes[this.currNode] = 0;

			for (var i = 0; i < this.nVertices; i++) {
				if (this.adjMatrix[this.currNode][i] == 1 && !this.visited[i] && this.currNode!=i) {
					this.visited[i] = true;
					this.DFSstack.push(i);
					DFSStatus+= "- Adding node " + i + " to the stack <br>";	
					this.prevAddedNodes[this.currNode]++;
				}
			}	
		}
		document.getElementById("currDFSStatus").innerHTML = DFSStatus;
	}

	previousDFS() {

		if (this.prevAddedNodesOrder.length == 1) {
			console.log("start node reached -----")
			return 
		}

		var DFSStatus=""

		for (var i = 0; i < this.prevAddedNodes[this.currNode]; i++) {
			var removedNode = this.DFSstack.pop()
			this.visited[removedNode] = false
			DFSStatus+= "- Removing node " + removedNode + " from the stack<br>";	
		}	
		//adding currNode back onto end of stack
		this.DFSstack.push(this.currNode)
		DFSStatus+= "- Adding node " + this.currNode + " back onto the stack<br>";	

		document.getElementById("currDFSStatus").innerHTML = DFSStatus;
		this.prevAddedNodes[this.currNode] = 0;

		//adjusting colours
		this.verticies[this.currNode].set('fill', 'lightslategray');
		this.verticies[this.prevNode].set('fill', 'lightgreen');
		canvas.renderAll()

		//updating prevNode
		this.prevAddedNodesOrder.pop()
		this.prevNode = this.prevAddedNodesOrder[this.prevAddedNodesOrder.length-2]
		this.currNode = this.prevAddedNodesOrder[this.prevAddedNodesOrder.length-1]

	}

	startBFS(start) {
		this.visited[start] = true

		this.startNode = start

		var BFSStatus = ""

		//add start node to order list
		this.prevAddedNodesOrder.push(start)
		//set number of nodes added to 0
		this.prevAddedNodes[start] = 0;

		this.verticies[start].set('fill', 'lightgreen');
		canvas.renderAll();
	

		for (var i = 0; i < this.nVertices; i++) {
			if (this.adjMatrix[start][i] == 1 && !this.visited[i] && start!=i) {
				this.visited[i] = true;
				this.BFSqueue.push(i);
				BFSStatus+= "- Adding node " + i + " to the queue. <br>";
				this.prevAddedNodes[start]++;
			}
		}
		document.getElementById("currBFSStatus").innerHTML = BFSStatus;
	}

	iterateBFS() {

		var BFSStatus = ""

		if (this.BFSqueue.length == 0 ) {
			BFSStatus = "- Done";
		} else {

			this.prevNode = this.prevAddedNodesOrder[this.prevAddedNodesOrder.length-1]

			this.verticies[this.prevNode].set('fill', 'maroon');
			canvas.renderAll();

			this.currNode = this.BFSqueue.shift()
			BFSStatus+= "- Removing node " + this.currNode + " off the queue. <br>";	
			this.verticies[this.currNode].set('fill', 'lightgreen');
			canvas.renderAll();

			this.prevAddedNodesOrder.push(this.currNode)
			this.prevAddedNodes[this.currNode] = 0;
			
			console.log("Removing node " + currNode + " from the queue...");
			for (var i = 0; i < this.nVertices; i++) {
				if (this.adjMatrix[this.currNode][i] == 1 && !this.visited[i] && this.currNode!=i) {
					this.visited[i] = true;
					this.BFSqueue.push(i);
					BFSStatus+= "- Adding node " + i + " to the queue";	
					this.prevAddedNodes[this.currNode]++;
				}
			}	
			
		}

		document.getElementById("currBFSStatus").innerHTML = BFSStatus;

	}

	previousBFS() {

		if (this.prevAddedNodesOrder.length == 1) {
			console.log("star node reached -----")
			return 
		}

		var BFSStatus=""

		for (var i = 0; i < this.prevAddedNodes[this.currNode]; i++) {
			var removedNode = this.BFSqueue.pop()
			this.visited[removedNode] = false
			BFSStatus+= "- Removing node " + removedNode + " from the queue<br>";	
		}	
		//adding currNode back onto beginning of queue
		this.BFSqueue.unshift(this.currNode)
		BFSStatus+= "- Adding node " + this.currNode + " back onto the queue<br>";	

		document.getElementById("currBFSStatus").innerHTML = BFSStatus;
		this.prevAddedNodes[this.currNode] = 0;

		//adjusting colours
		this.verticies[this.currNode].set('fill', 'lightslategray');
		this.verticies[this.prevNode].set('fill', 'lightgreen');
		canvas.renderAll()

		//updating prevNode
		this.prevAddedNodesOrder.pop()
		this.prevNode = this,prevAddedNodesOrder[this.prevAddedNodesOrder.length-2]
		this.currNode = this.prevAddedNodesOrder[this.prevAddedNodesOrder.length-1]

	}

	restartAlgorithms() {
		this.visited = []
		this.DFSstack = []
		this.BFSqueue = []
		this.currNode = null
		this.prevNode = null
		this.prevAddedNodes = []
		this.prevAddedNodesOrder = []
		this.startNode = null
	}

	restartDFS() {
		this.DFSstack=[]
		this.visited=[]
		this.prevAddedNodes = []
		this.prevAddedNodesOrder = []
		for (var i = 0; i <this.verticies.length; i++) {
			this.verticies[i].set('fill', 'lightslategray');
		}
		canvas.renderAll()
		this.startDFS(startNode)
	}
	
	
	restartBFS() {
		this.BFSqueue=[]
		this.visited=[]
		this.prevAddedNodes = []
		this.prevAddedNodesOrder = []
		for (var i = 0; i <this.verticies.length; i++) {
			this.verticies[i].set('fill', 'lightslategray');
		}
		canvas.renderAll()
		this.startBFS(startNode)
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
				strokeWidth: 2,
  				stroke: "black",
			});
			
			this.verticies.push(circle)

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
			this.verticiesCoords.push(vertex)

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
					createLine([this.verticiesCoords[i].x+60, this.verticiesCoords[i].y+60, this.verticiesCoords[j].x+60, this.verticiesCoords[j].y+60])
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
	//get rid of previous algorithm details first
	restartAlgorithms()
	showDFSDetails()
	var form = $('#DFSstartVertexForm')[0].elements
	start = parseInt(form[0].value)
	console.log(start)
	graph.startDFS(start)
	var currDFSStack = ""
	for (var i = 0; i < DFSstack.length; i++) {
		currDFSStack += DFSstack[i] + "<br>" + "---" + "<br>"
	}
	document.getElementById("currDFSStack").innerHTML = currDFSStack
}

function iterateDFS() {
	graph.iterateDFS()
	var currDFSStack = ""
	for (var i = 0; i < DFSstack.length; i++) {
		currDFSStack += DFSstack[i] + "<br>" + "---" + "<br>"
	}
	document.getElementById("currDFSStack").innerHTML = currDFSStack
}

function previousDFS() {
	graph.previousDFS()
	var currDFSStack = ""
	for (var i = 0; i < DFSstack.length; i++) {
		currDFSStack += DFSstack[i] + "<br>" + "---" + "<br>"
	}
	document.getElementById("currDFSStack").innerHTML = currDFSStack
}

function beginBFS() {
	restartAlgorithms()
	showBFSDetails()
	var form = $('#BFSstartVertexForm')[0].elements
	start = parseInt(form[0].value)
	console.log(start)
	graph.startBFS(start)
	var currBFSqueue = ""
	for (var i = 0; i < BFSqueue.length; i++) {
		currBFSqueue += BFSqueue[i] + "<br>" + "---" + "<br>"
	}
	document.getElementById("currBFSqueue").innerHTML = currBFSqueue
}

function iterateBFS() {
	graph.iterateBFS()
	var currBFSqueue = ""
	for (var i = 0; i < BFSqueue.length; i++) {
		currBFSqueue += BFSqueue[i] + "<br>" + "---" + "<br>"
	}
	document.getElementById("currBFSqueue").innerHTML = currBFSqueue
}

function previousBFS() {
	graph.previousBFS()
	var currBFSqueue = ""
	for (var i = 0; i < BFSqueue.length; i++) {
		currBFSqueue += BFSqueue[i] + "<br>" + "---" + "<br>"
	}
	document.getElementById("currBFSqueue").innerHTML = currBFSqueue
}



function clearGraph() {
	canvas.clear()
	//clear all lists
	DFSstack=[]
	visited=[]
	BFSqueue=[]
	closeBFSDetails()
	closeDFSDetails() 
	verticiesCoords = []
  	verticies = []
}

function restartAlgorithms() {
	closeDFSDetails()
	closeDFSDetails()
	canvas.renderAll()

	//reset variables
	graph.restartAlgorithms()
}

function restartDFS() {
	graph.restartDFS()
}

function restartBFS() {
	graph.restartBFS()
}