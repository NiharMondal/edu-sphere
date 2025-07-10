export type TServerResponse<T> = {
	success: boolean;
	message: string;
	result: T;
};

export type TPopulatedUser = {
	name: string;
	_id: string;
};

export type TPopulatedCourse = {
	title: string;
	_id: string;
};
