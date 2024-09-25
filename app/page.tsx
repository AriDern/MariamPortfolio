// Mark this component as a Client Component
"use client";
import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Search, Send } from "lucide-react"

// Sample data for timeline and posts
const timelineData = [
  { 
    id: "japan-2024", 
    label: "Japan", 
    date: "December 2024", 
    img: "DSC04687.jpg" 
  },
  { 
    id: "greece-2024", 
    label: "Greece", 
    date: "Summer 2024", 
    img: "DSC04674topmargin.png" 
  },
  { 
    id: "musing-of-a-broke-girl", 
    label: "Musings of a Broke Girl", 
    date: "Fall 2024", 
    img: "musingsofabrokegirltopmargin.png" 
  },
  { 
    id: "tennesse-2021", 
    label: "Tennesse",
    date: "Summer 2021", 
    img: "DSC04678.jpg" 
  },
]

const socialMediaLinkData = [
  {
    id: "linkedin", label: "LinkedIn", image: "LinkedInLink.png",
    link: "https://www.linkedin.com/in/mariam-abalo-toga-bb0161181/"
  },
  {
    id: "instagram", label: "Instagram", image: "instagramIcon.png",
    link: "https://www.instagram.com/onthelenz/"
  }
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
    category: "musing-of-a-broke-girl",
    date: "April 3, 2024",
    content: "New York City skyline from Top of the Rock",
    images: ["/musingsofabrokegirl.png"],
  },
  {
    id: 6,
    category: "tennesse-2021",
    date: "June 26, 2021",
    content: "Cloudy thoughts on top of mount LeConte",
    images: ["/DSC04674.jpg", "/DSC04678.jpg", "/DSC04679.jpg", "/DSC04687.jpg"],
  },
]

export default function PortfolioFeedWithTimeline() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState<string>("All Diaries")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [blogButtonText, setBlogButtonText] = useState<string>("All Diaries")

  // Find the selected category's data
  const selectedCategoryData = timelineData.find((item) => item.id === selectedCategory)

  // Sort posts by date
  const sortedPosts = useMemo(() => {
    return [...postsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [])

  const filteredPosts = useMemo(() => {
    if (selectedCategory) {
      return sortedPosts.filter((post) => post.category === selectedCategory)
    } else if (selectedDate) {
      return sortedPosts.filter((post) => post.date === selectedDate)
    }
    return sortedPosts
  }, [selectedCategory, selectedDate, sortedPosts])

  const groupedPosts = useMemo(() => {
    const groups = filteredPosts.reduce((acc, post) => {
      if (!acc[post.date]) {
        acc[post.date] = []
      }
      acc[post.date].push(post)
      return acc
    }, {} as Record<string, typeof postsData>)

    return Object.entries(groups).sort(([dateA], [dateB]) => 
      new Date(dateB).getTime() - new Date(dateA).getTime()
    )
  }, [filteredPosts])

  const handleCategoryClick = (id: string | null, label: string) => {
    setSelectedCategory(id)
    setSelectedCategoryLabel(label)
    setSelectedDate(null)
    // Don't change the blogButtonText here
  }

  const handleDateClick = (date: string | null) => {
    setSelectedDate(date)
    setSelectedCategory(null)
    setBlogButtonText(date ? `Posts from ${date}` : "All Diaries")
    setSelectedCategoryLabel(date ? `Posts from ${date}` : "Photo Diary")
  }

  const handleBlogClick = () => {
    setSelectedCategory(null)
    setSelectedDate(null)
    setBlogButtonText("All Diaries")
    setSelectedCategoryLabel("Photo Diary")
  }

  // Get unique dates from posts
  const uniqueDates = Array.from(new Set(sortedPosts.map(post => post.date)))

  return (
    <div className="flex h-screen">
      {/* Timeline */}
      <aside className="w-64 border-r bg-sand">
        <div className="flex h-full flex-col">
          <div className="p-4 bg-lightsand">
            <h2 className="mb-2 text-lg font-semibold text-black">Mariam Abalo-Toga</h2>
            <p className="text-sm text-gray-600">Travel Photographer</p>
          </div>
          <ScrollArea className="flex-1">
            <nav className="space-y-2 p-4">
              <button
                className="font-semibold text-left w-full hover:text-primary transition-colors"
                onClick={handleBlogClick}
              >
                Photo Diary
              </button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="w-full justify-start text-black"
                    variant={selectedCategory === null? "timelinebarsecondary" : "timelinebarghost"}
                  >
                    {blogButtonText}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <ScrollArea className="h-[200px]">
                    <Button
                      className="w-full justify-start"
                      variant="ghost"
                      onClick={() => handleDateClick(null)}
                    >
                      All Diaries
                    </Button>
                    {uniqueDates.map((date) => (
                      <Button
                        key={date}
                        className="w-full justify-start"
                        variant="ghost"
                        onClick={() => handleDateClick(date)}
                      >
                        {date}
                      </Button>
                    ))}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <p className="font-semibold">Series</p>
              {timelineData.map((item) => (
                <Button
                  key={item.id}
                  className="w-full justify-start relative group hideimage"
                  variant={selectedCategory === item.id ? "timelinebarsecondary" : "timelinebarghost"}
                  onClick={() => handleCategoryClick(item.id, item.label)}
                  style={{backgroundImage: `url('/${item.img}')`}}
                >
                  <div className="text-container flex flex-col items-start hidetext">
                    <span className="text-black">{item.label}</span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                </Button>
              ))}
            </nav>
            {/* Social Media Links */}
            <div className="fixed bottom-0 left-0 w-full flex">
              {socialMediaLinkData.map((item) => (
                <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer">
                  <div className="p-1">
                    <img 
                      src={item.image}
                      alt={item.label}
                      style={{width:'26px', height:'26px'}}
                    />
                  </div>
                </a>
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {/* Header */}
        <header 
          className="flex items-center justify-between border-b bg-redsand p-4"
          style={{
            backgroundImage: selectedCategoryData
              ? `url('/${selectedCategoryData.img}')`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-2xl font-bold text-lightsand">{selectedCategoryLabel}</h1>
          <div className="flex items-center space-x-4">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input className="pl-8" placeholder="Search" type="search" />
            </form>
            <Avatar>
              <AvatarImage alt="Mariam Abalo-Toga" src="/placeholder-avatar.jpg" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Feed */}
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="mx-auto max-w-5xl space-y-8 p-4">
            {groupedPosts.map(([date, posts]) => (
              <div key={date} className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 sticky top-0 bg-white py-2 z-10">{date}</h2>
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar>
                        <AvatarImage alt="Mariam Abalo-Toga" src="/IMG_2355.jpg" />
                        <AvatarFallback>MA</AvatarFallback>
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
                          <div key={index} className="relative w-auto">
                            <Image
                              alt={`Portfolio image ${index + 1}`}
                              height={0}
                              src={image}
                              width={0}
                              sizes='100vw'
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </div>
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
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}