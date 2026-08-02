import dotenv from "dotenv";

dotenv.config();

export default {
    session: process.env.SESSION,
    signature: process.env.SIGNATURE
};