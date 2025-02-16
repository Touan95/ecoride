export enum UserType {
    DRIVER = 'driver',
    PASSENGER = 'passenger',
    BOTH = 'both',
    APP = 'app',
}

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	avatarUrl: string | null;
	type: UserType;
	acceptsSmoking: boolean;
	acceptsPets: boolean;
	customRules: string[];
	credits: number;
}

export type LoggedUser = Pick<User, 'id' | 'type' | 'username' | 'email'>
