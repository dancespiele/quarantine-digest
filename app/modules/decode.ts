export const decode = (interval: string) => {
    const decoded = interval
        .split(" ")
        .map((element) => element.split(","));
    
    return decoded;
}