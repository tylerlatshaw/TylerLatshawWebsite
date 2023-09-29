export function getCurrentDate() {
    var month = new Date().getMonth() + 1;
    var date = new Date().getDate();
    var year = new Date().getFullYear();

    return month + "/" + date + "/" + year;
}

export function getCurrentDateISOFormat() {
    var month = new Date().getMonth();
    var date = new Date().getDate();
    var year = new Date().getFullYear();

    const fullDate = new Date(year, month, date);
    const result = fullDate.toISOString().substring(0, 10);

    return result;
}

export function getCurrentDateTime(date: string) {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();

    return date + " " + hours + ":" + minutes + ":" + seconds;
}