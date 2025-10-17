// FAQPage.tsx
import { useParams, } from "react-router-dom";
import { FaqsTableData } from "@/data/Data";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function Viewfaq() {
  const { id } = useParams<{ id: string }>();
  const entry = FaqsTableData.find(x => x.id === id);

  if (!entry) {
    return (
      <div className="p-6">
          <p className="mb-4">No FAQs found for ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto">

      <header className="mt-2 mb-6">
        <p className="text-xs uppercase tracking-wider text-[var(--text)]">{entry.For}</p>
        <h1 className="text-3xl font-semibold text-[var(--text-head)]">{entry["Page Title"]}</h1>
        <div className="text-sm text-[var(--text)] mt-1">
          Last Updated: {entry["Last Updated"]} • Status: {entry.Status} • {entry.Questions} Questions
        </div>
      </header>

      <Accordion type="single" collapsible className="w-full">
        {entry.FAQ?.map((qa, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger className="text-left text-[var(--text-head)]">{qa.question}</AccordionTrigger>
            <AccordionContent className="text-[var(--text)]">
              {qa.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
