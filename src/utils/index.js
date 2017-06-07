
export function bigNumber(number) {
  let ticket  = parseInt(number, 10);
  if (typeof number === 'undefined') {
    return '';
  }
  if ((ticket >= 100000000)) {
    return parseFloat((ticket / 100000000).toFixed(2)) + '亿';
  }
  if (ticket >= 10000) {
    return parseFloat((ticket / 10000).toFixed(2)) + '万';
  }
  return ticket;
}

/**
 * 百分比计算
 * @param count
 * @param number
 */
export function ratioNumber(count, number) {
  return (number / count * 100).toFixed(2);
}