"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRemoteItem = void 0;
const base_item_1 = require("./base-item");
const isRemoteItem = (obj) => {
    if ((0, base_item_1.isBaseItem)(obj)) {
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
