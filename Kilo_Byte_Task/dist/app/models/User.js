"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const mongoose_1 = __importDefault(require("mongoose"));
var Usertype;
(function (Usertype) {
    Usertype[Usertype["Customer"] = 0] = "Customer";
    Usertype[Usertype["Delivery Person"] = 1] = "Delivery Person";
    Usertype[Usertype["Admin"] = 2] = "Admin";
})(Usertype || (Usertype = {}));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    mobile: { type: String, unique: true, required: true },
    userType: {
        type: String,
        default: 'Customer',
        enum: ['Customer',
            'Delivery Person',
            'Admin']
    },
    password: { type: String, required: true }
});
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
userSchema.methods.comparePassword = comparePassword;
exports.User = mongoose_1.default.model("users", userSchema);
//# sourceMappingURL=User.js.map