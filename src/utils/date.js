export function unixToDate(timestamp) {
    return new Date(timestamp * 1000);
}

export function unixToISOString(timestamp) {
    return new Date(timestamp * 1000).toISOString();
}