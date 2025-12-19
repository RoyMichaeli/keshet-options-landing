import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">העמוד לא נמצא</h2>
        <Link
          href="/"
          className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
