
import { FlaskConical } from 'lucide-react';
import { DocumentationViewer } from '@/components/DocumentationViewer';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FlaskConical className="h-8 w-8 text-primary" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.4))' }}/>
          <h1 className="text-3xl font-bold tracking-tight text-foreground" style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)' }}>
            TestWise AI
          </h1>
        </div>
        <DocumentationViewer />
      </div>
    </header>
  );
}
