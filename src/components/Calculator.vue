<script setup>
	import {ref} from 'vue'
	let equation = ref("0")
	let resultCalled = ref(false);
	let lastResult = ref(0);
	
	const useNumber = (num) => {
		equation.value = resultCalled.value ? num : equation.value.search(/^0/g) ? equation.value + num : (equation.value.search(/^[-]$/g) !== -1 ? equation.value + num : num);
		resultCalled.value = false;
	};

	const plusOperator = ' + ';
	const plus = () => {
		equation.value = checkOperator(equation.value, plusOperator);
	}
	const minusOperator = ' - ';
	const minus = () => {
		equation.value = checkOperator(equation.value, minusOperator);
	}
	const multiplyOperator = ' x ';
	const multiply = () => {
		equation.value = checkOperator(equation.value, multiplyOperator);
	}
	const divideOperator = ' / ';
	const divide = () => {
		equation.value = checkOperator(equation.value, divideOperator);
	}
	const checkOperator = (equationString, requestedOperator) => {
		console.log(equationString);
		console.log(typeof equationString);
		if((""+equationString).search(/^0$/g) !== -1){
			if(requestedOperator.search(/( [/x] )$/g) !== -1) return '0';
			else return requestedOperator.replace(/ /g, '')
		}else{
			if(resultCalled.value){
				resultCalled.value = false;
				return lastResult.value + requestedOperator;
			}else{
				return (""+equationString).replace(/( [+\-/x] )$/g, '') + requestedOperator;
			}
		}
	}
	const result = () => {
		let finalEqn = equation.value.replace(/( [+\-/x] )$/g, '')
		resultCalled.value = finalEqn.search(/( [+\-/x] )/g) !== -1
		let eqResult = Function('"use strict";return (' + finalEqn.replace(/( \x+ )/g, ' * ') + ')')();
		equation.value = `${eqResult.toLocaleString()}`;
		lastResult.value = eqResult;
	}
	const clear = () => equation.value = '0';
	

</script>

<template>
  <h1>Calvulator</h1>
  <div class="calc">
    <div class="display">
       {{ equation }}
    </div>

    <div class="keypad container px-4 ">  
    
		
		 <div class="row  gx-2">
			<div class="col-9">

				<div class="row gx-2">

					<div v-for="key in [1,2,3,4,5,6,7,8,9]" class="p-1 col-4" >
						<button class="key num btn btn-primary w-100"
				@click="useNumber(key)"> {{key}}</button>
					</div>
  				</div>
			</div>
			<div class="col-3 ">
				<div class="row gx-2 ">
					<div class="col-12 p-1 ">
						<button class="key fn col-12 btn btn-secondary w-100" @click="plus()">+</button>		
					</div>
					<div class="col-12 p-1 ">
						<button class="key fn col-12 btn btn-secondary w-100" @click="minus()">-</button>			
					</div>
					<div class="col-12 p-1 ">
						<button class="key fn col-12 btn btn-secondary w-100" @click="multiply()">x</button>
					</div>	
				</div>		
			</div>
			<div class="col-12">
				<div class="row gx-2 ">
					<div class="col-3 p-1 ">
						<button class="key special col btn btn-warning w-100" @click="clear()">AC</button>
					</div>
					<div class="col-3 p-1 ">
						<button class="key num col btn btn-secondary w-100" @click="useNumber(0)">0</button>
					</div>
					<div class="col-3 p-1 ">
						<button class="key fn col btn btn-secondary w-100" @click="divide()">/</button>
					</div>
					<div class="col-3 p-1 ">
						<button class="key fn col btn btn-secondary w-100" @click="result()">=</button>
					</div>	
				</div>
			</div>
		</div>
    </div>
  </div>
</template>
