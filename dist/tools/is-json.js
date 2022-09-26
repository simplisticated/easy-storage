"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isJSON = (str) => {
    if (typeof str === "string") {
        try {
            return !!(JSON.parse(str) && str);
        }
        catch (_a) {
        }
    }
    return false;
};
exports.default = isJSON;
