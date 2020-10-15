/** Format number into a currency format for better user experience
 * @param  {number} currency
 */
export default function currencyHelper(currency) {
	return Number(currency).toLocaleString([], {
		style: "currency",
		currency: "USD",
	});
}
