export const chunck = (arr, len) => {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

export const getMaxHeight = (arr, attr) => arr.reduce(function (prev, current) {
    return (prev[attr].value > current[attr].value) ? prev : current
});


export const diff = (from, to) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const arr = [];
    const datFrom = new Date(from);
    const datTo = new Date(to);
    const fromYear = datFrom.getFullYear();
    const toYear = datTo.getFullYear();
    const diffYear = (12 * (toYear - fromYear)) + datTo.getMonth();

    for (var i = datFrom.getMonth(); i <= diffYear; i++) {
        arr.push(monthNames[i % 12] + " " + Math.floor(fromYear + (i / 12)));
    }

    return arr;
}

