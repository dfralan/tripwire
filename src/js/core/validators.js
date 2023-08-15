// check if a string is a valid hex key
function isValidHexKey(key) {
    const hexPattern = /^[0-9a-fA-F]+$/;
    return hexPattern.test(key) && (key.length % 2 === 0);
}