export interface UserData {
	id: string;
	local: string;
	country: string;
	description: string;
	favorite?: boolean;
}

export type FormData = Omit<UserData, 'id'>;
