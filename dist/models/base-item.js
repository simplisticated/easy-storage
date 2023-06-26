"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBaseItem = void 0;
const isBaseItem = (obj) => {
    if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
        const requirements = [
            "updatedOn" in obj ? typeof obj["updatedOn"] === "number" : true
        ];
        return !requirements.includes(false);
    }
    else {
        return false;
    }
};
exports.isBaseItem = isBaseItem;
