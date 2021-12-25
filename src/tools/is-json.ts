const isJSON = (str: string) => {
    if (typeof str === "string") {
        try {
            return !!(JSON.parse(str) && str);
        } catch {
        }
    }

    return false;
}

export default isJSON;