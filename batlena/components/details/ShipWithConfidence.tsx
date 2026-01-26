import {
  Lock,
  RefreshCcw,
  Headphones,
  CreditCard,
} from "lucide-react";

const ShipWithConfidence = () => {
  return (
    <div className="mt-8 rounded-lg border p-5">
      <h2 className="text-xl font-semibold mb-4">
        Ship With Confidence
      </h2>

      <ul className="space-y-3">
        <li className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium">
            Buyer protection
          </span>
        </li>

        <li className="flex items-center gap-3">
          <RefreshCcw className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium">
            30-day hassle-free returns
          </span>
        </li>

        <li className="flex items-center gap-3">
          <Headphones className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-medium">
            Easy access to support
          </span>
        </li>

        <li className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-orange-600" />
          <span className="text-sm font-medium">
            Secure & flexible payment options
          </span>
        </li>
      </ul>
      <p className="text-blue-400 font-sm">Learn more</p>
    </div>
  );
};

export default ShipWithConfidence;
