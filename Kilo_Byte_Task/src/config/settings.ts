import _ from 'lodash'
export const errorObj = { error: true, type: "error", success: false };
export const successObj = { error: false, type: "success", success: true };

export interface ErrorObj {
    error: boolean;
    type: string;
    success: boolean;
    data: any;
    message: string;
}

export interface SuccessObj {
    error: boolean;
    type: string;
    success: boolean;
    data: any;
    message: string;
}

//@ts-ignore
export interface API_RESP {
    error: boolean;
    success: boolean;
    type: string;
    data?: any;
    message?: string;
    err?: object;
    summary?: object;
    total?: number;
    count?: number;


}


export const removeExtraTableParams = (obj: any) => {
    let x = Object.assign({}, obj)
    delete x.results
    delete x.page
    delete x.count
    delete x.sortField
    delete x.sortOrder
    delete x.selectors
    delete x.select
    delete x.regExFilters
    delete x.populateArr
    delete x.project
    delete x.dateFilter
    _.forEach(x, (val, key) => {
        if (val == undefined)
            delete x[key]
    })
    return x
}