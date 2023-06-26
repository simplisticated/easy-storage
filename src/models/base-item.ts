export interface BaseItem {
    updatedOn?: number
}

export const isBaseItem = (obj: any): obj is BaseItem => {
    if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
        const requirements = [
            "updatedOn" in obj ? typeof obj["updatedOn"] === "number" : true
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}