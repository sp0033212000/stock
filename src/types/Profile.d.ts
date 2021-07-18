export declare global {
	interface RegisterForm {
		name: string;
		email: string;
		password: string;
	}

	interface User extends Pick<RegisterForm, "name" | "email"> {
		id: number;
	}
}
