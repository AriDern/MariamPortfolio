// Mark this component as a Client Component
"use client";
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Search, Send } from "lucide-react"

// Sample data for timeline and posts
const timelineData = [
  { id: "japan-2024", label: "Japan", date: "December 2024" },
  { id: "greece-2024", label: "Greece", date: "Summer 2024" },
  { id: "nyc-2024", label: "New York City", date: "Spring 2024" },
  { id: "paris-2023", label: "Paris", date: "Fall 2023" },
]

const postsData = [
  {
    id: 1,
    category: "japan-2024",
    date: "December 15, 2024",
    content: "Exploring the vibrant streets of Tokyo",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 2,
    category: "japan-2024",
    date: "December 18, 2024",
    content: "Peaceful moments at a traditional Japanese garden",
    images: ["/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 3,
    category: "greece-2024",
    date: "July 5, 2024",
    content: "Sunset in Santorini",
    images: ["/IMG_2355.jpg"],
  },
  {
    id: 4,
    category: "greece-2024",
    date: "July 10, 2024",
    content: "Ancient ruins of Athens",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 5,
    category: "nyc-2024",
    date: "April 3, 2024",
    content: "New York City skyline from Top of the Rock",
    images: ["/placeholder.svg"],
  },
  {
    id: 6,
    category: "paris-2023",
    date: "October 12, 2023",
    content: "Autumn in Paris",
    images: ["/placeholder.svg", "/placeholder.svg"],
  },
]

export default function PortfolioFeedWithTimeline() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = selectedCategory
    ? postsData.filter((post) => post.category === selectedCategory)
    : postsData

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Timeline */}
      <aside className="w-64 border-r bg-white">
        <div className="flex h-full flex-col">
          <div className="p-4">
            <h2 className="mb-2 text-lg font-semibold text-black">Mariam Abalo-Toga</h2>
            <p className="text-sm text-gray-600">Travel Photographer</p>
          </div>
          <ScrollArea className="flex-1">
            <nav className="space-y-2 p-4">
              <Button
                className="w-full justify-start text-black"
                variant={selectedCategory === null ? "secondary" : "ghost"}
                onClick={() => setSelectedCategory(null)}
              >
                All Posts
              </Button>
              {timelineData.map((item) => (
                <Button
                  key={item.id}
                  className="w-full justify-start"
                  variant={selectedCategory === item.id ? "secondary" : "ghost"}
                  onClick={() => setSelectedCategory(item.id)}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-black">{item.label}</span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                </Button>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {/* Header */}
        <header className="flex items-center justify-between border-b bg-white p-4 text-black">
          <h1 className="text-2xl font-bold text-black">Travel Portfolio</h1>
          <div className="flex items-center space-x-4">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input className="pl-8" placeholder="Search" type="search" />
            </form>
            <Avatar>
              <AvatarImage alt="Mariam Abalo-Toga" src="/placeholder-avatar.jpg" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Feed */}
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="mx-auto max-w-2xl space-y-4 p-4">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage alt="Mariam Abalo-Toga" src="/IMG_2355.jpg" />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">Mariam Abalo-Toga</p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                  <Button className="ml-auto" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className={`grid gap-1 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {post.images.map((image, index) => (
                      <Image
                        key={index}
                        alt={`Portfolio image ${index + 1}`}
                        className="aspect-square object-cover"
                        height={300}
                        src={image}
                        width={300}
                      />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div className="flex w-full items-center gap-4">
                    <Button size="icon" variant="ghost">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button className="ml-auto" size="icon" variant="ghost">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{post.content}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}