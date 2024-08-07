import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [catFacts, setCatFacts] = useState([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const facts = [
      "Cats sleep for about 70% of their lives.",
      "A group of cats is called a clowder.",
      "Cats have over 20 vocalizations, including the purr.",
      "The first cat in space was French. She was named Felicette.",
      "Cats can jump up to six times their length.",
    ];
    setCatFacts(facts);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="bg-purple-600 text-white py-16">
        <div className="container mx-auto text-center">
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
      </header>

      <main className="container mx-auto py-12 px-4">
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" 
            alt="Cute cat" 
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
                <Paw className="h-4 w-4" />
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
              <CardTitle>Cat Fact of the Day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">{catFacts[currentFactIndex]}</p>
              <Button onClick={nextFact}>Next Fact</Button>
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
                <ul className="list-none pl-6 space-y-4">
                  {[
                    "Independent nature",
                    "Excellent hunters with sharp claws and teeth",
                    "Flexible bodies and quick reflexes",
                    "Keen senses, especially hearing and night vision",
                    "Communicate through vocalizations, body language, and scent"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Paw className="h-4 w-4 text-purple-500" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
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
                <ul className="grid grid-cols-2 gap-4">
                  {["Siamese", "Persian", "Maine Coon", "Bengal", "Scottish Fold"].map((breed, index) => (
                    <motion.li 
                      key={breed} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="h-2 w-2 bg-purple-500 rounded-full"></span>
                      {breed}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
