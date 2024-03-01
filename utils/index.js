export const checkImageURL = (url) => {
    if (url === null || !url || url == undefined) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        return pattern.test(url);
    }
};

export const convertToIso = (dateString) => {
    var dateParts = dateString.split("-");
    var year = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]) - 1;
    var day = parseInt(dateParts[2]);
    var dateObject = new Date(year, month, day);

    var isoString = dateObject.toISOString();

    return isoString;
}

export const formatDate = (dateIso) => {
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    const date = new Date(dateIso);
    const day = date.getDate(); // Obtenez le jour
    const monthName = months[date.getMonth()]; // Obtenez le nom du mois
    const year = date.getFullYear(); // Obtenez l'année
    return `${day} ${monthName} ${year}`; // Retourne la date formatée
}