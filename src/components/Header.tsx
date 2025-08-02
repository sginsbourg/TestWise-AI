import { FlaskConical } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
      <div className="container mx-auto flex h-16 items-center gap-4">
        <FlaskConical className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          TestWise AI
        </h1>
      </div>
    </header>
  );
}
