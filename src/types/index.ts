export type TServerResponse<T> = {
	success: boolean;
	message: string;
	result: T;
};

export type TCourse = {
	thumbnail: string;
	title: string;
	price: number;
	description: string;
	instructor: string;
};

export type TCourseResponse = {
	_id: string;
	title: string;
	slug: string;
	thumbnail: string;
	description: string;
	price: number;
	isDeleted: boolean;
	instructor: {
		_id: string;
		name: string;
		email: string;
	};
	modules: TModule[];
	students: TUser[];
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

export type TRegister = {
	name: string;
	email: string;
	password: string;
};

export type TLogin = {
	email: string;
	password: string;
};

export type TUser = {
	_id: string;
	name: string;
	email: string;
};
export type TInstructorResponse = {
	_id: string;
	name: string;
	email: string;
	role: string;
};

export type TLecture = {
	_id: string;
	title: string;
	slug: string;
	type: string;
	videoUrl: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	attachments: any[];
	module: TLectureModule;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type TLectureModule = {
	_id: string;
	title: string;
};

export type TModule = {
	_id: string;
	title: string;
	slug: string;
	index: number;
	isDeleted: boolean;
	course: TModuleCourse;
	lectures: TLecture[];
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type TModuleCourse = {
	_id: string;
	title: string;
};

export type TModuleCreate = {
	title: string;
	course: string;
};
