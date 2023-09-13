export function getCurrentDate() {
    var month = new Date().getMonth();
    var day = new Date().getDay();
    var year = new Date().getFullYear();

    return month + '/' + day + '/' + year;
}

export function getCurrentDateTime(date: string) {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();

    return date + ' ' + hours + ':' + minutes + ':' + seconds;
}