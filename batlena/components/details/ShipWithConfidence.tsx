"use client";

import {
  MdAddCall,
  MdOutlineSecurity,
} from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { CiCreditCard1 } from "react-icons/ci";
import { Star, MessageCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";


interface Props {
  merchantName?: string | null;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot | undefined;
    crop?: SanityImageCrop;
    _type: "image";
  } | null;
  rating?: number | null;
}

const ShipWithConfidence = ({ image, merchantName, rating }: Props) => {
  const vendorName = merchantName ?? "Unknown";
  const vendorInitials = vendorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const vendorImageUrl = image?.asset ? urlFor(image).width(100).height(100).url() : undefined;
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const { userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      toast.success(
       "Votre message a été envoyé au vendeur avec succès.", 
      );

      // clear the form
      setName("");
      setUsername("");
      setMessage("");
    }, 2000); // simulate 2s network delay
  };

  return (
    <div className="mt-8 rounded-lg border p-5 flex flex-col">
      <h2 className="md:text-2xl text-xl font-bold mb-4">Achetez en toute confiance</h2>

      <ul className="space-y-3 mt-4">
        <li className="flex items-center gap-3">
          <MdOutlineSecurity className="h-5 w-5 " />
          <span className="text-normal font-medium">
            Protection de l&apos;acheteur
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
            Assistance client facile d&apos;accès
          </span>
        </li>
        <li className="flex items-center gap-3">
          <CiCreditCard1 className="h-5 w-5 " />
          <span className="text-normal font-medium">
            Paiement sécurisé et flexible
          </span>
        </li>
      </ul>

      <p className="text-blue-400 font-sm my-6 cursor-pointer">En savoir plus</p>

      {/* Vendor info */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Vendeur</h2>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              {vendorImageUrl ? (
                <AvatarImage src={vendorImageUrl} alt={vendorName} />
              ) : (
                <AvatarFallback>{vendorInitials}</AvatarFallback>
              )}
            </Avatar>

            <div>
              <p className="font-medium leading-tight">{vendorName}</p>

              {rating && (
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="h-4 w-4 text-gray-300" />
                  <span className="ml-1 text-sm text-gray-500">{rating} évaluations</span>
                </div>
              )}
            </div>
          </div>

          <button className="text-sm font-medium text-blue-500 hover:underline whitespace-nowrap">
            Voir son stand
          </button>
        </div>

        <div
          className="text-center justify-center flex items-center p-4 gap-4 mt-4 rounded-sm border cursor-pointer"
          role="button"
          onClick={() => setIsOpen(true)}
        >
          <span>Contactez le vendeur</span>
          <MessageCircle size={16} />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <form onSubmit={handleSubmit}>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Contacter le vendeur</DialogTitle>
              <DialogDescription>
                Entrez vos informations et votre message pour contacter le vendeur.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="username">Votre Email</Label>
                <Input
                  id="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@username"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Entrez votre message..."
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isSubmitting}>Annuler</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting} className="cursor-pointer" onClick={handleSubmit}>
                {isSubmitting ? "Envoi..." : "Envoyer le message"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default ShipWithConfidence;
