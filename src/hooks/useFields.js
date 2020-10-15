import { useState } from "react";

/** useFields Hook
 * @param  {object} initialState
 *  *
 * Creates a custom hook to be used with form Data.
 *
 * When called will:
 *    - Create state filled with the initial state passed through.
 *    - Create handleChange function which will update the state as user edit the input
 *    - Create resetFormData function which will reset the state back to the original data passed through
 *
 * Returns an object containing:
 *    - formData - state value
 *    - handleChange - function described above
 *    - resetFormData - function described above
 *    - setFormData - function to allow for custom handleChange if the input does not provide data of an acceptable format for handleChange (needed for slider inputs)
 */
const useFields = (initialState) => {
	const [formData, setFormData] = useState(initialState);

	const handleChange = (e) => {
		const { value, name } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};

	const resetFormData = () => {
		setFormData(initialState);
	};
	return { formData, handleChange, resetFormData, setFormData };
};

export default useFields;
