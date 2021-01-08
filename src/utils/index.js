export const truncate = (fullStr, strLen, separator) => {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || '...';

  const sepLen = separator.length
  const charsToShow = strLen - sepLen
  const frontChars = Math.ceil(charsToShow / 2 + 1) // accounts for the "0x"
  const backChars = Math.floor(charsToShow / 2 - 1) // accounts for the "0x"

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
}