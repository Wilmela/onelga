export const MONGO_URL = process.env.MONGO_URL as string;

export const mail = {
  host: process.env.EMAIL_HOST as string,
  port: process.env.EMAIL_PORT as string,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
  },
};

export const cloudinaryImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL as string;
export const cloudName = process.env
  .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL || "https://freshspringsmed.com"
    : "http://localhost:3000";

export const redisCfg = {
  port: process.env.REDIS_PORT as string,
  db: Number(process.env.REDIS_DB),
  host: process.env.REDIS_HOST as string,
  password: process.env.REDIS_PASSWORD as string,
  username: process.env.REDIS_USERNAME as string,
};


export const cronSecret = process.env.CRON_SECRET as string