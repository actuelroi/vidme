import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


interface Props{
  merchantName?: string | null
}

const ReferencePrices = ({merchantName}:Props) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="reference"
      className="max-w-lg w-full p-4 border rounded-sm"
    >
      <AccordionItem value="reference">
        <AccordionTrigger className="text-xl font-semibold">
          Prix de référence
        </AccordionTrigger>

        <AccordionContent className="px-4 pb-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            Un prix de référence est fourni par le vendeur de l&apos;article
            (
              {
                merchantName && 
                <span className="font-medium">
                {merchantName}
                </span>
              }
              
            ). Le
            pourcentage de réduction et les économies indiquées sont basés sur
            ce prix de référence.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mt-3">
            Les vendeurs ne sont pas tenus de fournir un prix de référence,
            mais s&apos;ils le font, celui-ci doit être :
          </p>

          <ul className="list-disc list-inside text-lg text-gray-700 mt-2 space-y-1">
            <li>
              le prix de détail suggéré par le fabricant (PDSF) ou un prix
              catalogue similaire du produit ;
            </li>
            <li>
              le prix auquel l&apos;article a été récemment proposé à la
              vente pendant une période raisonnable.
            </li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed mt-3">
            Le prix de référence peut vous donner une indication de la valeur
            du produit, mais certains magasins peuvent vendre l&apos;article à
            un prix inférieur.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Si vous estimez qu&apos;un prix de référence est inexact ou
            trompeur, veuillez le signaler en envoyant l&apos;URL de
            l&apos;annonce à&nbsp;
            <a
              href="mailto:report-abuse@batlena.com"
              className="text-blue-500 hover:underline"
            >
              report-abuse@batlena.com
            </a>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ReferencePrices;
