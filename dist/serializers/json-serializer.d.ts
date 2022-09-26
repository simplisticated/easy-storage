export default class JsonSerializer {
    serialize: (settings: {
        data: any;
        encode: boolean;
    }) => string;
    deserialize: (data: string) => any;
}
