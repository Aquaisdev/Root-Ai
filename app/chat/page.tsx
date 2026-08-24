import BackgroundPattern from "@/components/BackgroundPattern";
import ChatWidget from "@/components/ChatWidget";

export default function ChatPage() {
  return (
    <div className="relative flex flex-col items-center px-4 py-12 sm:px-6">
      <BackgroundPattern variant="circuit" className="opacity-30" />
      <div className="mb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-circuit-bright">
          Live Session
        </p>
        <h1 className="mt-2 font-display text-3xl text-sandstone sm:text-4xl">
          Talk to <span className="text-gradient-gold">ROOT AI</span>
        </h1>
      </div>
      <div className="w-full max-w-3xl">
        <ChatWidget />
      </div>
    </div>
  );
}
