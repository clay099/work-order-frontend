/** Format the date string into a human readable date
 * @param  {string} date
 */
export default function dateHelper(date) {
	return new Date(date).toLocaleString([], {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
