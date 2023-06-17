function randomChar() {
  let index = Math.floor(Math.random() * 62);
  if (index < 10) {
    return String(index);
  
  } else if (index < 36) {
    return String.fromCharCode(index + 55);
  } else {
    
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
