import { BaseItem } from "./base-item";

export interface LocalItem extends BaseItem {
    value: any
}

export const isLocalItem = (object: any): object is LocalItem => {
    if (typeof object === "object") {
        return "value" in object;
    }

    return false;
}