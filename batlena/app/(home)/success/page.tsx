import SuccessClient from "@/components/success/SuccessClient";
import { Metadata } from "next";


export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Order Success",
  description: "Your order has been confirmed successfully",
};

const  page=()=> {
  return <SuccessClient />;
}

export default page