import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Star, Camera, Sparkles, PawPrint, Music, Volume2, VolumeX } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [likes, setLikes] = useState(0);
  const [catFacts, setCatFacts] = useState([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [catImages, setCatImages] = useState([]);
  const [pawPrints, setPawPrints] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const controls = useAnimation();

  const catBreeds = [
    { name: "Siamese", popularity: 85, trait: "Vocal and social" },
    { name: "Persian", popularity: 78, trait: "Calm and gentle" },
    { name: "Maine Coon", popularity: 92, trait: "Large and friendly" },
    { name: "Bengal", popularity: 88, trait: "Active and playful" },
    { name: "Scottish Fold", popularity: 76, trait: "Sweet-tempered" },
  ];

  useEffect(() => {
    const facts = [
      "Cats sleep for about 70% of their lives.",
      "A group of cats is called a clowder.",
      "Cats have over 20 vocalizations, including the purr.",
      "The first cat in space was French. She was named Felicette.",
      "Cats can jump up to six times their length.",
      "A cat's nose print is unique, like a human's fingerprint.",
      "Cats can rotate their ears 180 degrees.",
      "The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.",
    ];
    setCatFacts(facts);

    const images = [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1280px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/1280px-Felis_catus-cat_on_snow.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1280px-Sleeping_cat_on_her_back.jpg",
    ];
    setCatImages(images);

    audioRef.current = new Audio("/cat-purr.mp3");
    audioRef.current.loop = true;
  }, []);

  useEffect(() => {
    if (likes > 0 && likes % 5 === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.5 }
      });
    }
  }, [likes, controls]);

  const nextFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    toast({
      title: "New Cat Fact!",
      description: "Swipe to see the next fascinating cat fact.",
    });
  };

  const addPawPrint = (event) => {
    const { clientX, clientY } = event;
    setPawPrints((prev) => [...prev, { x: clientX, y: clientY }]);
    setTimeout(() => setPawPrints((prev) => prev.slice(1)), 2000);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100" onClick={addPawPrint}>
      {pawPrints.map((paw, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{ left: paw.x - 10, top: paw.y - 10 }}
        >
          <PawPrint className="h-5 w-5 text-purple-500" />
        </motion.div>
      ))}
      <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Purrfect Feline World
          </motion.h1>
          <motion.p 
            className="text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Discover the fascinating world of cats!
          </motion.p>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={toggleAudio}
              className="mr-4"
            >
              {isPlaying ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
              {isPlaying ? "Mute Purring" : "Play Purring"}
            </Button>
            <Slider
              className="w-48 inline-block align-middle"
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
            />
          </motion.div>
        </div>
        <motion.div 
          className="absolute inset-0 bg-purple-500 opacity-20"
          initial={{ scale: 0.9, rotate: 0 }}
          animate={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </header>

      <main className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Carousel className="mb-12">
            <CarouselContent>
              {catImages.map((image, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img 
                      src={image} 
                      alt={`Cute cat ${index + 1}`} 
                      className="mx-auto object-cover w-full h-[500px] rounded-lg shadow-lg"
                    />
                    <motion.div
                      className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star className="h-8 w-8 text-yellow-400" />
                    </motion.div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <motion.div 
            className="flex flex-col items-center mb-12"
            animate={controls}
          >
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setLikes(likes + 1)}
              className="flex items-center gap-2 mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
            >
              <Heart className={`h-6 w-6 ${likes > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              Like this cat! ({likes})
            </Button>
            <Progress value={(likes / 100) * 100} className="w-64 h-2 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${(likes / 100) * 100}%` }}
              />
            </Progress>
          </motion.div>

          <AnimatePresence>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
              >
                <Alert className="mb-6">
                  <Sparkles className="h-4 w-4" />
                  <AlertTitle>Meow-nificent!</AlertTitle>
                  <AlertDescription>
                    You've reached {likes} likes! The cats are purring with joy!
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-6 w-6" />
                  Cat Fact of the Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">{catFacts[currentFactIndex]}</p>
                <Button onClick={nextFact} className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Next Fact
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <Tabs defaultValue="characteristics" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-lg">
              <TabsTrigger value="characteristics" className="data-[state=active]:bg-white data-[state=active]:text-purple-500">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds" className="data-[state=active]:bg-white data-[state=active]:text-pink-500">Popular Breeds</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-purple-600">
                    <Info className="h-6 w-6" />
                    Characteristics of Cats
                  </CardTitle>
                  <CardDescription className="text-lg">What makes cats unique?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {[
                      { title: "Independent nature", description: "Cats are known for their self-reliance and ability to entertain themselves.", icon: "🐱" },
                      { title: "Excellent hunters", description: "With sharp claws and teeth, cats are natural predators with impressive hunting skills.", icon: "🐭" },
                      { title: "Flexible bodies", description: "Cats have incredibly flexible spines, allowing them to perform acrobatic feats.", icon: "🤸" },
                      { title: "Keen senses", description: "Cats have exceptional hearing and night vision, perfect for nocturnal activities.", icon: "👂" },
                      { title: "Complex communication", description: "Cats use a variety of vocalizations, body language, and scent markers to communicate.", icon: "😺" }
                    ].map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>
                          <motion.div 
                            className="flex items-center gap-2 text-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className="text-2xl">{item.icon}</span>
                            {item.title}
                          </motion.div>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {item.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card className="border-2 border-pink-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-pink-600">
                    <Cat className="h-6 w-6" />
                    Popular Cat Breeds
                  </CardTitle>
                  <CardDescription className="text-lg">Some well-known cat breeds around the world</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={catBreeds}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }} />
                      <Legend />
                      <Line type="monotone" dataKey="popularity" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <ul className="grid grid-cols-2 gap-4 mt-6">
                    {catBreeds.map((breed, index) => (
                      <motion.li 
                        key={breed.name} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <HoverCard>
                          <HoverCardTrigger>
                            <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 cursor-pointer hover:from-purple-200 hover:to-pink-200 transition-all duration-300">
                              {breed.name}
                            </Badge>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-64">
                            <div className="flex justify-between space-x-4">
                              <div>
                                <h4 className="text-lg font-semibold">{breed.name}</h4>
                                <p className="text-sm text-gray-500">{breed.trait}</p>
                                <Progress value={breed.popularity} className="mt-2" />
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
