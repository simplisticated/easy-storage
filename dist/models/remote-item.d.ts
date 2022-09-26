import { BaseItem } from "./base-item";
export interface RemoteItem extends BaseItem {
    url: string;
}
export declare const isRemoteItem: (obj: any) => obj is RemoteItem;
