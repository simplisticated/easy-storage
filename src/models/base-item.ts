export interface BaseItem {
    updatedOn?: number,
    updatedOn_formatted?: string
}

export const isBaseItem = (obj: any): obj is BaseItem => {
    if (typeof obj === "object") {
        const requirements = [
            "updatedOn" in obj ? typeof obj["updatedOn"] === "number" : true,
            "updatedOn_formatted" in obj ? typeof obj["updatedOn_formatted"] === "string" : true
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}