function initReplicate(In,Out,localFunction,Order){

	if(!Order){
		Order=[];
		for(let i=0;i<In.length;i++){
			Order.push(i);
		}
	}
	////sort inputs according to replication preference (order)
	let newIn=[];
	for(let i=0;i<Order.length;i++){
		newIn.push(In[Order[i]])
	}

	////un-sort the inputs into correct funtional order
	let sortFunction=function(In){
		let newArg=[];
		for(let i=0;i<Order.length;i++){
			newArg.push(In[Order.indexOf(i)]);
			// newArg.push(In[Order[i]]);
		}
		// console.log(In,Order,newArg);
		return localFunction(newArg);
	}
	let inputTypes=["number","number","number"];
	let inTypeRanks=[];
	for(let i=0;i<inputTypes.length;i++){
		inTypeRanks.push(rankArray(inputTypes[i]))
	}


	replicate(newIn,Out,sortFunction,inTypeRanks);
}


function replicate(In,Out,sortFunction,inTypeRanks){
	let passed=true;
	let error=false;
	let arrayCount=0;
	let dRanks=[];
	let shortest;


	for(let i=0;i<In.length;i++){
		let inRank=rankArray(In[i]);

		let dRank=inRank-inTypeRanks[i];
		dRanks.push(dRank);

		if(dRank>0) {
			if(!shortest || In[i].length<shortest)shortest=In[i].length
			arrayCount++;
		}
	}
	let highest=0;

	for(let i=0;i<dRanks.length;i++){
		if(dRanks[i]>0) highest=i;
	}

	if(arrayCount===0){

		Out.push(sortFunction(zip(In,dRanks)));

	}else if(arrayCount===1){

		let crossOut=cross(In,Out,sortFunction,highest,inTypeRanks);


		if(dRanks[highest]===1){
			newOut=[];

			for(let i=0;i<crossOut.length;i++) {
				newOut.push(sortFunction(crossOut[i]))
				// replicate(crossOut[i],Out[0],sortFunction,inTypeRanks);
			}
			Out.push(newOut);
		}
		else {
			Out[0]=[];
			console.log(crossOut);
			for(let i=0;i<crossOut.length;i++) {
					replicate(crossOut[i],Out[0],sortFunction,inTypeRanks);
				}
		}

	}else{
		///find shortest
		Out[0]=[]
		for(let i=0;i<shortest;i++){
			// Out[i]=[];
			let newIn=zip(In,dRanks,i)
			replicate(newIn,Out[0],sortFunction,inTypeRanks);
		}

	}
}

function zip(In,dRanks,i=0){
		let newIn=[]
		for(let j=0;j<In.length;j++){
			if(dRanks[j]>0){
				newIn.push(In[j][i])
			}else{
				newIn.push(In[j])
			}
		}
		return newIn;
}

function cross(In,Out,sortFunction,highest,inTypeRanks){
	let funOut=[];
	for(let i=0;i<In[highest].length;i++){
		funIn=[];
		for(let j=0;j<In.length;j++){
			if(j===highest){
				funIn.push(In[highest][i])
			}else{

				funIn.push(In[j])
			}
		}

		funOut.push(funIn)
	}
	return funOut;

}

function rankArray(obj,rank=0){

	if(isArray(obj)){
	// if(obj.length>1){
		return (rankArray(obj[0],rank+1));
	}else{
		return rank;
	}
}

function isArray(someObj){
	if( Object.prototype.toString.call( someObj ) === '[object Array]' ) {
		return true;
	}else{return false}

}

function addAll(funIn){
	let res=0;
	let msg="";
	for(let i=0;i<funIn.length;i++){
		if(i>0){
			msg+="+";
		}
		msg+=funIn[i];
		res+=funIn[i];
	}
	let Out=msg+"="+res;
	// console.log(Out);
	return(res);
}
