// Function to upload an image to Cloudinary
export const uploadImage = async (imageUri) => {
	try {
		// Cloudinary preset options
		const options = {
			upload_preset: "default", // Replace with your Cloudinary upload preset
			folder: "user_images", // Optional folder in Cloudinary to store images
			unsigned: true, // Set to true if using an unsigned preset
		};

		const data = new FormData();
		data.append("file", {
			uri: imageUri,
			type: "image/jpeg", // or the type of the image
			name: "user_profile_image.jpg", // Optional name of the file
		});

		data.append("upload_preset", options.upload_preset);
		data.append("folder", options.folder); // Add folder if specified

		// Send the request to Cloudinary
		const response = await fetch(
			"https://api.cloudinary.com/v1_1/dyidmlf6q/image/upload",
			{
				method: "POST",
				body: data,
			}
		);

		const result = await response.json();

		if (result.secure_url) {
			console.log("Uploaded image URL:", result.secure_url);
			return result.secure_url;
		} else {
			console.error("Error uploading image:", result);
			throw new Error("Image upload failed");
		}
	} catch (error) {
		console.error("Upload error:", error);
		throw error;
	}
};
