'use strict';
const MAX = 1000000000000n;
function bound(n) { if (n < 0n || n > MAX) throw Error('Amount is outside the supported range.'); return Number(n); }
function integer(n, min = 0, max = 1e12) { if (!Number.isSafeInteger(n) || n < min || n > max) throw Error('Invalid whole number.'); return n; }
function parseMinor(value) {
  if (!/^\d+(?:\.\d{0,2})?$/.test(String(value).trim())) throw Error('Enter an amount with up to two decimal places.');
  const [a, b = ''] = String(value).trim().split('.'); return bound(BigInt(a) * 100n + BigInt(b.padEnd(2, '0')));
}
function calculate(item, quantity, discount = 0, limit = 0, override) {
  integer(quantity, 1, 10000); integer(discount); integer(limit, 0, 10000);
  const unit = integer(override ?? item.unit_price_minor), subtotal = BigInt(unit) * BigInt(quantity);
  const pct = (n, b) => (n * b + 5000n) / 10000n;
  if (BigInt(discount) > subtotal || BigInt(discount) > pct(subtotal, BigInt(limit))) throw Error('Discount exceeds the allowed limit.');
  const net = subtotal - BigInt(discount); let bps = 0n, fixed = 0n;
  for (const rule of item.tax_rules) {
    integer(rule.value);
    if (rule.type === 'percent') bps += BigInt(rule.value);
    else if (rule.type === 'amount') fixed += BigInt(rule.value) * BigInt(quantity);
    else throw Error('Unsupported tax rule.');
  }
  if (bps > 10000n || (item.tax_inclusive && fixed > net)) throw Error('Invalid tax policy.');
  const tax = item.tax_inclusive ? net - ((net - fixed) * 10000n + (10000n + bps) / 2n) / (10000n + bps) : pct(net, bps) + fixed;
  const before = item.tax_inclusive ? net : net + tax, gst = pct(before, BigInt(integer(item.gst_bps, 0, 10000)));
  return {unit_price_minor: unit, subtotal_minor: bound(subtotal), discount_minor: discount, tax_minor: bound(tax + gst), total_minor: bound(before + gst)};
}
module.exports = {bound, integer, parseMinor, calculate};
