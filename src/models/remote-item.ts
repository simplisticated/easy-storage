import { BaseItem } from "./base-item";

export interface RemoteItem extends BaseItem {
    url: string
}

export const isRemoteItem = (object: any): object is RemoteItem => {
    if (typeof object === "object") {
        return "url" in object;
    }

    return false;
}