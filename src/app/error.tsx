"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">משהו השתבש</h2>
        <button
          onClick={() => reset()}
          className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90"
        >
          נסה שוב
        </button>
      </div>
    </div>
  );
}
