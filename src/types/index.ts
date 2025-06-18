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
	level: string;
	duration: string;
	shortVideo: string;
	price: number;
	rating: number;
	instructor: {
		name: string;
		avatar: string;
	};
	modules: TModule[];
	totalModules: number;
	totalLectures: number;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
};

export type TLectureRequest = {
	title: string;
	type: string;
	module: string;
	content: string;
	duration: number;
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

export type TUserDetails = {
	_id: string;
	name: string;
	email: string;
	role: string;
	enrolledCourses: TEnrolledCourse[];
	createdCourses: TCourse[];
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export type TEnrolledCourse = {
	_id: string;
	course: TCourse;
	progress: number;
};

export type TEnrolledCourseResponse = {
	_id: string;
	student: string;

	course: {
		_id: string;
		slug: string;
		title: string;
		thumbnail: string;
	};
	progress: {
		progress: number;
		lastWatchedLecture: {
			_id: string;
			type: string;
		};
	};
};
