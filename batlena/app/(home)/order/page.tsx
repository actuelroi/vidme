import Loading from "@/components/Loading";
import OrdersComponent from "@/components/product/OrdersComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMyOrders } from "@/sanity/helpers";
import { auth } from "@clerk/nextjs/server";
import { FileX } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";


const page = async () => {

    const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);

  return (
    <Suspense fallback={<Loading/>}>
    <div className="py-10">
       {orders?.length ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">
               Liste des Commandes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-25 md:w-auto">
                       Numéro de Commande
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead>
                        Client
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        E-mail
                      </TableHead>
                      <TableHead>
                        Total
                      </TableHead>
                      <TableHead>
                       status
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Numéro de Facture
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                       Lieu de Livraison
                      </TableHead>
                      <TableHead>
                       Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponent orders={orders} />
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <FileX className="h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900">
             Aucune commande trouvée
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
             Il semble que vous n'ayez pas encore passé de commande. Commencez vos achats pour voir vos commandes ici !
            </p>
            <Button asChild className="mt-6">
              <Link href="/">
                Parcourir les Produits
              </Link>
            </Button>
          </div>
        )}
    </div>
    </Suspense>
  )
}

export default page
