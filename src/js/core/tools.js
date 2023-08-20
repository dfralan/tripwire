// check if a string is a valid hex key
function isValidHexKey(key) {
    const hexPattern = /^[0-9a-fA-F]+$/;
    return hexPattern.test(key) && (key.length % 2 === 0);
}

function arrayTags(x){
    const values = x.split(', ');
    const output = values.map(value => `"${encodeURIComponent(value)}"`);
    const arrayedTags = `[${output.join(', ')}]`;
    return arrayedTags
}