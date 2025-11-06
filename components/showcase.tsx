import { Card, CardContent } from "@/components/ui/card"

const showcaseItems = [
  {
    title: "Portrait Enhancement",
    before: "/portrait-photo-before.jpg",
    after: "/enhanced-portrait-photo.jpg",
    prompt: "Professional studio lighting, enhanced details",
  },
  {
    title: "Scene Transformation",
    before: "/daytime-city-street.jpg",
    after: "/nighttime-neon-city-street.jpg",
    prompt: "Transform to cyberpunk night scene with neon lights",
  },
  {
    title: "Style Transfer",
    before: "/regular-photo-of-landscape.jpg",
    after: "/artistic-painting-of-landscape.jpg",
    prompt: "Convert to impressionist painting style",
  },
  {
    title: "Object Addition",
    before: "/empty-room-interior.png",
    after: "/furnished-modern-room-interior.jpg",
    prompt: "Add modern furniture and decorations",
  },
]

export function Showcase() {
  return (
    <section id="showcase" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">See What's Possible</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Real examples of transformations powered by Nano Banana AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {showcaseItems.map((item, index) => (
            <Card key={index} className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Before</p>
                    <img src={item.before || "/placeholder.svg"} alt="Before" className="w-full rounded-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">After</p>
                    <img src={item.after || "/placeholder.svg"} alt="After" className="w-full rounded-lg" />
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground italic">"{item.prompt}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
