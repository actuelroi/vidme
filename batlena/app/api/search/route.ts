import { NextRequest, NextResponse } from "next/server";

import { searchClient } from "@/sanity/lib/client";



export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const q = searchParams.get("q")?.toLowerCase() || "";

        if (!q) {
            return NextResponse.json([], { status: 200 });
        }

        const query = `*[
      _type == "product" &&
      (
        name match $search ||
        slug.current match $search ||
        intro match $search ||
        seoDescription match $search ||
        $search in seoKeywords ||
        vendor->name match $search ||
        categories[]->title match $search
      )
    ] | order(name asc){
      ...,
      vendor->{
        _id,
        name,
        image,
        rating
      }
    }`;

        const products = await searchClient.fetch(query, { search: `${q}*` });

        return NextResponse.json(products,
            {
                status: 200,
                headers: {
                    "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
                },
            });
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
