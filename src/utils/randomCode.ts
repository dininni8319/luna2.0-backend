function randomChar() {
  var index = Math.floor(Math.random() * 62);
  // Generate Number character
  if (index < 10) {
    return String(index);
    // Generate capital letters
  } else if (index < 36) {
    return String.fromCharCode(index + 55);
  } else {
    // Generate small-case letters
    return String.fromCharCode(index + 61);
  }
}

export function randomString(length = 8) {
  let result = "";
  while (length > 0) {
    result += randomChar();
    length--;
  }
  return result;
}
