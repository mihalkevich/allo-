
export function PublicFooter() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Allo Services. All rights reserved.
        <p className="mt-1">
          Your reliable partner for global communication solutions.
        </p>
      </div>
    </footer>
  );
}
