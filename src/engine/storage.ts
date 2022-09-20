import { BaseItem, isBaseItem } from "../models/base-item";
import { isLocalItem, LocalItem } from "../models/local-item";
import { isRemoteItem, RemoteItem } from "../models/remote-item";
import ItemSerializer from "../serializers/item-serializer";

export default class EasyStorage {

    public static local = new EasyStorage({
        mode: "local"
    });

    public static session = new EasyStorage({
        mode: "session"
    });

    private internalStorage: Storage;
    
    public listener?: StorageListener

    private constructor(
        settings: {
            mode: "local" | "session"
        }
    ) {
        this.internalStorage = (() => {
            switch (settings.mode) {
                case "local":
                    return localStorage;
                case "session":
                    return sessionStorage;
            }
        })();
    }

    private getItem = (key: string): BaseItem | undefined => {
        const stringValue = this.internalStorage.getItem(
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

    public get = (key: string): any => {
        const item = this.getItem(
            key
        );

        if (isLocalItem(item)) {
            return item.value;
        }

        return undefined;
    }

    public getRemote = (
        key: string,
        callback: (value: any) => void
    ) => {
        const item = this.getItem(
            key
        );

        if (isRemoteItem(item)) {
            const remoteItem = item as RemoteItem;

            fetch(remoteItem.url)
                .then(value => {
                    return value.json();
                })
                .then(json => {
                    callback(
                        json
                    );
                })
                .catch(() => {
                    callback(
                        undefined
                    );
                });
        } else {
            callback(
                undefined
            );
        }
    }

    public set = (key: string, value: any) => {
        const currentTimestamp = Date.now();
        const item: LocalItem = {
            value: value,
            updatedOn: currentTimestamp,
            updatedOn_formatted: new Date(currentTimestamp).toString()
        };
        const itemJsonString = new ItemSerializer().serialize({
            item: item,
            encode: false
        });
        this.internalStorage.setItem(
            key,
            itemJsonString
        );
    }

    public setRemote = (key: string, url: string) => {
        const currentTimestamp = Date.now();
        const item: RemoteItem = {
            url: url,
            updatedOn: currentTimestamp,
            updatedOn_formatted: new Date(currentTimestamp).toString()
        };
        const itemJsonString = new ItemSerializer().serialize({
            item: item,
            encode: false
        });
        this.internalStorage.setItem(
            key,
            itemJsonString
        );
    }

    public remove = (key: string) => {
        const shouldRemove = this.listener?.shouldRemoveValue ? this.listener.shouldRemoveValue(key) : true;
        
        if (shouldRemove) {
            this.internalStorage.removeItem(
                key
            );
        }
    }

    public clear() {
        const data = {
            ...this.internalStorage
        };

        if (this.listener?.shouldRemoveValue) {
            const keys = Object.keys(data);

            for (const key of keys) {
                const shouldRemove = this.listener.shouldRemoveValue(
                    key
                );

                if (shouldRemove) {
                    this.internalStorage.removeItem(
                        key
                    );
                }
            }
        } else {
            this.internalStorage.clear();
        }

        if (this.listener?.onClear) {
            this.listener.onClear(
                data
            );
        }
    }

    public updatedOn = (key: string): number | undefined => {
        const item = this.getItem(
            key
        );
        return item?.updatedOn;
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
