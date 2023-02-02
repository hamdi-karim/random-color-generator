/**
 * Return True if Color is dark
 ** Note: based on Luminosity
 * @param {STRING} hexcolor color in hexadecimal
 * @returns {BOOLEAN} Boolean
 */
function checkIfHexIsDark(hexcolor: string): boolean {
  const r: number = parseInt(hexcolor.slice(1, 3), 16);
  const g: number = parseInt(hexcolor.slice(3, 5), 16);
  const b: number = parseInt(hexcolor.slice(5, 7), 16);

  const yiq: number = (r * 299 + g * 587 + b * 114) / 1000;

  if (yiq < 128) {
    return true;
  }

  return false;
}

export { checkIfHexIsDark };
