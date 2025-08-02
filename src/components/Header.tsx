
import { FlaskConical, LifeBuoy } from 'lucide-react';
import { DocumentationViewer } from '@/components/DocumentationViewer';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="mailto:sginsbourg@gmail.com">
                  <Button variant="outline" className="border-2 border-white/20">
                    <LifeBuoy className="h-5 w-5 mr-2" />
                    Support
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Contact support via email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DocumentationViewer />
        </div>
      </div>
    </header>
  );
}
