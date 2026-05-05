import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * UTILITY: Internal Fetch Wrapper
 * Standardizes headers and environment variable injection.
 */
async function backendFetch(endpoint: string, options: RequestInit = {}) {
  const session = await auth();
  const token = session?.accessToken;

  if (!token) return null;

  const baseUrl = process.env.BACKEND_URL;
  const url = `${baseUrl}${endpoint}`;

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
}

// GET: Fetch user businesses
export async function GET() {
  try {
    const response = await backendFetch("/business/multi", {
      method: "GET",
      // Next.js 16: Ensure this request is fresh for the terminal switchboard
      cache: "no-store",
    });

    if (!response) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        { error: data.message || "No business found" },
        { status: response.status },
      );
    }

    // Backend returns { status: true, data: [...] } -> We return data.data
    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST: Register a business
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await backendFetch("/business/register-business", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}

// PATCH: Update a business
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const response = await backendFetch("/business/businesses", {
      method: "PUT", // Logic preserved from your axios .put call
      body: JSON.stringify(body),
    });

    if (!response) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await response.json();
    if (!response.ok || !data.status) {
      return NextResponse.json(
        { error: "Failed to update business" },
        { status: 400 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE: Delete a business
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const response = await backendFetch("/business/businesses", {
      method: "DELETE",
      body: JSON.stringify(body),
    });

    if (!response) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await response.json();
    if (!response.ok || !data.status) {
      return NextResponse.json(
        { error: "Failed to delete business" },
        { status: 400 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
  }
}