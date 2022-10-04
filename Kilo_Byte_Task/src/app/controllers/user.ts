import async from "async";
import jwt from "jsonwebtoken";
import { User, UserDocument } from "../models/User";
import { errorObj, successObj, ErrorObj, SuccessObj } from "../../config/settings";
import _ from "lodash";
import moment from "moment";
import bcrypt from "bcrypt-nodejs";
import { APP_SECRET } from "../../util/secrets";



let user = {
    add: (data: any) => {
        return new Promise(async (resolve) => {
            const userObj: any = new User();
            _.forEach(data, (val, key) => {
                userObj[key] = val
            })
            userObj.save(async (err: any, doc: object) => {
                if (err && !doc) {
                    if (err.code === 11000)
                        return resolve({ ...errorObj, message: "Phone no. already exist" });
                    console.log(err);
                    return resolve({ ...errorObj, message: "Error Saving User Details" });
                }
                return resolve({ ...successObj, message: "User added successfully", data: doc });
            });

        });
    },
    isUserExist: (_id: string) => {
        return new Promise(async (resolve) => {
            User.findById(_id, { password: 0 }).lean().then(doc => {
                return resolve(doc)
            })
                .catch(err => {
                    return resolve(null)
                })
        });
    },
    loginWithPassword: (data: any) => {
        new Promise((resolve) => {
            const { mobile, password } = data;
            const error = "Wrong email or password";
            let query = User.findOne({ mobile })
            query.exec(function (err, user: any) {

                if (!user) return resolve({ ...errorObj, message: error });


                user.comparePassword(password).then(({ err, isMatch }: any) => {

                    if (!isMatch) {
                        // return false;
                        return resolve({ ...errorObj, message: "Invalid password" });
                    }

                    const JWTToken = jwt.sign({
                        _id: user._id,
                        userType: user.userType,
                        name: user.name,
                        mobile: user.mobile

                    },
                        APP_SECRET,
                        {
                            expiresIn: "365d",
                        });

                    return resolve({
                        ...successObj,
                        token: JWTToken,
                        user: {
                            _id: user._id,
                            userType: user.userType,
                            name: user.name,
                            mobile: user.mobile
                        },
                    });

                });

            });
        })
    }
}
export default user;
