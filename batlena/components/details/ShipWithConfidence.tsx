import {
  Lock,
  RefreshCcw,
  Headphones,
  CreditCard,
  Star,
  MessageSquare,
  MessageCircle,
} from "lucide-react";
import { CiCreditCard1 } from "react-icons/ci";
import { MdAddCall, MdOutlineSecurity } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ShipWithConfidence = () => {
  return (
    <div className="mt-8 rounded-lg border p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">
        Achetez en toute confiance
      </h2>

      <ul className="space-y-3 mt-4">
        <li className="flex items-center gap-3">
          <MdOutlineSecurity className="h-5 w-5 " />
          <span className="text-normal font-medium">
           Protection de l’acheteur
          </span>
        </li>

        <li className="flex items-center gap-3">
          <TbTruckReturn className="h-5 w-5 " />
          <span className="text-normal font-medium">
             Retours gratuits sous 30 jours
          </span>
        </li>

        <li className="flex items-center gap-3">
          <MdAddCall className="h-5 w-5 " />
          <span className="text-normal font-medium">
           Assistance client facile d’accès
          </span>
        </li>

        <li className="flex items-center gap-3">
          <CiCreditCard1 className="h-5 w-5 " />
          <span className="text-normal font-medium">
             Paiement sécurisé et flexible
          </span>
        </li>
      </ul>
      <p className="text-blue-400 font-sm my-6">En savoir plus</p>

      <div className="mt-8 border-t pt-6 justify-end">
        <h2 className="text-xl font-semibold mb-4">Vendeur</h2>

        <div className="flex items-center justify-between gap-4">
          {/* Seller info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="Martin wo"
              />
              <AvatarFallback>MW</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium leading-tight">Martin wo</p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <Star className="h-4 w-4 text-gray-300" />
                <span className="ml-1 text-sm text-gray-500">
                  198 évaluations
                </span>
              </div>
            </div>
          </div>

          {/* Link */}
          <button className="text-sm font-medium text-blue-500 hover:underline whitespace-nowrap">
            Voir son stand
          </button>
        </div>
        <div className="text-center justify-center flex items-center p-4 gap-4 mt-4 rounded-sm border cursor-pointer">
          <span className="">Contactez le vendeur</span>
          <MessageCircle size={16}/>
        </div>
       
      </div>

    </div>
  );
};

export default ShipWithConfidence;
