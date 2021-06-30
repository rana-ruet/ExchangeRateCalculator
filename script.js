const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");
const swap = document.getElementById("swap");
const rate = document.getElementById("rate");

const calculate = async function () {
	try {
		const res = await fetch(
			`https://v6.exchangerate-api.com/v6/27a7bd809914cb1b40908c29/latest/${currencyEl_one.value}`
		);

		if (res.result === "error")
			throw new Error(`Can't get data. Try again later!`);

		const data = await res.json();
		const rates = data.conversion_rates[currencyEl_two.value];
		amountEl_two.value = (amountEl_one.value * rates).toFixed(2);

		rate.innerHTML = `1 ${currencyEl_one.value} = ${rates} ${currencyEl_two.value} `;
		console.log(amountEl_two.value);
	} catch (error) {
		console.error(error.message);
	}
};

currencyEl_one.addEventListener("change", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener('click', () => {
   const temp = currencyEl_one.value;
   currencyEl_one.value = currencyEl_two.value;
   currencyEl_two.value = temp;
   calculate()
})
calculate();
