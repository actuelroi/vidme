import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined | null;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  if (amount === undefined || amount === null) {
    return (
      <span className={twMerge("text-sm font-semibold text-darkColor", className)}>
        -
      </span>
    );
  }

  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <span className={twMerge("text-sm font-semibold text-darkColor", className)}>
      {formattedAmount}
    </span>
  );
};

export default PriceFormatter;
