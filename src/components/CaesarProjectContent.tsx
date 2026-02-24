type CaesarProjectContentProps = {
  project?: ResolvedProject;
  hideScreenshots?: boolean;
};

export function CaesarProjectContent({ project, hideScreenshots }: CaesarProjectContentProps) {
  return (
    <div className="space-y-24">
      {/* Quote ... */}

      {/* Interaction Concepts ... */}

      {!hideScreenshots && project?.galleryUrls?.[0] && (
        <section className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
          <BrowserMockup
            src={project.galleryUrls[0]}
            alt="CAESAR Report UI"
            urlBar="https://caesar-report.internal"
          />
        </section>
      )}
    </div>
  );
}