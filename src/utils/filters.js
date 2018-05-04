export const maxnum=(num, max, reduce, decimals)=>{
  // Default values
  if (max === undefined || max === 0) {
    //max = 999999999999999; // 999T something is breaking with this...limit?
    max = 99999999999999; // 99T...things break somewhere between 99T and 999T
  }
  if (reduce === undefined) {
    reduce = true;
  }
  if (decimals === undefined) {
    decimals = 2;
  }

  // Coerce to number, and track original value
  var actualNum = num = Number(num);

  // Other parts we might add to formatted value.
  // Return value is num + unit + plus. These get
  // filled as necessary below.
  var unit = '';
  var plus = '';

  // Quick return for edge cases
  if (!num) {
    return '0';
  }

  // Cap the number?
  if (num > max) {
    num = max;
    plus = '+';
    decimals = 0;
  }


  // Reduce the number?
  if (reduce) {

    var units = ['', 'K', 'M', 'B', 'T'];
    var i = parseInt(Math.floor(Math.log(num) / Math.log(1000)), 10);
    unit = units[i];

    num /= Math.pow(1000, i);

    if ((actualNum > 1000) && (actualNum % 1000 !== 0)) {
      plus = '+';
    }
  }

  num = num + unit + plus;
  return num ? num : '0';
}