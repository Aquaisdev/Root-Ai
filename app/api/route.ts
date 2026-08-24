import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// This route runs server-side only. The OpenRouter key is read from the
// server environment (.env.local) and is never sent to the browser.
export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are ROOT AI, the heritage guide chatbot inside the "Heritage GPT" app. You are a Gen-Z Indian heritage guide.

Voice: casual, witty, energetic, Gen-Z but never cringe or slang-overloaded. Think "the smart friend who makes history fun to hear about," not a corporate chatbot and not a caricature.

Rules:
- Speak naturally and conversationally. Answer the user's actual question directly.
- Stay historically accurate. If you are not certain about a fact, say so instead of making it up.
- Keep answers focused on Indian heritage, monuments, culture, mythology and history unless the user clearly asks something else.
- Keep responses concise and readable — most answers should be 2-5 short paragraphs, punchy, not a lecture.
- Be respectful of all cultures and religions discussed, even while being casual in tone.
- If asked "tell me the story like I'm Gen-Z," lean further into energetic, meme-literate storytelling while keeping the facts correct. Use Gen-Z language sparingly and naturally, not in every sentence.
- You may use light formatting (short paragraphs, occasional emoji) but do not overdo it.
- Primarily respond in English unless the user specifically requests Hindi or Kannada. Do not randomly switch languages mid-response.
- Never generate random repeated words, filler fragments, or corrupted/garbled text. Never output incomplete or nonsensical sentences. If you are unsure what the user is asking, ask one short clarifying question instead of guessing badly.`;

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OPENROUTER_API_KEY is not set on the server. Add it to .env.local and restart the dev server.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const messages: IncomingMessage[] = Array.isArray(body?.messages)
      ? body.messages
      : [];

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });

    // Keep the exact model already configured — do not silently substitute.
    const MODEL = "google/gemma-4-26b-a4b-it:free";

    const completion = await client.chat.completions.create({
  model: MODEL,
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ],
  temperature: 0.7,
  max_tokens: 500,
});
    const choice = completion.choices[0];
    const finishReason = choice?.finish_reason ?? "unknown";
    const rawReply = choice?.message?.content?.trim() ?? "";

    // Dev-safe diagnostics — never log the API key or auth headers.
    console.log(
      "[ROOT AI chat]",
      "model:", completion.model ?? MODEL,
      "finish_reason:", finishReason,
      "response_length:", rawReply.length
    );

    // Guard against corrupted/repetitive output (e.g. a word or short
    // phrase repeated back-to-back several times) instead of showing a
    // broken response to the user.
    const looksCorrupted =
      rawReply.length === 0 ||
      /\b(\w+)\b(?:\s+\1\b){2,}/i.test(rawReply) ||
      (finishReason === "length" && rawReply.length < 20);

    const reply = looksCorrupted
      ? "Hmm, that came out a bit garbled on my end — mind asking that again?"
      : rawReply;

    if (looksCorrupted) {
      console.warn(
        "[ROOT AI chat] discarded corrupted output, finish_reason:",
        finishReason
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("ROOT AI chat error:", err);
    return NextResponse.json(
      { error: "ROOT AI hit a snag talking to OpenRouter. Please try again." },
      { status: 500 }
    );
  }
}
