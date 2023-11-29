import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface IProps {
  accordionTrigger: React.ReactNode
  accordionContent: React.ReactNode[]
}

const AccordionTree = ({ accordionTrigger, accordionContent }: IProps) => {
  return (
    <Accordion type="single" collapsible className="w-full ">
      <AccordionItem value="1" className="py-0">
        <AccordionTrigger>{accordionTrigger}</AccordionTrigger>
        {
          accordionContent.map((item, idx) => (
            <AccordionContent key={idx} className="pl-6 pb-0">{item}</AccordionContent>
          ))
        }
      </AccordionItem>
    </Accordion>
  )
}

export default AccordionTree
