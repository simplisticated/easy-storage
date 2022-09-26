export interface BaseItem {
    updatedOn?: number;
    updatedOn_formatted?: string;
}
export declare const isBaseItem: (obj: any) => obj is BaseItem;
