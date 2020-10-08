export default function currencyHelper(currency) {
	return Number(currency).toLocaleString([], {
		style: "currency",
		currency: "USD",
	});
}
