export const config = {
	backend_url: process.env.NEXT_PUBLIC_SERVER_URL,
	node_env: process.env.NODE_ENV,
	// cloud config
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	cloud_upload_preset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
	cloud_api_key: process.env.CLOUDINARY_API_KEY,
	cloud_api_secret: process.env.CLOUDINARY_API_SECRET,
};
