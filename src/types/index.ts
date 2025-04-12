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

export type TLectureRequest = {
	title: string;
	type: string;
	module: string;
	content: string;
	duration: string;
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
	role: string;
};

export type TUserDetails = {
	_id: string;
	name: string;
	email: string;
	role: string;
	createdCourses: TCourse[];
	enrolledCourses: TCourse[];
	createdAt: string;
};
export type TInstructorResponse = {
	_id: string;
	name: string;
	email: string;
	role: string;
};

export type TLectureResponse = {
	_id: string;
	title: string;
	slug: string;
	type: string;
	content: string;
	duration: string;
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
	lectures: TLectureResponse[];
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
