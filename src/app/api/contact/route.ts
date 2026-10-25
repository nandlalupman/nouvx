import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, company, focus_area, timeline, requirements } = body;

    // Validate required fields
    if (!full_name || !email || !company || !requirements) {
      return NextResponse.json(
        { error: "Missing required fields: full_name, email, company, requirements" },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({
        full_name,
        email,
        company,
        focus_area: focus_area || "Full-Stack Physical AI Platform",
        timeline: timeline || "Immediate (Production Readiness)",
        requirements,
      })
      .select()
      .single();

    if (error) {
      console.error("Contact submission error:", error);
      return NextResponse.json(
        { error: "Failed to submit contact form" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
