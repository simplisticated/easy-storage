"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRemoteItem = void 0;
const isRemoteItem = (obj) => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["url"] === "string"
        ];
        return !requirements.includes(false);
    }
    else {
        return false;
    }
};
exports.isRemoteItem = isRemoteItem;
