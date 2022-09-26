import { BaseItem } from "../models/base-item";
export default class ItemSerializer {
    serialize: (settings: {
        item: BaseItem;
        encode: boolean;
    }) => string;
    deserialize: (data: string) => BaseItem | undefined;
}
