export const maxnum=(num, max, reduce, decimals)=>{
  if (max === undefined || max === 0) {
    max = 99999999999999;
  }
  if (reduce === undefined) {
    reduce = true;
  }
  if (decimals === undefined) {
    decimals = 2;
  }

  var actualNum = num = Number(num);

  var unit = '';
  var plus = '';

  if (!num) {
    return '0';
  }

  if (num > max) {
    num = max;
    plus = '+';
    decimals = 0;
  }


  if (reduce) {

    var units = ['', 'K', 'M', 'B', 'T'];
    var i = parseInt(Math.floor(Math.log(num) / Math.log(1000)), 10);
    unit = units[i];

    num /= Math.pow(1000, i);
    num = num.toFixedDown(decimals);

    if ((actualNum > 1000) && (actualNum % 1000 !== 0)) {
      plus = '+';
    }
  }

  num = num + unit + plus;
  return num ? num : '0';
}

Number.prototype.toFixedDown = function(digits) {
  var re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)'),
      m = this.toString().match(re);
  return m ? parseFloat(m[1]) : this.valueOf();
};