import { Order, OrderDocument } from "../models/Order";
import itemCtrl from './item'
import { errorObj, successObj, ErrorObj, SuccessObj } from "../../config/settings";
import _ from "lodash";
import Async from 'async'


let order = {
    add: (data: any) => {
        return new Promise(async (resolve) => {
            const entity: any = new Order();
            _.forEach(data, (val, key) => {
                entity[key] = val
            })

            entity.items = await itemCtrl.addAddressById(data.items.map((m: any) => m._id), data.items)
            console.log(entity)
            entity.save(async (err: any, doc: object) => {
                if (err && !doc) {
                    if (err.code === 11000)
                        return resolve({ ...errorObj, message: "Phone no. already exist" });
                    console.log(err);
                    return resolve({ ...errorObj, message: "Error Saving order Details" });
                }
                return resolve({ ...successObj, message: "order added successfully", data: doc });
            });

        });
    },
    updateById: (_id: string, data: any) => {
        return new Promise((resolve) => {
            Order.findByIdAndUpdate(_id, { ...data })
                .exec((err: ErrorObj, result: any) => {
                    if (err) return resolve({ ...errorObj, message: 'Error while updating' });
                    return resolve({...successObj, message: 'oreder updated'})
                });

        });

    },
    list: (data: any) => {
        return new Promise(async (resolve) => {
            let matchObj = { ...data };

            let countQuery = Order.count({ ...matchObj });

            Order.find({ ...matchObj }).lean().exec(async (error: ErrorObj, doc: object, success: SuccessObj) => {
                if (error || !doc) {
                    console.error(error);
                    error = {
                        message: "Error in Order List",
                        data: doc,
                        success: false,
                        type: "success",
                        error: true
                    };
                    return resolve(error);
                }
                if (doc) {
                    countQuery.exec((err: any, totalData: number) => {
                        return resolve({
                            ...successObj, message: "Order List", total: totalData, data: doc
                        });
                    });

                }


            });
        });
    },
}
export default order;
