import { NextRequest, NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req: NextRequest) {
  try {
    const { clerkUserId, productId, name, email } = await req.json();

    if (!clerkUserId || !productId) {
      return NextResponse.json(
        { error: "Missing clerkUserId or productId" },
        { status: 400 }
      );
    }

    // Fetch user
    const user = await backendClient.fetch(
      `*[_type=="user" && clerkUserId==$id][0]`,
      { id: clerkUserId }
    );

    // Create user if not exists
    if (!user) {
      await backendClient.create({
        _type: "user",
        clerkUserId,
        name,
        email,
        favorites: [
          { _type: "reference", _ref: productId },
        ],
      });

      return NextResponse.json({ added: true });
    }

    const isFavorite = user.favorites?.some(
      (fav: any) => fav._ref === productId
    );

    const patch = backendClient
      .patch(user._id)
      .setIfMissing({ favorites: [] });

    if (isFavorite) {
      // ✅ REMOVE from favorites
      patch.unset([`favorites[_ref=="${productId}"]`]);
    } else {
      // ✅ ADD to favorites
      patch.insert("after", "favorites[-1]", [
        { _type: "reference", _ref: productId },
      ]);
    }

    await patch.commit();

    return NextResponse.json({ added: !isFavorite });
  } catch (error) {
    console.error("Favorite route error:", error);
    return NextResponse.json(
      { error: "Failed to update favorites" },
      { status: 500 }
    );
  }
}
