import isJSON from "../tools/is-json";

export default class JsonSerializer {

    public serialize = (
        settings: {
            data: any,
            encode: boolean
        }
    ) => {
        const jsonString = JSON.stringify(
            settings.data
        );

        if (settings.encode) {
            return encodeURIComponent(
                btoa(
                    jsonString
                )
            );
        } else {
            return jsonString;
        }
    }

    public deserialize = (data: string): any => {
        try {
            if (isJSON(data)) {
                const json = JSON.parse(
                    data
                );
                return json;
            } else {
                const decodedStringValue = atob(
                    decodeURIComponent(
                        data
                    )
                );
    
                if (isJSON(decodedStringValue)) {
                    const json = JSON.parse(
                        decodedStringValue
                    );
                    return json;
                } else {
                    return undefined;
                }
            }
        } catch {
            return undefined;
        }
    }
}