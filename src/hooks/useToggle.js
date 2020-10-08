import { useState } from "react";

const useToggle = (initialState) => {
	const [toggle, setToggle] = useState(initialState);

	const setTrue = () => {
		setToggle(true);
	};

	const setFalse = () => {
		setToggle(false);
	};

	const toggleValue = () => {
		setToggle(!toggle);
	};

	return {
		setTrue,
		setFalse,
		toggleValue,
		toggle,
	};
};

export default useToggle;
