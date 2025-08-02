
import { FlaskConical } from 'lucide-react';
import { DocumentationViewer } from '@/components/DocumentationViewer';

const OpenSourceLogo = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512" 
    className="h-8 w-8 text-primary" 
    style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.4))' }}
    fill="currentColor"
  >
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"/>
    <path d="M276.9 141.9c-29-20.9-68-15.6-92.4 12.3-25.1 28.6-22.9 71.1 5.6 96.2l-45.3 45.3c-21.3 21.3-21.3 55.9 0 77.2 21.3 21.3 55.9 21.3 77.2 0l45.3-45.3c25.1 28.6 67.6 30.7 96.2 5.6 28.6-25.1 30.7-67.6 5.6-96.2l-22.4-22.4c-20.9-29-15.6-68 12.3-92.4-28.5-25.1-71-22.9-96.1 5.6z"/>
  </svg>
)

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FlaskConical className="h-8 w-8 text-primary" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.4))' }}/>
          <h1 className="text-3xl font-bold tracking-tight text-foreground" style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)' }}>
            TestWise AI
          </h1>
          <a href="https://opensource.org/" target="_blank" rel="noopener noreferrer" aria-label="Open Source Initiative Website">
            <OpenSourceLogo />
          </a>
        </div>
        <DocumentationViewer />
      </div>
    </header>
  );
}
