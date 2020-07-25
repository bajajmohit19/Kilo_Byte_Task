import { errorObj } from "../config/settings";
import _ from 'lodash'
let jwt = require('jsonwebtoken');

const APP_SECRET = process.env.APP_SECRET;

const excludeAPis = ['/login', '/register']

export default (req: any, res: any, next: any) => {

    console.log('hererere')
    let errorResp = {
        ...errorObj,
        message: 'Token is not valid'
    }
    if (excludeAPis.some((path) => {
        let temp = RegExp(path)
        return temp.test(req.path)
    })) return next();

    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token) {

        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, APP_SECRET, (err: any, user: any) => {
            if (err) {
                return res.status(401).json(errorResp);
            }
            req.user = user;
            const userCtrl = require('../app/controllers/user');
            userCtrl.default.isUserExist(user._id)
                .then((doc: any) => {
                    if (doc) {
                        console.log(user, doc)
                        _.forEach(doc, (val, key) => {
                            if (user[key] != val) {
                                return res.status(401).json(errorResp)
                            }
                        })
                        next()
                    } else {
                        res.status(401).json(errorResp)
                    }
                })
                .catch((err: any) => {
                    return res.status(401).json(errorResp)
                })
        })
    }
    else {
        return res.status(401).json(errorResp);
    }
};
