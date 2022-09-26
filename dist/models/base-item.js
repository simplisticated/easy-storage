"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBaseItem = void 0;
const isBaseItem = (obj) => {
    if (typeof obj === "object") {
        const requirements = [
            "updatedOn" in obj ? typeof obj["updatedOn"] === "number" : true,
            "updatedOn_formatted" in obj ? typeof obj["updatedOn_formatted"] === "string" : true
        ];
        return !requirements.includes(false);
    }
    else {
        return false;
    }
};
exports.isBaseItem = isBaseItem;
