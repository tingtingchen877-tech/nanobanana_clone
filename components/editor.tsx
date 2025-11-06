"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, Sparkles, Loader2 } from "lucide-react"

export function Editor() {
  const [prompt, setPrompt] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [generatedResult, setGeneratedResult] = useState<string | null>(null)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) {
      setError("Please upload an image and enter a prompt")
      return
    }

    setIsGenerating(true)
    setError(null)
    setGeneratedResult(null)
    setGeneratedImageUrl(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          imageUrl: selectedImage,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate')
      }

      if (data.hasImage) {
        setGeneratedImageUrl(data.imageUrl)
      } else {
        setGeneratedResult(data.result)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section id="editor" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Try The AI Editor</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Experience the power of nano-banana's natural language image editing. Transform any photo with simple text
            commands
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Prompt Engine */}
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Prompt Engine</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="image-upload" className="text-sm font-medium mb-2 block">
                    Reference Image
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {selectedImage ? (
                        <img
                          src={selectedImage || "/placeholder.svg"}
                          alt="Uploaded"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                      ) : (
                        <>
                          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-1">Add Image</p>
                          <p className="text-xs text-muted-foreground">Max 50MB</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="prompt" className="text-sm font-medium mb-2 block">
                    Main Prompt
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="A futuristic city powered by nano technology, golden hour lighting, ultra detailed..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                </div>

                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={isGenerating || !selectedImage || !prompt}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Now
                    </>
                  )}
                </Button>
                {error && (
                  <p className="text-sm text-red-500 mt-2">{error}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Output Gallery */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">🎨</span>
                <h3 className="text-xl font-semibold">Output Gallery</h3>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
                {isGenerating ? (
                  <>
                    <Loader2 className="w-16 h-16 animate-spin text-primary mb-4" />
                    <h4 className="text-lg font-semibold mb-2">Generating...</h4>
                    <p className="text-sm text-muted-foreground text-balance">
                      AI is processing your image and prompt
                    </p>
                  </>
                ) : generatedImageUrl ? (
                  <div className="w-full">
                    <h4 className="text-lg font-semibold mb-4">Generated Image:</h4>
                    <img
                      src={generatedImageUrl}
                      alt="Generated result"
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                ) : generatedResult ? (
                  <div className="w-full">
                    <div className="bg-muted rounded-lg p-6 text-left">
                      <h4 className="text-lg font-semibold mb-3">Generated Result:</h4>
                      <p className="text-sm whitespace-pre-wrap">{generatedResult}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                      <span className="text-4xl">🖼️</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Ready for Instant Generation</h4>
                    <p className="text-sm text-muted-foreground text-balance">
                      Enter your prompt and unleash the power
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
