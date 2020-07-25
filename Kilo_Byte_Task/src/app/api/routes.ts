import userCtrl from "../controllers/user";
import orderCtrl from "../controllers/order";
import itemCtrl from "../controllers/item";
import { Request, Response } from "express";
import { errorObj } from "../../config/settings";

export default (app: any) => {

    app.post("/login", async (req: Request, res: Response) => {
        let { body } = req;
        let response = await userCtrl.loginWithPassword(body);
        res.json(response);
    });
    app
        .route("/register")
        .post(async (req: Request, res: Response) => {
            let { body } = req;
            let response = await userCtrl.add(body);
            res.json(response);
        });
    app
        .route("/order")
        .get(async (req: Request, res: Response) => {
            //@ts-ignore
            let { query, user } = req;
            if (!user || user.userType != 'Admin')
                return res.status(401).json({ ...errorObj, message: 'Unauthorised' })
            let response = await orderCtrl.list(query);
            res.json(response);
        })
        .post(async (req: Request, res: Response) => {
            //@ts-ignore
            let { body, user } = req;
            if (!user || user.userType != 'Customer')
                return res.status(401).json({ ...errorObj, message: 'Unauthorised' })

            let response = await orderCtrl.add(body);
            res.json(response);
        });
    app
        .route("/order/:_id")
        .put(async (req: Request, res: Response) => {
            //@ts-ignore
            let { body, user, params } = req;
            if (!user || user.userType != 'Delivery Person')
                return res.status(401).json({ ...errorObj, message: 'Unauthorised' })

            let response = await orderCtrl.updateById(params._id, body);
            res.json(response);
        });
    app
        .route("/item")
        .get(async (req: Request, res: Response) => {
            let { query } = req;
            let response = await itemCtrl.list(query);
            res.json(response);
        })
        .post(async (req: Request, res: Response) => {
            let { body } = req;
            let response = await itemCtrl.add(body);
            res.json(response);
        });
};



