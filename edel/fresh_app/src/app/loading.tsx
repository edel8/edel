export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          <div className="absolute inset-2 animate-spin rounded-full border-2 border-primary/20 border-b-primary" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
          <span className="text-lg font-serif font-semibold text-primary">E</span>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">جاري التحميل...</p>
      </div>
    </div>
  );
}
