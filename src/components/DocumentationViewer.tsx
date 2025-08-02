

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

    doc.setFontSize(18);
    doc.text("TestWise AI - Application Documentation", 10, yPos);
    yPos += 10;

    Object.entries(documentation).forEach(([key, value]) => {
      const category = value as DocCategory;
      
      doc.setFontSize(14);
      doc.text(category.title, 10, yPos);
      yPos += 7;

      doc.setFontSize(10);
      const descriptionLines = doc.splitTextToSize(category.description, 180);
      doc.text(descriptionLines, 15, yPos);
      yPos += descriptionLines.length * 5 + 5;

      Object.entries(category).forEach(([itemKey, itemValue]) => {
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
       yPos += 5;
    });

    doc.save('TestWise_AI_Documentation.pdf');
  };

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
              </div>
            )})}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
