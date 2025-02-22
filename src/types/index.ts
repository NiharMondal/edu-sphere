export type TServerResponse<T> = {
	success: boolean;
	message: string;
	result: T;
};

export type TCourse = {
	_id: string;
	thumbnail: string;
	title: string;
	description: string;
	price: number;
	slug: string;
	modules: string[];
	createdAt: string;
	updatedAt: string;
};
export type TModule = {
	_id: string;
	title: string;
	index: string;
	course: string;
	lectures: TLecture[];
	createdAt: string;
	updatedAt: string;
};
export type TModuleResponse = {
	_id: string;
	title: string;
	index: string;
	course: {
		title: string;
		_id: string;
	};
	lectures: TLecture[];
	createdAt: string;
	updatedAt: string;
};
export type TLecture = {
	_id: string;
	title: string;
	type: string;
	module: string;
	url: string;
	createdAt: string;
	updatedAt: string;
};
export type TLectureResponse = {
	_id: string;
	title: string;
	type: string;
	module: {
		title: string;
		_id: string;
	};
	url: string;
	createdAt: string;
	updatedAt: string;
};
