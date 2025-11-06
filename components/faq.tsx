import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does Nano Banana compare to other AI image editors?",
    answer:
      "Nano Banana uses advanced AI models that excel at character consistency and scene preservation, outperforming tools like Flux Kontext. Our natural language interface makes complex edits simple, and our batch processing capabilities save significant time.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support all common image formats including JPG, PNG, WebP, and HEIC. Maximum file size is 50MB per image. For batch processing, you can upload up to 9 images at once.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. Your images are processed securely and are never stored permanently on our servers. We use enterprise-grade encryption and comply with GDPR and other privacy regulations.",
  },
  {
    question: "Can I use Nano Banana for commercial projects?",
    answer:
      "Yes! All images generated with Nano Banana can be used for commercial purposes. Our Pro and Enterprise plans include full commercial licensing rights.",
  },
  {
    question: "What kind of edits can I make?",
    answer:
      "You can make virtually any edit using natural language prompts: change lighting, add or remove objects, transform styles, enhance details, change backgrounds, and much more. The AI understands context and maintains consistency.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes! New users get 10 free generations to try out Nano Banana. No credit card required. You can upgrade to a paid plan anytime for unlimited generations and advanced features.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Everything you need to know about Nano Banana
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
