import { useState } from "react";
/** useToggle Hook
 * @param  {boolean} initialState
 *
 * Creates a custom hook to create a boolean state along with functions to toggle / update that state
 *
 * When called will:
 *
 *    - create state with true or false
 *    - create setTrue function which updates state to true
 *    - create setFalse function which updates state to false
 *    - create toggleValue function which updates state to be the opposite of its current value
 *
 *
 * Returns an object containing:
 *    - setTrue - function described above
 *    - setFalse - function described above
 *    - toggleValue - function described above
 *    - toggle - state value
 */
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
