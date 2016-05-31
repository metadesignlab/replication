

function isArray(someObj){
	if( Object.prototype.toString.call( someObj ) === '[object Array]' ) {
		return true;
	}else{return false}

}

function addAll(funIn){
	var res=0;
	var msg="";
	for(var i=0;i<funIn.length;i++){
		if(i>0){
			msg+="+";
		}
		msg+=funIn[i];
		res+=funIn[i];
	}
	var Out=msg+"="+res;
	// console.log(Out);
	return(Out);
}

function divideAll(funIn){
	var res=0;
	var msg="";
	for(var i=0;i<funIn.length;i++){
		if(i>0){
			msg+="/";
		}
		msg+=funIn[i];

		if(i===0){
			res=funIn[i];
		}else{
			res=res/funIn[i];
		}

	}
	var Out=msg+"="+res;
	// console.log(Out);
	return(Out);
}

var inType=["number","number","number","number"];
// console.log("Type required = "+ inType);


function rankArray(obj,rank){
	if(!rank){
		rank=0;
	}
	if(isArray(obj[0])){
		rankArray(obj[0],rank+1);
	}else{
		console.log(rank);
	}
}


function initReplicate(In,Out,localFunction,Order){
	if(!Order){
		Order=[];
		for(var i=0;i<In.length;i++){
			Order.push(i);
		}
	}

	// console.log(Order);

	///rank(depth) inputs
	// rankArray(In[0]);







	////sort inputs according to replication preference (order)
	var newIn=[];
	for(var i=0;i<Order.length;i++){
		newIn.push(In[Order[i]])
	}

	////un-sort the inputs into correct funtional order
	var sortFunction=function(In){
		var newArg=[];
		for(var i=0;i<Order.length;i++){
			newArg.push(In[Order.indexOf(i)]);
			// newArg.push(In[Order[i]]);
		}
		// console.log(In,Order,newArg);
		return localFunction(newArg);
	}

	replicate(newIn,Out,sortFunction,0);

}
function cross(In,Out,sortFunction,InVal,currI){
	// newI=(currI+1)%In.length;

	if(In[currI]){
		for(var i=0;i<In[currI].length;i++){


			//create a copy
			funIn=(JSON.parse(JSON.stringify(InVal)));
			funIn.push(In[currI][i]);

			if (currI+1<In.length){

				if(currI===0 && In[0].length>1){
					Out[i]=[];
					// cross(In,Out,sortFunction,funIn,currI+1);
					cross(In,Out[i],sortFunction,funIn,currI+1);
				}else{
					cross(In,Out,sortFunction,funIn,currI+1);

				}
			}else{
				Out.push(sortFunction(funIn));
			}
		}
	}

}
function replicate(In,Out,sortFunction,currentI){

	/////check if all inputs are of right type
	var passed=true;
	var error=false;

	for(var i=0;i<In.length;i++){
		if(isArray(In[i])){
			if(isArray(In[i][0])){
				// console.log(In[i]+" is an array, go deeper");
				passed=false;
			}else if(typeof(In[i][0])!==inType[i]){
				console.log(In[i]+" is not of correct type");
				error=true;
				return;
			}
		}
	}

	// var repType="short";
	// var repType="cross";

	if(passed){

		if(repType==="short"){
			/////zipped replication (default shortest)
			///find shortest list
			var shortest=10000000;
			for(var i=0;i<In.length;i++){
				if(In[i].length<shortest){
					shortest=In[i].length
				}
			}

			if(shortest===1){
				cross(In,Out,sortFunction,[],0);
			}else{

				////mapped input lists
				for(var i=0;i<shortest;i++){
					var funIn=[];
					for(var j=0;j<In.length;j++){
						funIn.push(In[j][i])
					}
					Out.push(sortFunction(funIn));
				}
			}
		}else if(repType==="cross"){
			cross(In,Out,sortFunction,[],0);

		}
	}else{




	////Did not pass so continue peeling
		newI=(currentI+1)%In.length;

		if(isArray(In[currentI][0])){
			for(var i=0;i<In[currentI].length;i++){
				var newIn=[];
				for(var j=0;j<In.length;j++){
					if(j===currentI){
						newIn.push(In[j][i])
					}else{
						newIn.push(In[j])
					}
				}

				///trying to solve the braces::
				// console.log(currentI,newI);

				// if(currentI===0){
				// // if(currentI+1===In.length){
				// 	Out[i]=[];
				// 	replicate(newIn,Out[i],sortFunction,newI);
				//
				// }else{
				// 	replicate(newIn,Out,sortFunction,newI);
				//
				// }
				//
				Out[i]=[];
				replicate(newIn,Out[i],sortFunction,newI);
			}
		}else{
			var newIn=[];
			for(var j=0;j<In.length;j++){
					newIn.push(In[j])

			}
			replicate(newIn,Out,sortFunction,newI);

		}


	}
}

function toString(obj){
	console.log(JSON.stringify(obj));
}
