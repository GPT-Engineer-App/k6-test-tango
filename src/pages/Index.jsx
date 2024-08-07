import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Star, Camera, Sparkles, PawPrint } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [catFacts, setCatFacts] = useState([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [catImages, setCatImages] = useState([]);
  const [pawPrints, setPawPrints] = useState([]);

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
  }, []);

  useEffect(() => {
    if (likes > 0 && likes % 5 === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, [likes]);

  const nextFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
  };

  const addPawPrint = (event) => {
    const { clientX, clientY } = event;
    setPawPrints((prev) => [...prev, { x: clientX, y: clientY }]);
    setTimeout(() => setPawPrints((prev) => prev.slice(1)), 2000);
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
      <header className="bg-purple-600 text-white py-16 relative overflow-hidden">
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

          <div className="flex flex-col items-center mb-12">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setLikes(likes + 1)}
              className="flex items-center gap-2 mb-4"
            >
              <Heart className={`h-6 w-6 ${likes > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              Like this cat! ({likes})
            </Button>
            <Progress value={(likes / 100) * 100} className="w-64" />
          </div>

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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-6 w-6" />
                    Characteristics of Cats
                  </CardTitle>
                  <CardDescription>What makes cats unique?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {[
                      { title: "Independent nature", description: "Cats are known for their self-reliance and ability to entertain themselves." },
                      { title: "Excellent hunters", description: "With sharp claws and teeth, cats are natural predators with impressive hunting skills." },
                      { title: "Flexible bodies", description: "Cats have incredibly flexible spines, allowing them to perform acrobatic feats." },
                      { title: "Keen senses", description: "Cats have exceptional hearing and night vision, perfect for nocturnal activities." },
                      { title: "Complex communication", description: "Cats use a variety of vocalizations, body language, and scent markers to communicate." }
                    ].map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>
                          <motion.div 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Paw className="h-4 w-4 text-purple-500" />
                            {item.title}
                          </motion.div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cat className="h-6 w-6" />
                    Popular Cat Breeds
                  </CardTitle>
                  <CardDescription>Some well-known cat breeds around the world</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={catBreeds}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="popularity" stroke="#8884d8" activeDot={{ r: 8 }} />
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
                            <Badge variant="outline" className="bg-purple-100 cursor-pointer">
                              {breed.name}
                            </Badge>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <div className="flex justify-between space-x-4">
                              <div>
                                <h4 className="text-sm font-semibold">{breed.name}</h4>
                                <p className="text-sm">{breed.trait}</p>
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
