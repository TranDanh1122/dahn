const v2 = require("cloudinary")
const cloudinary = v2
const fs = require("fs")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



const uploadToCloudinary = async (files, folder = "upload") => {
    const fileArray = Array.isArray(files) ? files : [files]

    const uploads = await Promise.all(
        fileArray.map(async (filePath) => {
            const result = await cloudinary.uploader.upload(filePath, {
                folder,
            })
            fs.unlinkSync(filePath)
            return {
                url: result.secure_url,
                public_id: result.public_id,
            }
        })
    )

    return uploads
}


const deleteFromCloudinary = async (identifier) => {
    if (!identifier || !identifier.includes("res.cloudinary.com")) {
        console.warn(`deleteFromCloudinary: Invalid or missing URL: ${identifier}`);
        return { success: false, message: "Invalid or missing Cloudinary URL" };
    }

    try {
        const urlPath = new URL(identifier).pathname;
        const parts = urlPath.split("/");
        const uploadIndex = parts.indexOf("upload");
        if (uploadIndex === -1 || uploadIndex + 1 >= parts.length) {
            throw new Error("Invalid Cloudinary URL format: missing upload or image path");
        }
        // Lấy từ sau "upload" (bỏ version nếu có) và xóa phần mở rộng
        const publicId = parts.slice(uploadIndex + 2).join("/").replace(/\.[^/.]+$/, "");
        if (!publicId) {
            throw new Error("Could not extract publicId from URL");
        }

        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result !== "ok") {
            throw new Error(`Cloudinary deletion failed: ${result.result}`);
        }
        console.log(`Deleted image with publicId: ${publicId}`);
        return { success: true, publicId };
    } catch (error) {
        console.error(`deleteFromCloudinary error for ${identifier}:`, error.message);
        return { success: false, message: error.message };
    }
};
module.exports = { uploadToCloudinary, deleteFromCloudinary }
