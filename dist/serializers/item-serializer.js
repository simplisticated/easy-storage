"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const local_item_1 = require("../models/local-item");
const remote_item_1 = require("../models/remote-item");
const json_serializer_1 = __importDefault(require("./json-serializer"));
class ItemSerializer {
    constructor() {
        this.serialize = (settings) => {
            return new json_serializer_1.default().serialize({
                data: settings.item,
                encode: settings.encode
            });
        };
        this.deserialize = (data) => {
            const json = new json_serializer_1.default().deserialize(data);
            if (json) {
                const isItem = (0, local_item_1.isLocalItem)(json)
                    || (0, remote_item_1.isRemoteItem)(json);
                if (isItem) {
                    return json;
                }
            }
            return undefined;
        };
    }
}
exports.default = ItemSerializer;
