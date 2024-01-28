import {formatNumberWithCommas} from '@/utils/formatNumberWithCommas';

interface GenerateAmountWithCurrencyProps {
  symbol?: string | null;
  amount?: string | number | null;
  currencyName?: string | null;
  showCurrencyName?: boolean;
}

export function generateAmountWithCurrency(
  props: GenerateAmountWithCurrencyProps,
): string {
  let amount = formatNumberWithCommas(props?.amount);

  return `${props?.symbol ?? ''}${amount} ${
    props?.showCurrencyName ? props?.currencyName : ''
  }`.trim();
}
