"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_json_1 = __importDefault(require("../tools/is-json"));
class JsonSerializer {
    constructor() {
        this.serialize = (settings) => {
            const jsonString = JSON.stringify(settings.data);
            if (settings.encode) {
                return encodeURIComponent(btoa(jsonString));
            }
            else {
                return jsonString;
            }
        };
        this.deserialize = (data) => {
            try {
                if ((0, is_json_1.default)(data)) {
                    const json = JSON.parse(data);
                    return json;
                }
                else {
                    const decodedStringValue = atob(decodeURIComponent(data));
                    if ((0, is_json_1.default)(decodedStringValue)) {
                        const json = JSON.parse(decodedStringValue);
                        return json;
                    }
                    else {
                        return undefined;
                    }
                }
            }
            catch (_a) {
                return undefined;
            }
        };
    }
}
exports.default = JsonSerializer;
