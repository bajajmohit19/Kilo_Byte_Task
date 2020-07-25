import bcrypt from "bcrypt-nodejs";
import mongoose from "mongoose";
export type UserDocument = mongoose.Document & {
    userType: Usertype;
    mobile: string;
    name: string;
    password: string;
}

type comparePasswordFunction = (candidatePassword: string) => Promise<any>;


enum Usertype {
    'Customer',
    'Delivery Person',
    'Admin'
}

const userSchema = new mongoose.Schema({
    name: String,
    mobile: {type: String , unique: true, required: true},
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
    const user = this as UserDocument;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});


const comparePassword: comparePasswordFunction = function (candidatePassword) {

    return new Promise((resolve => {
        bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
            resolve({
                err, isMatch
            });
        });
    }));

};

userSchema.methods.comparePassword = comparePassword;


export const User = mongoose.model<UserDocument>("users", userSchema);