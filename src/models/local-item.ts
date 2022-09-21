import { BaseItem, isBaseItem } from "./base-item";

export interface LocalItem extends BaseItem {
    value?: any
}

export const isLocalItem = (obj: any): obj is LocalItem => {
    if (isBaseItem(obj)) {
        const requirements = [
            true
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}