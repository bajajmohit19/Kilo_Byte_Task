import dotenv from "dotenv";


if (process.env.NODE_ENV) {
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
} else {
    dotenv.config({ path: '.env.development' });
}



// dotenv.config({path: `.env.${process.env.NODE_ENV}`});
export const APP_SECRET = process.env["APP_SECRET"];
export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = process.env["MONGODB_URI"];

if (!SESSION_SECRET) {
    process.exit(1);
}


