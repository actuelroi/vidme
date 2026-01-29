import React from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Logo from "./new/Logo";
import { useTranslations } from "next-intl";

const NoAccessToCart = () => {
  const t = useTranslations('auth.cartAccess');

  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Logo>BatleNA</Logo>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {t('title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center font-medium">
            {t('description')}
          </p>
          <SignInButton mode="modal">
            <Button className="w-full font-semibold" size="lg">
              {t('signIn')}
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            {t('noAccount')}
          </div>
          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full" size="lg">
              {t('createAccount')}
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccessToCart;