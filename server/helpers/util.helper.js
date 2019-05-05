global.__get = function (string) {
    return string.replace(/ /g, '+');
}