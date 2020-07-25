"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const settings_1 = require("../../config/settings");
const lodash_1 = __importDefault(require("lodash"));
const secrets_1 = require("../../util/secrets");
let user = {
    add: (data) => {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const userObj = new User_1.User();
            lodash_1.default.forEach(data, (val, key) => {
                userObj[key] = val;
            });
            userObj.save((err, doc) => __awaiter(this, void 0, void 0, function* () {
                if (err && !doc) {
                    if (err.code === 11000)
                        return resolve(Object.assign({}, settings_1.errorObj, { message: "Phone no. already exist" }));
                    console.log(err);
                    return resolve(Object.assign({}, settings_1.errorObj, { message: "Error Saving User Details" }));
                }
                return resolve(Object.assign({}, settings_1.successObj, { message: "User added successfully", data: doc }));
            }));
        }));
    },
    isUserExist: (_id) => {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            User_1.User.findById(_id, { userType: 1, mobile: 1 }).lean().then(doc => {
                return resolve(doc);
            })
                .catch(err => {
                return resolve(null);
            });
        }));
    },
    loginWithPassword: (data) => (new Promise((resolve) => {
        const { mobile, password } = data;
        const error = "wrong email or password";
        let query = User_1.User.findOne({ mobile });
        query.exec(function (err, user) {
            if (!user)
                return resolve(Object.assign({}, settings_1.errorObj, { message: error }));
            user.comparePassword(password).then(({ err, isMatch }) => {
                if (!isMatch) {
                    // return false;
                    return resolve(Object.assign({}, settings_1.errorObj, { message: "Invalid password" }));
                }
                const JWTToken = jsonwebtoken_1.default.sign({
                    _id: user._id,
                    userType: user.userType,
                    name: user.name,
                    mobile: user.mobile
                }, secrets_1.APP_SECRET, {
                    expiresIn: "365d",
                });
                return resolve(Object.assign({}, settings_1.successObj, { token: JWTToken, user: {
                        _id: user._id,
                        userType: user.userType,
                        name: user.name,
                        mobile: user.mobile
                    } }));
            });
        });
    }))
};
exports.default = user;
//# sourceMappingURL=user.js.map