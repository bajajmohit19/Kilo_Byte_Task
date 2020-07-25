"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
var Usertype;
(function (Usertype) {
    Usertype[Usertype["admin"] = 0] = "admin";
    Usertype[Usertype["user"] = 1] = "user";
})(Usertype || (Usertype = {}));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female"] },
    mobile: String,
    userType: { type: String, default: 'user', enum: ["admin", "user"] },
    allowNotification: Boolean,
    password: { type: String, required: true },
    mcp: { type: String, ref: "mcc" },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
    }
});
userSchema.plugin(mongoose_delete_1.default, { overrideMethods: "all", deletedAt: true });
userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt_nodejs_1.default.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_nodejs_1.default.hash(user.password, salt, undefined, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
const comparePassword = function (candidatePassword) {
    return new Promise((resolve => {
        bcrypt_nodejs_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
            resolve({
                err, isMatch
            });
        });
    }));
};
userSchema.plugin(mongoose_delete_1.default, { deletedAt: true, overrideMethods: ["count", "countDocuments", "find"] });
userSchema.methods.comparePassword = comparePassword;
exports.User = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=User copy.js.map