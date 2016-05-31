////initial counter for inputs
var inputID=0;
var repType="short";


////add minimum 2 inputs on start
window.onload=newLoad(2);


/////general function for adding any number of inputs
function newLoad(count){
	for(var i=0;i<count;i++){
		addInput();
	}
}

//////function for adding each input
function addInput(){
	d3.select("#sumInputs")
	.append("input")
    .attr("type", "text")
    .attr("class", "inputs")
    .attr("placeholder",'input'+(inputID+1))
    .attr("id", 'input'+inputID)
	console.log("new input added");
	inputID++;

}


/////updating the log
function printResults(In,Out){
	// console.log("Out is "+Out);
	In=JSON.stringify(In);
	In=In.substring(1,In.length-1);
	console.log(In);
	var OutText=JSON.stringify(Out);
	OutText=OutText.substring(1,OutText.length-1);


	document.getElementById("sumResults").innerHTML = "<p>Replication Result:<br>"+OutText+"</p>";
	document.getElementById("log").innerHTML = "<p>"+In+"<br/>"+OutText+"</p>"+document.getElementById("log").innerHTML;
	// d3.select("#right-pan").append("p").html(In+"<br/>"+Out);
}

//////execution
function update(){
	var Inputs=[];
	var printInputs=[];
	var Order;

	inOrder=document.getElementById("order").value;
	if(inOrder){
		Order=JSON.parse("["+inOrder+"]");
	}

	for(var i=0;i<inputID;i++){
		currVal=document.getElementById('input'+i).value;
		if(!currVal){
			console.log("no value found for "+'input'+(i+1));
		}else{
		Inputs.push(JSON.parse("["+currVal+"]"));
		printInputs.push(currVal);
		}
	}

	if(Inputs.length>1){
		var Out=[];
		initReplicate(Inputs,Out,addAll,Order);
		// initReplicate(Inputs,Out,divideAll,Order);

		////update log when done
		printResults(printInputs,Out);

	}else{
		printResults(printInputs,"Data Error");
	}



}

///d3 events
d3.select("#addInput")
	.on("click", function(){
		addInput();
	});

d3.select("#sumAll")
	.on("click", function(){
		update();
	});
d3.select("#repType")
	.on("click", function(){
		if(repType==="short"){
			repType="cross";
		}else{
			repType="short";
		}
		d3.select("#sumAll").text("Replicate "+repType);


		// update();
	});

d3.select("body")
    .on("keydown", function() {
    	if(d3.event.keyCode===13){
    		update();
    	}
    });
