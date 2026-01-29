import Logo from "../header/Logo";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const NoAccessToCart = () => {
 

  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Logo/>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
           Content de vous revoir !
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center font-medium">
           Connectez-vous pour voir les articles de votre panier et finaliser votre commande. Ne manquez pas vos produits préférés !
          </p>
          <SignInButton mode="modal">
            <Button className="w-full font-semibold" size="lg">
              Se connecter
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Vous n'avez pas de compte ?
          </div>
          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full" size="lg">
              Créer un compte
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccessToCart;