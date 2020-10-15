import { LOGOUT } from "./types";

/**
 * logout action - applicable to all reducers
 */
export default function logoutAll() {
	return { type: LOGOUT };
}
