"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_item_1 = require("../models/base-item");
const local_item_1 = require("../models/local-item");
const remote_item_1 = require("../models/remote-item");
const item_serializer_1 = __importDefault(require("../serializers/item-serializer"));
const object_sizeof_1 = __importDefault(require("object-sizeof"));
class EasyStorage {
    constructor(configuration) {
        this.configuration = configuration;
        this.readItem = (key) => {
            const stringValue = this.configuration.storage.getItem(key);
            if (stringValue) {
                const item = new item_serializer_1.default().deserialize(stringValue);
                if ((0, base_item_1.isBaseItem)(item)) {
                    return item;
                }
            }
            return undefined;
        };
        this.writeItem = (key, item) => {
            const currentTimestamp = Date.now();
            item.updatedOn = currentTimestamp;
            const itemJsonString = new item_serializer_1.default().serialize({
                item: item,
                encode: false
            });
            try {
                this.configuration.storage.setItem(key, itemJsonString);
                return true;
            }
            catch (_a) {
                return false;
            }
        };
        this.get = (key) => {
            const item = this.readItem(key);
            if ((0, local_item_1.isLocalItem)(item)) {
                return item.value;
            }
            return undefined;
        };
        this.getRemote = (key) => __awaiter(this, void 0, void 0, function* () {
            const item = this.readItem(key);
            if ((0, remote_item_1.isRemoteItem)(item)) {
                try {
                    const response = yield fetch(item.url);
                    const json = yield response.json();
                    return json;
                }
                catch (_a) {
                    return undefined;
                }
            }
            else {
                return undefined;
            }
        });
        this.set = (key, value) => {
            const item = {
                value
            };
            return this.writeItem(key, item);
        };
        this.setRemote = (key, url) => {
            const item = {
                url
            };
            return this.writeItem(key, item);
        };
        this.remove = (key) => {
            var _a;
            const shouldRemove = ((_a = this.listener) === null || _a === void 0 ? void 0 : _a.shouldRemoveValue) ? this.listener.shouldRemoveValue(key) : true;
            if (shouldRemove) {
                this.configuration.storage.removeItem(key);
            }
        };
        this.updatedOn = (key) => {
            const item = this.readItem(key);
            return item === null || item === void 0 ? void 0 : item.updatedOn;
        };
        this.getSize = () => {
            try {
                const data = Object.assign({}, this.configuration.storage);
                return (0, object_sizeof_1.default)(data);
            }
            catch (_a) {
                return 0;
            }
        };
    }
    clear() {
        var _a, _b;
        const data = Object.assign({}, this.configuration.storage);
        if ((_a = this.listener) === null || _a === void 0 ? void 0 : _a.shouldRemoveValue) {
            const keys = Object.keys(data);
            for (const key of keys) {
                const shouldRemove = this.listener.shouldRemoveValue(key);
                if (shouldRemove) {
                    this.configuration.storage.removeItem(key);
                }
            }
        }
        else {
            this.configuration.storage.clear();
        }
        if ((_b = this.listener) === null || _b === void 0 ? void 0 : _b.onClear) {
            this.listener.onClear(data);
        }
    }
}
exports.default = EasyStorage;
EasyStorage.local = (() => {
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
        return new EasyStorage({
            storage: window.localStorage
        });
    }
})();
EasyStorage.session = (() => {
    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
        return new EasyStorage({
            storage: window.sessionStorage
        });
    }
})();
