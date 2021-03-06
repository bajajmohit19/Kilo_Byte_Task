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
exports.default = (app) => {
    app.post("/loginWithPassword", (req, res) => __awaiter(this, void 0, void 0, function* () {
        let { body } = req;
        let response = yield user_1.default.loginWithPassword(body);
        res.json(response);
    }));
    app
        .route("/user")
        .post((req, res) => __awaiter(this, void 0, void 0, function* () {
        let { body } = req;
        let response = yield user_1.default.add(body);
        res.json(response);
    }));
};
//# sourceMappingURL=authRoutes.js.map