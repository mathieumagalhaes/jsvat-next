import { Country } from '../jsvat';

export const poland: Country = {
  name: 'Poland',
  codes: ['PL', 'POL', '616'],
  calcFn: (vat: string): boolean => {
    let total = 0;

    // Extract the next digit and multiply by the counter.
    for (let i = 0; i < 9; i++) {
      total += Number(vat.charAt(i)) * poland.rules.multipliers.common[i];
    }

    // The remainder is the check digit. A remainder of 10 is not a valid NIP.
    total = total % 11;
    if (total === 10) return false;

    const expect = Number(vat.slice(9, 10));
    return total === expect;
  },
  rules: {
    multipliers: {
      common: [6, 5, 7, 2, 3, 4, 5, 6, 7]
    },
    regex: [/^(PL)(\d{10})$/]
  }
};
