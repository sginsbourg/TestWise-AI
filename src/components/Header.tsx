
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
        <div className="flex items-center gap-4">
          <a href="https://opensource.org" target="_blank" rel="noopener noreferrer" aria-label="Open Source Initiative">
            <svg
              width="100"
              height="28"
              viewBox="0 0 128 41"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-auto"
            >
              <title>Open Source Initiative</title>
              <g fill="#3DA442">
                <path d="M20.5 0C9.2 0 0 9.2 0 20.5S9.2 41 20.5 41 41 31.8 41 20.5 31.8 0 20.5 0zm0 38C10.9 38 3 30.1 3 20.5S10.9 3 20.5 3 38 10.9 38 20.5 30.1 38 20.5 38z" />
                <path d="M20.5 14.7c-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8-2.6-5.8-5.8-5.8zm0 8.5c-1.5 0-2.8-1.2-2.8-2.8s1.2-2.8 2.8-2.8 2.8 1.2 2.8 2.8-1.3 2.8-2.8 2.8z" />
                <path d="M28.5 28.3h-16c-.4 0-.8.3-.8.8v2.3c0 .4.3.8.8.8h16c.4 0 .8-.3.8-.8v-2.3c0-.4-.4-.8-.8-.8z" />
              </g>
              <g fill="#000000" fontFamily="Arial, sans-serif" fontSize="16px">
                <text x="48" y="26" fill="#212121">open source</text>
              </g>
            </svg>
          </a>
          <DocumentationViewer />
        </div>
      </div>
    </header>
  );
}
