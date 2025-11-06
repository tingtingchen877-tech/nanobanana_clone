import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Artist",
    avatar: "SC",
    content:
      "Nano Banana has completely transformed my workflow. The character consistency is unmatched, and I can iterate on ideas in minutes instead of hours.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Content Creator",
    avatar: "MR",
    content:
      "The natural language interface makes it so easy to get exactly what I want. No more fighting with complex tools - just describe it and it happens.",
  },
  {
    name: "Emily Watson",
    role: "Marketing Director",
    avatar: "EW",
    content:
      "We use Nano Banana for all our campaign visuals now. The batch processing feature saves us countless hours, and the results are consistently professional.",
  },
  {
    name: "David Kim",
    role: "Photographer",
    avatar: "DK",
    content:
      "As a photographer, I was skeptical about AI editing. But Nano Banana preserves the artistic integrity of my work while giving me creative superpowers.",
  },
]

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Loved by Creators Worldwide</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Join thousands of artists, designers, and creators using Nano Banana
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
