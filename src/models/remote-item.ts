import { BaseItem } from "./base-item";

export interface RemoteItem extends BaseItem {
    url: string
}

export const isRemoteItem = (obj: any): obj is RemoteItem => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["url"] === "string"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}