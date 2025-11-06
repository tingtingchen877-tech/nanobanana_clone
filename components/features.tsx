import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Generate edited images in seconds with our optimized AI pipeline",
  },
  {
    icon: "🎯",
    title: "Precise Control",
    description: "Maintain character consistency and scene integrity across edits",
  },
  {
    icon: "🔄",
    title: "Batch Processing",
    description: "Process multiple images at once with our batch mode",
  },
  {
    icon: "🎨",
    title: "Style Preservation",
    description: "Keep the original artistic style while making targeted changes",
  },
  {
    icon: "💡",
    title: "Smart Suggestions",
    description: "AI-powered prompt suggestions to help you get better results",
  },
  {
    icon: "🔒",
    title: "Privacy First",
    description: "Your images are processed securely and never stored permanently",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Powerful Features for Creative Control</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Everything you need to transform your images with AI-powered precision
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
