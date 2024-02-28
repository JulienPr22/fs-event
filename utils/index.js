export const checkImageURL = (url) => {
    console.log("url", url);
    if (url === null || !url || url == undefined) return false
    else {
        console.log("test pattern");
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        console.log(pattern.test(url));
        return pattern.test(url);
    }
};