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
const user_1 = __importDefault(require("../controllers/user"));
const order_1 = __importDefault(require("../controllers/order"));
const item_1 = __importDefault(require("../controllers/item"));
const settings_1 = require("../../config/settings");
exports.default = (app) => {
    app.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
        let { body } = req;
        let response = yield user_1.default.loginWithPassword(body);
        res.json(response);
    }));
    app
        .route("/register")
        .post((req, res) => __awaiter(this, void 0, void 0, function* () {
        let { body } = req;
        let response = yield user_1.default.add(body);
        res.json(response);
    }));
    app
        .route("/order")
        .get((req, res) => __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        let { query, user } = req;
        if (!user || user.userType != 'Admin')
            return res.status(401).json(Object.assign({}, settings_1.errorObj, { message: 'Unauthorised' }));
        let response = yield order_1.default.list(query);
        res.json(response);
    }))
        .post((req, res) => __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        let { body, user } = req;
        if (!user || user.userType != 'Customer')
            return res.status(401).json(Object.assign({}, settings_1.errorObj, { message: 'Unauthorised' }));
        let response = yield order_1.default.add(body);
        res.json(response);
    }));
    app
        .route("/order/:_id")
        .put((req, res) => __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        let { body, user, params } = req;
        if (!user || user.userType != 'Delivery Person')
            return res.status(401).json(Object.assign({}, settings_1.errorObj, { message: 'Unauthorised' }));
        let response = yield order_1.default.updateById(params._id, body);
        res.json(response);
    }));
    app
        .route("/item")
        .get((req, res) => __awaiter(this, void 0, void 0, function* () {
        let { query } = req;
        let response = yield item_1.default.list(query);
        res.json(response);
    }))
        .post((req, res) => __awaiter(this, void 0, void 0, function* () {
        let { body } = req;
        let response = yield item_1.default.add(body);
        res.json(response);
    }));
};
//# sourceMappingURL=routes.js.map