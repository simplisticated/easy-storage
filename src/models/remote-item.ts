import { BaseItem, isBaseItem } from "./base-item";

export interface RemoteItem extends BaseItem {
    url: string
}

export const isRemoteItem = (obj: any): obj is RemoteItem => {
    if (isBaseItem(obj)) {
        const requirements = [
            typeof (obj as any)["url"] === "string"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}