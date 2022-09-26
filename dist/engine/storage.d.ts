export default class EasyStorage {
    private configuration;
    static local: EasyStorage;
    static session: EasyStorage;
    listener?: StorageListener;
    constructor(configuration: {
        storage: Storage;
    });
    private readItem;
    private writeItem;
    get: (key: string) => any;
    getRemote: (key: string) => Promise<any>;
    set: (key: string, value: any) => boolean;
    setRemote: (key: string, url: string) => boolean;
    remove: (key: string) => void;
    clear(): void;
    updatedOn: (key: string) => number | undefined;
    getSize: () => number;
}
export declare type OnStorageClearHandler = (removedData: {
    [id: string]: any;
}) => void;
export declare type ShouldRemoveStorageValueHandler = (key: string) => boolean;
export interface StorageListener {
    shouldRemoveValue?: ShouldRemoveStorageValueHandler;
    onClear?: OnStorageClearHandler;
}
