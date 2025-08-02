

"use client";

import { useState } from 'react';
import { BookOpen, Download, X } from 'lucide-react';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { documentation, type DocCategory } from '@/lib/documentation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function DocumentationViewer() {
  const [isOpen, setIsOpen] = useState(false);

  const generatePdf = () => {
    const doc = new jsPDF();
    let yPos = 15;

    const renderSection = (title: string, content: any, isFirst: boolean) => {
      if (!isFirst) {
        yPos += 5;
      }
      doc.setFontSize(18);
      doc.text(title, 10, yPos);
      yPos += 10;

      if (typeof content === 'string') {
        const descriptionLines = doc.splitTextToSize(content, 180);
        doc.setFontSize(10);
        doc.text(descriptionLines, 15, yPos);
        yPos += descriptionLines.length * 5 + 5;
      } else if(content.title === "For more information:") {
          doc.setFontSize(12);
          doc.text(content.name, 15, yPos);
          yPos += 6;
          doc.setFontSize(10);
          content.roles.forEach((role: string) => {
            const roleLines = doc.splitTextToSize(role, 170);
            doc.text(roleLines, 20, yPos);
            yPos += roleLines.length * 5 + 2;
          });
           yPos += 3;
           const websiteLines = doc.splitTextToSize(content.website, 170);
           doc.text(websiteLines, 20, yPos);
           yPos += websiteLines.length * 5 + 5;

           const experienceLines = doc.splitTextToSize(content.experience, 170);
           doc.text(experienceLines, 15, yPos);
           yPos += experienceLines.length * 5 + 5;

           content.education.forEach((edu: string) => {
            const eduLines = doc.splitTextToSize(edu, 170);
            doc.text(eduLines, 15, yPos);
            yPos += eduLines.length * 5 + 2;
          });
          yPos += 3;
          const contactLines = doc.splitTextToSize(`Mobile: ${content.contact.mobile} | Email: ${content.contact.email}`, 170);
          doc.text(contactLines, 15, yPos);
          yPos += contactLines.length * 5 + 5;

          const linkedinLines = doc.splitTextToSize(`LinkedIn: ${content.linkedin}`, 170);
          doc.text(linkedinLines, 15, yPos);
          yPos += linkedinLines.length * 5 + 5;

          const githubLines = doc.splitTextToSize(`GitHub: ${content.github}`, 170);
          doc.text(githubLines, 15, yPos);
          yPos += githubLines.length * 5 + 5;

      } else {
        const descriptionLines = doc.splitTextToSize(content.description, 180);
        doc.setFontSize(10);
        doc.text(descriptionLines, 15, yPos);
        yPos += descriptionLines.length * 5 + 5;
        
        Object.entries(content).forEach(([itemKey, itemValue]) => {
          if (typeof itemValue === 'object' && itemValue !== null && 'tooltip' in itemValue) {
            doc.setFontSize(12);
            doc.text(itemValue.label, 15, yPos);
            yPos += 6;

            doc.setFontSize(10);
            const tooltipLines = doc.splitTextToSize(itemValue.tooltip, 170);
            doc.text(tooltipLines, 20, yPos);
            yPos += tooltipLines.length * 5 + 5;
          }
        });
      }
    };

    Object.entries(documentation).forEach(([key, value], index) => {
      const category = value as DocCategory;
      renderSection(category.title, key === 'general' ? category.description : category, index === 0);
    });
    
    doc.save('TestWise_AI_Documentation.pdf');
  };

  const renderInfoSection = (info: any) => (
    <div className="text-sm pl-4 border-l-2 border-border">
      <h3 className="font-bold text-lg">{info.name}</h3>
      <div className="mt-2 space-y-1">
        {info.roles.map((role: string, index: number) => <p key={index}>{role}</p>)}
        <p className="pt-2">{info.website}</p>
      </div>
      <p className="mt-4">{info.experience}</p>
      <div className="mt-4 space-y-1">
        {info.education.map((edu: string, index: number) => <p key={index}>{edu}</p>)}
      </div>
      <div className="mt-4 space-y-1">
        <p><strong>Mobile:</strong> {info.contact.mobile}</p>
        <p><strong>Email:</strong> {info.contact.email}</p>
      </div>
      <div className="mt-4 space-y-2">
        <p><a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent underline">Visit my page on LinkedIn</a></p>
        <p><a href={info.github} target="_blank" rel="noopener noreferrer" className="text-accent underline">Download this open-source app from GitHub</a></p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-2 border-white/20">
                <BookOpen className="h-5 w-5 mr-2" />
                Documentation
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Review and export all documentation</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col border-white/20">
        <DialogHeader>
          <DialogTitle className='flex items-center justify-between'>
            Application Documentation
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={generatePdf}>
                    <Download className="h-5 w-5" />
                    <span className='sr-only'>Export to PDF</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download documentation as PDF</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6">
          <div className="space-y-6">
            {Object.entries(documentation).map(([key, value]) => {
              const category = value as DocCategory;
              return (
              <div key={key}>
                <h2 className="text-2xl font-bold text-primary mb-2">{category.title}</h2>
                { key === 'forMoreInformation' ? (
                  renderInfoSection(category)
                ) : (
                  <>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <div className="space-y-3 pl-4 border-l-2 border-border">
                        {Object.entries(category).map(([itemKey, itemValue]) => {
                          if (typeof itemValue === 'object' && itemValue !== null && 'tooltip' in itemValue) {
                            return (
                              <div key={itemKey}>
                                <h4 className="font-semibold text-accent">{itemValue.label}</h4>
                                <p className="text-sm">{itemValue.tooltip}</p>
                              </div>
                            );
                          }
                          if (itemKey === 'feedback' && typeof itemValue === 'object' && itemValue !== null) {
                              return (
                                <div key={itemKey}>
                                  <h4 className="font-semibold text-accent">Feedback Buttons</h4>
                                  {Object.values(itemValue).map((feedback, index) => (
                                    <p key={index} className="text-sm mt-1">&#8226; {feedback}</p>
                                  ))}
                                </div>
                              )
                          }
                          return null;
                        })}
                    </div>
                  </>
                )}
              </div>
            )})}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
