import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shirt,
  Sparkles,
  Bot,
  Camera,
  Upload,
  RefreshCw,
  Palette,
  Scissors,
  ShoppingBag,
} from "lucide-react";

interface VirtualStylistProps {
  userName?: string;
}

const VirtualStylist: React.FC<VirtualStylistProps> = ({
  userName = "Sarah",
}) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [occasion, setOccasion] = useState("");
  const [stylePreference, setStylePreference] = useState("");
  const [colorPreference, setColorPreference] = useState("");
  const [generatedOutfits, setGeneratedOutfits] = useState<any[]>([]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const handleGenerateOutfits = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock generated outfits
      const mockOutfits = [
        {
          id: "1",
          title: "Professional Minimalist",
          description:
            "A clean, professional look with minimalist aesthetics perfect for office settings.",
          imageUrl:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
          items: [
            "White silk blouse",
            "High-waisted black trousers",
            "Nude pumps",
            "Gold minimal necklace",
          ],
          colorPalette: ["#FFFFFF", "#000000", "#E8D0B8", "#D4AF37"],
          occasion: "Work",
          style: "Minimalist",
        },
        {
          id: "2",
          title: "Casual Chic",
          description:
            "Effortlessly stylish outfit that balances comfort and fashion for everyday wear.",
          imageUrl:
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&q=80",
          items: [
            "Oversized beige sweater",
            "Straight-leg jeans",
            "White sneakers",
            "Delicate layered necklaces",
          ],
          colorPalette: ["#E8D0B8", "#4169E1", "#FFFFFF", "#C0C0C0"],
          occasion: "Casual",
          style: "Contemporary",
        },
        {
          id: "3",
          title: "Evening Elegance",
          description:
            "Sophisticated evening look with a touch of glamour for special occasions.",
          imageUrl:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80",
          items: [
            "Black midi dress",
            "Statement earrings",
            "Strappy heels",
            "Clutch purse",
          ],
          colorPalette: ["#000000", "#FFD700", "#C0C0C0", "#800020"],
          occasion: "Evening",
          style: "Elegant",
        },
      ];

      setGeneratedOutfits(mockOutfits);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800"
          >
            Virtual Stylist
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600"
          >
            Get personalized outfit recommendations tailored just for you,{" "}
            {userName}
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="border-purple-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Bot className="h-5 w-5" />
                  AI Stylist Assistant
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Tell me what you're looking for
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Describe what you're looking for
                  </label>
                  <Textarea
                    placeholder="E.g., I need an outfit for a job interview that's professional but shows my personality"
                    className="border-purple-200 focus:border-purple-400"
                    rows={3}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Occasion
                  </label>
                  <Select value={occasion} onValueChange={setOccasion}>
                    <SelectTrigger className="border-purple-200 focus:ring-purple-300">
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Work/Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="date">Date Night</SelectItem>
                      <SelectItem value="formal">Formal Event</SelectItem>
                      <SelectItem value="workout">Workout</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Style Preference
                  </label>
                  <Select
                    value={stylePreference}
                    onValueChange={setStylePreference}
                  >
                    <SelectTrigger className="border-purple-200 focus:ring-purple-300">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="bohemian">Bohemian</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="streetwear">Streetwear</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                      <SelectItem value="preppy">Preppy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color Preference
                  </label>
                  <Select
                    value={colorPreference}
                    onValueChange={setColorPreference}
                  >
                    <SelectTrigger className="border-purple-200 focus:ring-purple-300">
                      <SelectValue placeholder="Select color palette" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neutrals">Neutrals</SelectItem>
                      <SelectItem value="pastels">Pastels</SelectItem>
                      <SelectItem value="bold">Bold & Bright</SelectItem>
                      <SelectItem value="monochrome">Monochrome</SelectItem>
                      <SelectItem value="earth">Earth Tones</SelectItem>
                      <SelectItem value="cool">Cool Tones</SelectItem>
                      <SelectItem value="warm">Warm Tones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleGenerateOutfits}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Outfits
                      </>
                    )}
                  </Button>
                </div>

                <div className="pt-2 flex justify-center">
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500 mb-2">
                      Or upload a photo for inspiration
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-purple-200 text-purple-700"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Take Photo
                      </Button>
                      <Button
                        variant="outline"
                        className="border-purple-200 text-purple-700"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full py-20">
                <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-purple-700 font-medium">
                  Creating your personalized outfits...
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Our AI stylist is analyzing your preferences
                </p>
              </div>
            ) : generatedOutfits.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Tabs defaultValue="outfits" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger
                      value="outfits"
                      className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700"
                    >
                      <Shirt className="h-4 w-4 mr-2" />
                      Outfits
                    </TabsTrigger>
                    <TabsTrigger
                      value="items"
                      className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
                    >
                      <Scissors className="h-4 w-4 mr-2" />
                      Individual Items
                    </TabsTrigger>
                    <TabsTrigger
                      value="colors"
                      className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700"
                    >
                      <Palette className="h-4 w-4 mr-2" />
                      Color Analysis
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="outfits">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {generatedOutfits.map((outfit) => (
                        <motion.div key={outfit.id} variants={itemVariants}>
                          <Card className="border-violet-200 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                            {outfit.imageUrl && (
                              <div className="relative h-64 overflow-hidden">
                                <img
                                  src={outfit.imageUrl}
                                  alt={outfit.title}
                                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute top-3 left-3">
                                  <Badge className="bg-blue-100 text-blue-700 flex items-center gap-1">
                                    <Bot className="h-3 w-3" />
                                    AI Generated
                                  </Badge>
                                </div>
                              </div>
                            )}
                            <CardHeader className="bg-violet-50 pb-2">
                              <div className="flex items-center gap-2">
                                <Shirt className="h-5 w-5 text-violet-500" />
                                <CardTitle className="text-lg">
                                  {outfit.title}
                                </CardTitle>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <Badge
                                  variant="outline"
                                  className="bg-violet-100 text-violet-700 font-normal"
                                >
                                  {outfit.occasion}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="bg-violet-100 text-violet-700 font-normal"
                                >
                                  {outfit.style}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="py-4 flex-grow">
                              <CardDescription className="text-gray-600 mb-4">
                                {outfit.description}
                              </CardDescription>

                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Items:
                              </h4>
                              <ul className="space-y-1 text-sm text-gray-600">
                                {outfit.items.map(
                                  (item: string, idx: number) => (
                                    <li key={idx} className="flex items-start">
                                      <span className="text-violet-500 mr-2">
                                        •
                                      </span>
                                      {item}
                                    </li>
                                  ),
                                )}
                              </ul>

                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  Color Palette:
                                </h4>
                                <div className="flex gap-2">
                                  {outfit.colorPalette.map(
                                    (color: string, idx: number) => (
                                      <div
                                        key={idx}
                                        className="w-8 h-8 rounded-full border border-gray-200"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                      />
                                    ),
                                  )}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                              <Button className="w-full bg-violet-500 hover:bg-violet-600 text-white">
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                Shop This Look
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="items">
                    <Card className="border-pink-200">
                      <CardHeader className="bg-pink-50">
                        <CardTitle className="text-pink-800">
                          Individual Items
                        </CardTitle>
                        <CardDescription>
                          Key pieces recommended for your style and preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {generatedOutfits.flatMap((outfit) =>
                            outfit.items.map((item: string, idx: number) => (
                              <Card
                                key={`${outfit.id}-${idx}`}
                                className="border-pink-100"
                              >
                                <CardHeader className="p-4 pb-2">
                                  <CardTitle className="text-sm font-medium">
                                    {item}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-2">
                                  <div className="flex justify-between items-center">
                                    <Badge
                                      variant="outline"
                                      className="bg-pink-50 text-pink-700"
                                    >
                                      {outfit.style}
                                    </Badge>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                    >
                                      <ShoppingBag className="h-4 w-4 text-pink-500" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            )),
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="colors">
                    <Card className="border-indigo-200">
                      <CardHeader className="bg-indigo-50">
                        <CardTitle className="text-indigo-800">
                          Color Analysis
                        </CardTitle>
                        <CardDescription>
                          Recommended color palette based on your preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-4">
                              Your Personalized Palette
                            </h3>
                            <div className="grid grid-cols-4 gap-4">
                              {Array.from(
                                new Set(
                                  generatedOutfits.flatMap(
                                    (outfit) => outfit.colorPalette,
                                  ),
                                ),
                              ).map((color: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex flex-col items-center"
                                >
                                  <div
                                    className="w-16 h-16 rounded-md border border-gray-200 mb-2"
                                    style={{ backgroundColor: color }}
                                  />
                                  <span className="text-xs text-gray-600">
                                    {color}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-4">
                              Color Combinations
                            </h3>
                            <div className="space-y-4">
                              {generatedOutfits.map((outfit) => (
                                <div
                                  key={outfit.id}
                                  className="p-4 bg-white rounded-lg border border-indigo-100"
                                >
                                  <h4 className="text-sm font-medium text-indigo-700 mb-2">
                                    {outfit.title}
                                  </h4>
                                  <div className="flex gap-2">
                                    {outfit.colorPalette.map(
                                      (color: string, idx: number) => (
                                        <div
                                          key={idx}
                                          className="w-8 h-8 rounded-full border border-gray-200"
                                          style={{ backgroundColor: color }}
                                          title={color}
                                        />
                                      ),
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 bg-white/50 backdrop-blur-sm rounded-lg border border-purple-100">
                <Shirt className="h-16 w-16 text-purple-200 mb-4" />
                <h3 className="text-xl font-medium text-purple-800 mb-2">
                  Your Personal Style Recommendations
                </h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  Fill out your preferences and generate personalized outfit
                  recommendations tailored to your style, body type, and
                  preferences.
                </p>
                <Button
                  onClick={handleGenerateOutfits}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Example Outfits
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualStylist;
