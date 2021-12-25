import { isLocalItem } from "../models/local-item";
import { isRemoteItem } from "../models/remote-item";
import { BaseItem } from "../models/base-item";
import JsonSerializer from "./json-serializer";

export default class ItemSerializer {

    public serialize = (
        settings: {
            item: BaseItem,
            encode: boolean
        }
    ) => {
        return new JsonSerializer().serialize({
            data: settings.item,
            encode: settings.encode
        });
    }

    public deserialize = (data: string): BaseItem | undefined => {
        const json = new JsonSerializer().deserialize(
            data
        );

        if (json) {
            const isItem = isLocalItem(json)
                || isRemoteItem(json);
            
            if (isItem) {
                return json;
            }
        }

        return undefined;
    }
}