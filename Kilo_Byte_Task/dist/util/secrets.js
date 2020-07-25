"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV) {
    dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
}
else {
    dotenv_1.default.config({ path: '.env.development' });
}
// dotenv.config({path: `.env.${process.env.NODE_ENV}`});
exports.APP_SECRET = process.env["APP_SECRET"];
exports.SESSION_SECRET = process.env["SESSION_SECRET"];
exports.MONGODB_URI = process.env["MONGODB_URI"];
if (!exports.SESSION_SECRET) {
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map