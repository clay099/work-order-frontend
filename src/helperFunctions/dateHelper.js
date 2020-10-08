export default function dateHelper(date) {
	return new Date(date).toLocaleString([], {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
