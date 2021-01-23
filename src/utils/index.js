const truncate = (fullStr, strLen, separator, sepLength) => {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || '...'

  const sepLen = separator.length
  const charsToShow = strLen - sepLen
  const frontChars = Math.ceil(sepLength || charsToShow / 2 + 1) // accounts for the "0x"
  const backChars = Math.floor(charsToShow / 2 - 1) // accounts for the "0x"

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
}

const createLocationNumberObject = (length, day = false) => {
  const numArray = Array.from({ length: length + 1 }, (_, k) => {
    if (k === 0) return 0;
    return k;
  });
  if (day) numArray.shift();
  const object = {};
  numArray.forEach((number) => (object[`number_${number}`] = number));
  return object;
};


export {
  truncate,
  createLocationNumberObject,
}