
import useCartStore from "@/store";

interface FormattedPriceProps {
  amount: number;
  className?: string;
}

const FormattedPrice = ({ amount, className }: FormattedPriceProps) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  
  return (
    <span className={className}>
     € {formattedAmount}
    </span>
  );
};

export default FormattedPrice;