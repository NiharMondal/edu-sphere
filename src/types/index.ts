export type TServerResponse<T> = {
	success: boolean;
	message: string;
	result: T;
};
