import { BaseItem, isBaseItem } from "../models/base-item";
import { isLocalItem, LocalItem } from "../models/local-item";
import { isRemoteItem, RemoteItem } from "../models/remote-item";
import ItemSerializer from "../serializers/item-serializer";
import sizeof from "object-sizeof";

export default class EasyStorage {

    public static local = (() => {
        if (window.localStorage) {
            return new EasyStorage({
                storage: window.localStorage
            });
        }
    })()!

    public static session = (() => {
        if (window.sessionStorage) {
            return new EasyStorage({
                storage: window.sessionStorage
            });
        }
    })()!

    public listener?: StorageListener

    constructor(
        private configuration: {
            storage: Storage
        }
    ) {
    }

    private readItem = (key: string): BaseItem | undefined => {
        const stringValue = this.configuration.storage.getItem(
            key
        );

        if (stringValue) {
            const item = new ItemSerializer().deserialize(
                stringValue
            );

            if (isBaseItem(item)) {
                return item;
            }
        }

        return undefined;
    }

    private writeItem = (key: string, item: BaseItem): boolean => {
        const currentTimestamp = Date.now();
        item.updatedOn = currentTimestamp;
        item.updatedOn_formatted = new Date(currentTimestamp).toString();
        const itemJsonString = new ItemSerializer().serialize({
            item: item,
            encode: false
        });
        
        try {
            this.configuration.storage.setItem(
                key,
                itemJsonString
            );
            return true;
        } catch {
            return false;
        }
    }

    public get = (key: string): any => {
        const item = this.readItem(
            key
        );

        if (isLocalItem(item)) {
            return item.value;
        }

        return undefined;
    }

    public getRemote = async (
        key: string
    ): Promise<any> => {
        const item = this.readItem(
            key
        );

        if (isRemoteItem(item)) {
            try {
                const response = await fetch(
                    item.url
                );
                const json = await response.json();
                return json;
            } catch {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    public set = (
        key: string,
        value: any
    ): boolean => {
        const item: LocalItem = {
            value
        };
        return this.writeItem(
            key,
            item
        );
    }

    public setRemote = (
        key: string,
        url: string
    ): boolean => {
        const item: RemoteItem = {
            url
        };
        return this.writeItem(
            key,
            item
        );
    }

    public remove = (key: string) => {
        const shouldRemove = this.listener?.shouldRemoveValue ? this.listener.shouldRemoveValue(key) : true;

        if (shouldRemove) {
            this.configuration.storage.removeItem(
                key
            );
        }
    }

    public clear() {
        const data = {
            ...this.configuration.storage
        };

        if (this.listener?.shouldRemoveValue) {
            const keys = Object.keys(data);

            for (const key of keys) {
                const shouldRemove = this.listener.shouldRemoveValue(
                    key
                );

                if (shouldRemove) {
                    this.configuration.storage.removeItem(
                        key
                    );
                }
            }
        } else {
            this.configuration.storage.clear();
        }

        if (this.listener?.onClear) {
            this.listener.onClear(
                data
            );
        }
    }

    public updatedOn = (key: string): number | undefined => {
        const item = this.readItem(
            key
        );
        return item?.updatedOn;
    }

    public getSize = () => {
        try {
            const data = {
                ...this.configuration.storage
            };
            return sizeof(
                data
            );
        } catch {
            return 0;
        }
    }
}

export type OnStorageClearHandler = (
    removedData: {
        [id: string]: any
    }
) => void

export type ShouldRemoveStorageValueHandler = (
    key: string
) => boolean

export interface StorageListener {
    shouldRemoveValue?: ShouldRemoveStorageValueHandler
    onClear?: OnStorageClearHandler
}
