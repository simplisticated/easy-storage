"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLocalItem = void 0;
const base_item_1 = require("./base-item");
const isLocalItem = (obj) => {
    if ((0, base_item_1.isBaseItem)(obj)) {
        const requirements = [
            true
        ];
        return !requirements.includes(false);
    }
    else {
        return false;
    }
};
exports.isLocalItem = isLocalItem;
