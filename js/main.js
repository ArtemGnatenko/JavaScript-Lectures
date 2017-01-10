// var x ="12";
// var y = 10.0;
// var z ="10.2";
// console.log(typeof x === "string" && y=== 10 && z>=y);

// var x ="8";
// var y = 6.0;
// var z ="10";
// console.log(
	// typeof x === "number" &&
	// typeof y === "number" &&
	// (x > 10 || x >y || typeof y ==="number") || z % 2 ===9);

// var x = "10";
// var y = "200";
// var z = 10;

// if (typeof y !=="number"){
// x=y;}
// else if (typeof z !== "number"){
// x = z};
// else (
// x = null;)
// console.log(x); 	

// var x = "10";
// var y = "200";
// var z = 10;
// if (y !==false){
	// x = "true";}
// else {
	// x=z;}
// console.log(x);	


// //it is function;
// function fn(){}
// var object =()

// //it is method;
// object.method = dunction (){};

// //it is functional expression;
// var functionX = function (){}; 

// //it is functional expression;
// var functionX = function FnName (){
	// if (true){
		// FnName();
	// } 
// }; 

// console.log(functionX);


// var NewFnName = new Function("x","return x");
// console.log(NewFnName(256));

// (function(){
	// console.log("test 1");
// })
// (function({
	// console.log("test 2");
// })

// var test = (function privatName(x){
	// console.log(x);
	 // privatName(x+1);
// }
// return x ;
// console.log(test);
// (function privatName ()
// {})

// var arrayWithFunctions = [
	// function () {return 0;}
	// function () {return 1;}
	// function () {return 2;}
	// ];
// arrayWithFunctions.methodOfArray= function (){
	// return ("i am a method")
// }
// console.log(arrayWithFunctions[1]());
// console.log(arrayWithFunctions.methodOfArray());
// console.log(FnName);


// var objct = {
	// x:10
// }
// console.log(objct.x);

// changeX(objct)
// function changeX(objct){
	// objct.x=25;
// }
// console.log(objct.x);

// var x = 10;
// var y = x;
// console.log("old x =",x);
// console.log("old y=",y);
// x+1;
// changeX(x);
// function changeX(test){
	// test=25;
// }
// console.log("new x=",x);
// console.log("old y=",y);

// var x = true ? function(){return 25;}():false 
// console.log(x);

// var fn = x = 25 && function(){return 50}
// console.log(fn);

function test (number,name){
	console.log(arguments);
	console.log(number+=10);
	console.log("hello",name);
	var x = Array.apply(null,arguments)
	console.log(x);
}
test (1,"Epistifokl",null,[],256,"test");

















