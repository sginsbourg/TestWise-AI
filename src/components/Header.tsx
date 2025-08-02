
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
    <path d="M480,256c0,123.5-100.5,224-224,224S32,379.5,32,256S132.5,32,256,32S480,132.5,480,256z M256,96 c-88.5,0-160,71.5-160,160s71.5,160,160,160s160-71.5,160-160S344.5,96,256,96z"/>
    <path d="M352,256c0-53-43-96-96-96c-39.5,0-73.5,24-88,58.5c-2,5-2,10.5,0,15.5c14.5,34.5,48.5,58.5,88,58.5 C309,256,352,256,352,256z"/>
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
