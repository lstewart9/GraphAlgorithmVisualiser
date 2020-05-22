var graph
var canvas
var verticiesCoords = []
var verticies = []
var DFSstack = []
var DFSvisited = []
var BFSqueue = []
var BFSvisited= []
var prevNode
var currNode
var prevLinks
var prevAddedNodes = []
var nprevAddedNodes


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
		DFSvisited[start] = true
		var DFSStatus = ""
		verticies[start].set('fill', 'lightgreen');
		canvas.renderAll();

		//add start to prev added nodes list
		nprevAddedNodes = 0
		prevAddedNodes.push(start)


		for (var i = 0; i < this.nVertices; i++) {
			if (this.adjMatrix[start][i] == 1 && !DFSvisited[i] && start!=i) {
				DFSvisited[i] = true;
				DFSstack.push(i);
				DFSStatus+= "- Adding node " + i + " to the stack. <br>";
				nprevAddedNodes++
			}
		}
		document.getElementById("currDFSStatus").innerHTML = DFSStatus;
		currNode = start
		prevNode = null

	}

	iterateDFS() {
		console.log("----before iterate----")
		console.log("prevAddedNodes: "+prevAddedNodes)
		console.log("DFSStack: " +DFSstack)
		console.log("DFSVisited: " + DFSvisited)
		console.log("prevNode: " + prevNode)
		console.log("currNode: " + currNode)

		nprevAddedNodes = 0;
		prevNode = prevAddedNodes[(prevAddedNodes.length-1)]

		var DFSStatus = ""

		if (DFSstack.length == 0 ) {
			DFSStatus = "- Done";
		} else {
			verticies[prevNode].set('fill', 'maroon');
			canvas.renderAll();

			currNode = DFSstack.pop()

			DFSStatus+= "- Popping node " + currNode + " off the stack. <br>";	
			verticies[currNode].set('fill', 'lightgreen');
			canvas.renderAll();
			for (var i = 0; i < this.nVertices; i++) {
				if (this.adjMatrix[currNode][i] == 1 && !DFSvisited[i] && currNode!=i) {
					DFSvisited[i] = true;
					DFSstack.push(i);
					DFSStatus+= "- Adding node " + i + " to the stack <br>";	
					nprevAddedNodes++
				}
			}	
			prevAddedNodes.push(currNode)
		}

		document.getElementById("currDFSStatus").innerHTML = DFSStatus;
		console.log("----after interate----")
		console.log("prevAddedNodes: "+prevAddedNodes)
		console.log("DFSVisited: " + DFSvisited)
		console.log("DFSStack: " +DFSstack)
		console.log("prevNode: " + prevNode)
		console.log("currNode: " + currNode)


	}

	previousDFS() {

		console.log("----before previous----")
		console.log("prevAddedNodes: "+prevAddedNodes)
		console.log("DFSStack: " +DFSstack)
		console.log("DFSVisited: " + DFSvisited)
		console.log("nprevAddedNodes: " + nprevAddedNodes)
		console.log("prevNode: " + prevNode)
		console.log("currNode: " + currNode)

		if (prevAddedNodes.length == 1) {
			//return
		} 

		var DFSStatus = ""

		//get rid of connections added form currNode
		for (var i = 0; i < nprevAddedNodes; i++) {
			var removedNode = DFSstack.pop()
			DFSvisited[removedNode] = false
			DFSStatus+= "- Removing node " + removedNode + " from the stack<br>";	
		}	
		
		//don't need as since it is from on the stack it should be true
		//DFSvisited[currNode] = false

		//must set visited[i] = false where i is only reachable via currNode
		//could go through stack and sett all reachable nodes to true
		


		if (!DFSstack.includes(currNode)) {
			DFSStatus+= "- Adding node " + currNode + " back onto the stack <br>";	
			console.log("-- Adding node " + currNode + " back onto the stack")
			DFSstack.push(currNode)
		}

		//adjusting colours
		verticies[currNode].set('fill', 'lightslategray');
		verticies[prevNode].set('fill', 'lightgreen');
		canvas.renderAll()

		//updating prevNode
		document.getElementById("currDFSStatus").innerHTML = DFSStatus;

		
		//update prevAddedNodes list
		prevAddedNodes.pop()

		prevNode = prevAddedNodes[prevAddedNodes.length-2]
		currNode = prevAddedNodes[prevAddedNodes.length-1]
		
	
		nprevAddedNodes = 0

		console.log("----after previous----")
		console.log("prevAddedNodes: "+prevAddedNodes)
		console.log("DFSStack: " +DFSstack)
		console.log("DFSVisited: " + DFSvisited)
		console.log("nprevAddedNodes: " + nprevAddedNodes)
		console.log("prevNode: " + prevNode)
		console.log("currNode: " + currNode)

	}

	startBFS(start) {
		BFSvisited[start] = true
		prevNode=start
		var BFSStatus = ""

		verticies[start].set('fill', 'lightgreen');
		canvas.renderAll();

		for (var i = 0; i < this.nVertices; i++) {
			if (this.adjMatrix[start][i] == 1 && !BFSvisited[i] && start!=i) {
				BFSvisited[i] = true;
				BFSqueue.push(i);
				BFSStatus+= "- Adding node " + i + " to the queue. <br>";
			}
		}
		document.getElementById("currBFSStatus").innerHTML = BFSStatus;
	}

	iterateBFS() {

		var BFSStatus = ""

		if (BFSqueue.length == 0 ) {
			BFSStatus = "- Done";
		} else {
			verticies[prevNode].set('fill', 'maroon');
			canvas.renderAll();
			var node = BFSqueue.shift()
			BFSStatus+= "- Removing node " + node + " off the queue. <br>";	
			verticies[node].set('fill', 'lightgreen');
			canvas.renderAll();
			console.log("Removing node " + node + " from the queue...");
			for (var i = 0; i < this.nVertices; i++) {
				if (this.adjMatrix[node][i] == 1 && !BFSvisited[i] && node!=i) {
					BFSvisited[i] = true;
					BFSqueue.push(i);
					BFSStatus+= "- Adding node " + i + " to the queue";	
				}
			}	
			prevNode=node
		}

		document.getElementById("currBFSStatus").innerHTML = BFSStatus;
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





function clearGraph() {
	canvas.clear()
	//clear all lists
	DFSstack=[]
	DFSvisited=[]
	BFSqueue=[]
	BFSvisited=[]
}