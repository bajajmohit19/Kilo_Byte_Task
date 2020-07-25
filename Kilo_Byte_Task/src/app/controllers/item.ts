import { Item, ItemDocument } from "../models/Item";
import { errorObj, successObj, ErrorObj, SuccessObj } from "../../config/settings";
import _ from "lodash";



let item = {
    add: (data: any) => {
        return new Promise(async (resolve) => {
            const entity: any = new Item();
            _.forEach(data, (val, key) => {
                entity[key] = val
            })
            entity.save(async (err: any, doc: object) => {
                if (err && !doc) {
                    if (err.code === 11000)
                        return resolve({ ...errorObj, message: "Phone no. already exist" });
                    console.log(err);
                    return resolve({ ...errorObj, message: "Error Saving Item Details" });
                }
                return resolve({ ...successObj, message: "Item added successfully", data: doc });
            });

        });
    },
    list: (data: any) => {
        return new Promise(async (resolve) => {
            let matchObj = { ...data };

            let countQuery = Item.count({ ...matchObj });

            Item.find({ ...matchObj }).lean().exec(async (error: ErrorObj, doc: object, success: SuccessObj) => {
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
                            ...successObj, message: "Item List", total: totalData, data: doc
                        });
                    });

                }


            });
        });
    },
    getById: (_id: string) => {
        return new Promise((resolve) => {
            Item.findOne({ _id })
                .lean()
                .exec((error: ErrorObj, doc: object, success: SuccessObj) => {
                    if (error || !doc) {
                        return resolve(undefined);
                    }
                    resolve(doc);
                });
        });
    },
    addAddressById: (arr: string[], itemsArr: any) => {
        return new Promise((resolve) => {
            Item.find({ _id: { $in: arr } }, { addresses: 1 })
                .lean()
                .exec((error: ErrorObj, doc: any) => {

                    if (error || !doc) {
                        return resolve([]);
                    }
                    _.forEach(itemsArr, (val) => {
                        _.forEach(doc, (elem) => {
                            console.log(val, elem)
                            if (val._id == elem._id) {
                                let randomIndex = _.random(0, elem.addresses.length - 1)
                                val.pickupLocation = elem.addresses[randomIndex]
                            }
                        })
                    })
                    resolve(itemsArr);
                });
        });
    },
}
export default item;
