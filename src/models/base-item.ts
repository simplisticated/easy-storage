export interface BaseItem {
    updatedOn: number,
    updatedOn_formatted: string
}

export const isBaseItem = (object: any): object is BaseItem => {
    if (typeof object === "object") {
        return "updatedOn" in object;
    }

    return false;
}