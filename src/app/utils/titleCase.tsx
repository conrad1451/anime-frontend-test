export function toTitleCase(str) {
    if (!str) return ""; // If str is undefined or empty, return an empty string
    
    const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
    str = str
        .toLowerCase()
        .split(' ')
        .map((word, index, array) => {
            if (index > 0 && index < array.length - 1 && smallWords.test(word)) {
                return word.toLowerCase();
            }
            if (word.substr(1).search(/[A-Z]|\../) > -1) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.substr(1);
        })
        .join(' ');
    return str.replace(/\/(\w+)/g, (match, p1) => '/' + p1.charAt(0).toUpperCase() + p1.slice(1))
        .replace(/\((\w+)\)/g, (match, p1) => '(' + p1.charAt(0).toUpperCase() + p1.slice(1) + ')');
}