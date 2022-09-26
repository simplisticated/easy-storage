import { BaseItem } from "./base-item";
export interface LocalItem extends BaseItem {
    value?: any;
}
export declare const isLocalItem: (obj: any) => obj is LocalItem;
