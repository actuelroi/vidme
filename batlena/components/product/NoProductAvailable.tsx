"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";


const NoProductAvailable = ({
  selectedTab,
  className,
}: {
  selectedTab: string;
  className?: string;
}) => {

  useEffect(() => {
     const hero = document.getElementById('sale-hero')
     if (hero) {
       const height = hero.offsetHeight
       window.scrollTo({ top: height, behavior: 'smooth' })
     }
   }, [])
  
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">
        Aucun produit disponible
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600"
      >
        Désolé, aucun produit n&apos;est disponible pour cette catégorie pour le moment.{" "}
        <span className="text-base font-semibold text-darkColor">
          {selectedTab}
        </span>{" "}
       
      </motion.p>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="flex items-center space-x-2 text-blue-600"
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Nous réapprovisionnons bientôt</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500"
      >
        Veuillez revenir plus tard ou explorer nos autres catégories de produits.
      </motion.p>

      <Button asChild className="mt-6">
              <Link href="/">
                Parcourir d&apos;autres categories
              </Link>
            </Button>
    </div>
  );
};

export default NoProductAvailable;