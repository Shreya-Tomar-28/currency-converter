let list=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");

// const URL = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=USD&to=INR&amount=1';

for (let select of list){
	for(let currCode in countryList){
		let myOption=document.createElement("option");
		myOption.innerText=currCode;
		myOption.value=currCode;
		select.append(myOption);		
		if(select.name==="from" && currCode==="USD"){
			myOption.selected="selected";
		}
		else if(select.name==="to" && currCode==="INR"){
			myOption.selected="selected";
		}		
		
	}
	select.addEventListener("change",(evt)=>{
		updateFlag(evt.target);
	});	
}

const updateFlag=(element)=>{	
	countryCode=countryList[element.value];
	let myImg=element.parentElement.querySelector("img");
	newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
	myImg.src=newSrc;	
}

btn.addEventListener("click",(evt)=>{
	evt.preventDefault();
	updateExcRate();
});

window.addEventListener("load",()=>{
	updateExcRate();
});

const updateExcRate= async()=>{
	let amount=document.querySelector("input");
	let amtVal=amount.value;	
	if(amtVal==="" || amtVal<1){
		amtVal=1;
		amount.value="1";		
	}
const URL = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${fromCurr.value}&to=${toCurr.value}&amount=1`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '9e2f5bcbb1msh4d06a0231d29a17p1e8b1ajsnbff00c247fac',
		'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
	}
};
    let response= await fetch(URL,options);
    let data= await response.json();	

	let show=document.querySelector(".showcase p");
	show.innerText=`${amtVal} ${fromCurr.value} = ${amtVal*data.result} ${toCurr.value} `;

}