import { FlaskConical } from 'lucide-react';

export function Header() {
  return (
    <header className="py-8">
      <div className="container mx-auto flex items-center gap-4">
        <FlaskConical className="h-10 w-10 text-primary drop-shadow-lg" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground" style={{ textShadow: '2px 2px 4px hsla(var(--foreground) / 0.2)'}}>
          TestWise AI
        </h1>
      </div>
    </header>
  );
}
