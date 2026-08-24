import BackgroundPattern from "@/components/BackgroundPattern";
import ComicArt from "@/components/ComicArt";
import ComicPanelViewer from "@/components/ComicPanelViewer";
import { hampiStory } from "@/lib/story";

export default function StoryPage() {
  return (
    <div className="relative min-h-screen px-4 py-14 sm:px-6">
      <BackgroundPattern className="opacity-25" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-circuit-bright">
          Story / Comic Mode
        </p>
        <h1 className="mt-2 font-display text-3xl text-sandstone sm:text-4xl">
          The Story of <span className="text-gradient-gold">{hampiStory.name}</span>
        </h1>
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <div className="glass-panel flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center">
          <div className="h-24 w-full overflow-hidden rounded-xl sm:h-20 sm:w-32 sm:shrink-0">
            <ComicArt artKey={hampiStory.heroImage} />
          </div>
          <div>
            <p className="text-sm text-sandstone-dim">
              <span className="font-medium text-gold">{hampiStory.location}</span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-sandstone-dim">
              {hampiStory.importance}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <ComicPanelViewer panels={hampiStory.panels} />
      </div>
    </div>
  );
}
