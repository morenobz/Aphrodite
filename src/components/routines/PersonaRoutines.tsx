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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  Briefcase,
  Home as HomeIcon,
  GraduationCap,
  Clock,
  ArrowRight,
  Bot,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { RoutineItem } from "./DailyRoutineBuilder";

interface PersonaRoutinesProps {
  onSelectRoutine?: (routine: RoutineItem[]) => void;
}

type Persona = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  routines: RoutineItem[];
};

const PersonaRoutines: React.FC<PersonaRoutinesProps> = ({
  onSelectRoutine = () => {},
}) => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [routineDetailsOpen, setRoutineDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("professional");

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    setRoutineDetailsOpen(true);
  };

  const handleApplyRoutine = () => {
    if (selectedPersona) {
      onSelectRoutine(selectedPersona.routines);
      setRoutineDetailsOpen(false);
    }
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
            Persona-Based Routines
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600"
          >
            Choose a lifestyle persona that matches your needs for tailored
            self-care routines
          </motion.p>
        </header>

        <Tabs
          defaultValue="professional"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger
              value="professional"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Busy Professional
            </TabsTrigger>
            <TabsTrigger
              value="parent"
              className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
            >
              <HomeIcon className="h-4 w-4 mr-2" />
              Parent
            </TabsTrigger>
            <TabsTrigger
              value="student"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Student
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
            >
              <Users className="h-4 w-4 mr-2" />
              Custom
            </TabsTrigger>
          </TabsList>

          {/* Professional Personas */}
          <TabsContent value="professional">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalPersonas.map((persona) => (
                <PersonaCard
                  key={persona.id}
                  persona={persona}
                  onSelect={() => handleSelectPersona(persona)}
                  isActive={activeTab === "professional"}
                />
              ))}
            </div>
          </TabsContent>

          {/* Parent Personas */}
          <TabsContent value="parent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parentPersonas.map((persona) => (
                <PersonaCard
                  key={persona.id}
                  persona={persona}
                  onSelect={() => handleSelectPersona(persona)}
                  isActive={activeTab === "parent"}
                />
              ))}
            </div>
          </TabsContent>

          {/* Student Personas */}
          <TabsContent value="student">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentPersonas.map((persona) => (
                <PersonaCard
                  key={persona.id}
                  persona={persona}
                  onSelect={() => handleSelectPersona(persona)}
                  isActive={activeTab === "student"}
                />
              ))}
            </div>
          </TabsContent>

          {/* Custom Personas */}
          <TabsContent value="custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customPersonas.map((persona) => (
                <PersonaCard
                  key={persona.id}
                  persona={persona}
                  onSelect={() => handleSelectPersona(persona)}
                  isActive={activeTab === "custom"}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Routine Details Dialog */}
        <Dialog open={routineDetailsOpen} onOpenChange={setRoutineDetailsOpen}>
          <DialogContent className="sm:max-w-[700px]">
            {selectedPersona && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    {selectedPersona.icon}
                    <DialogTitle>{selectedPersona.name} Routine</DialogTitle>
                  </div>
                  <DialogDescription>
                    {selectedPersona.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPersona.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-blue-50 text-blue-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6">
                    <div className="flex items-start gap-3">
                      <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-blue-800">
                          AI-Tailored Routine
                        </h3>
                        <p className="text-sm text-blue-600 mt-1">
                          This routine is specifically designed for{" "}
                          {selectedPersona.name.toLowerCase()}s to balance
                          self-care with your unique lifestyle needs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Routine Items
                  </h3>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {selectedPersona.routines.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {item.title}
                              </h4>
                              {item.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {item.description}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge
                                  className={getCategoryColor(item.category)}
                                >
                                  {item.category.charAt(0).toUpperCase() +
                                    item.category.slice(1)}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-gray-600"
                                >
                                  {item.duration} min
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-gray-600"
                                >
                                  {item.timeOfDay.charAt(0).toUpperCase() +
                                    item.timeOfDay.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setRoutineDetailsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleApplyRoutine}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Apply This Routine
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

interface PersonaCardProps {
  persona: Persona;
  onSelect: () => void;
  isActive: boolean;
}

const PersonaCard: React.FC<PersonaCardProps> = ({
  persona,
  onSelect,
  isActive,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="border-blue-200 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-full bg-blue-100">{persona.icon}</div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {persona.routines.length} items
            </Badge>
          </div>
          <CardTitle className="mt-3">{persona.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {persona.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {persona.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-gray-50"
              >
                {tag}
              </Badge>
            ))}
            {persona.tags.length > 3 && (
              <Badge variant="outline" className="text-xs bg-gray-50">
                +{persona.tags.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            onClick={onSelect}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            View Routine
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Helper function to get category badge color
const getCategoryColor = (category: string) => {
  switch (category) {
    case "beauty":
      return "bg-pink-100 text-pink-800";
    case "fitness":
      return "bg-purple-100 text-purple-800";
    case "mental":
      return "bg-indigo-100 text-indigo-800";
    case "nutrition":
      return "bg-green-100 text-green-800";
    case "personal":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Professional Personas
const professionalPersonas: Persona[] = [
  {
    id: "busy-executive",
    name: "Busy Executive",
    description:
      "For high-powered professionals with minimal time who need efficient self-care routines that maximize results.",
    icon: <Briefcase className="h-6 w-6 text-blue-600" />,
    tags: [
      "time-efficient",
      "high-impact",
      "stress-management",
      "morning focus",
      "evening recovery",
    ],
    routines: [
      {
        id: "exec-1",
        title: "5-Minute Morning Meditation",
        description:
          "Quick mindfulness practice to center yourself before a busy day",
        category: "mental",
        duration: 5,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "06:30",
      },
      {
        id: "exec-2",
        title: "Express Skincare Routine",
        description: "Streamlined 3-step skincare for busy mornings",
        category: "beauty",
        duration: 3,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "06:35",
      },
      {
        id: "exec-3",
        title: "Desk Stretches",
        description: "Quick stretches to do between meetings to reduce tension",
        category: "fitness",
        duration: 2,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "14:00",
      },
      {
        id: "exec-4",
        title: "Evening Wind-Down",
        description: "Brief relaxation routine to transition from work mode",
        category: "mental",
        duration: 10,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "20:00",
      },
    ],
  },
  {
    id: "remote-worker",
    name: "Remote Worker",
    description:
      "For professionals working from home who need routines that create work-life boundaries and prevent burnout.",
    icon: <HomeIcon className="h-6 w-6 text-blue-600" />,
    tags: [
      "work-life balance",
      "home office",
      "movement breaks",
      "boundary setting",
    ],
    routines: [
      {
        id: "remote-1",
        title: "Morning Commute Replacement",
        description: "10-minute walk to simulate a commute and start your day",
        category: "fitness",
        duration: 10,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "08:00",
      },
      {
        id: "remote-2",
        title: "Hourly Movement Break",
        description: "Quick stretches and movement to avoid sitting too long",
        category: "fitness",
        duration: 3,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "11:00",
      },
      {
        id: "remote-3",
        title: "Lunch Away From Desk",
        description: "Mindful eating away from your workspace",
        category: "nutrition",
        duration: 20,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "12:30",
      },
      {
        id: "remote-4",
        title: "End of Workday Ritual",
        description:
          "Routine to signal the end of work hours and transition to personal time",
        category: "mental",
        duration: 5,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "18:00",
      },
    ],
  },
  {
    id: "frequent-traveler",
    name: "Frequent Traveler",
    description:
      "For professionals who travel often and need portable, adaptable self-care routines that work in hotel rooms and on the go.",
    icon: <Briefcase className="h-6 w-6 text-blue-600" />,
    tags: [
      "travel-friendly",
      "jet lag management",
      "minimal equipment",
      "adaptable",
    ],
    routines: [
      {
        id: "travel-1",
        title: "Hotel Room Workout",
        description: "No-equipment needed exercise routine for limited space",
        category: "fitness",
        duration: 15,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "07:00",
      },
      {
        id: "travel-2",
        title: "Travel Skincare Routine",
        description: "Simplified skincare with travel-sized products",
        category: "beauty",
        duration: 5,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "21:00",
      },
      {
        id: "travel-3",
        title: "Jet Lag Recovery",
        description:
          "Techniques to reset your body clock when crossing time zones",
        category: "mental",
        duration: 10,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "20:00",
      },
      {
        id: "travel-4",
        title: "Healthy Airport Food Choices",
        description: "Guide to finding nutritious options while traveling",
        category: "nutrition",
        duration: 0,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: false,
      },
    ],
  },
];

// Parent Personas
const parentPersonas: Persona[] = [
  {
    id: "busy-mom",
    name: "Busy Mom",
    description:
      "For mothers juggling childcare, household management, and possibly careers who need self-care that fits into small pockets of time.",
    icon: <HomeIcon className="h-6 w-6 text-pink-600" />,
    tags: [
      "mom life",
      "quick routines",
      "energy boosting",
      "stress relief",
      "multi-tasking",
    ],
    routines: [
      {
        id: "mom-1",
        title: "Early Morning Me-Time",
        description: "Quiet moment for yourself before the household wakes up",
        category: "mental",
        duration: 15,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "05:45",
      },
      {
        id: "mom-2",
        title: "Shower Power Routine",
        description: "Efficient beauty routine that fits into your shower time",
        category: "beauty",
        duration: 10,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "06:30",
      },
      {
        id: "mom-3",
        title: "Naptime Recharge",
        description: "Quick self-care activities during children's nap time",
        category: "personal",
        duration: 20,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "13:00",
      },
      {
        id: "mom-4",
        title: "Bedtime Wind-Down",
        description: "Relaxation routine after kids are asleep",
        category: "mental",
        duration: 15,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "21:00",
      },
    ],
  },
  {
    id: "stay-at-home-parent",
    name: "Stay-at-Home Parent",
    description:
      "For parents who are primary caregivers at home and need self-care routines that can be integrated with childcare responsibilities.",
    icon: <HomeIcon className="h-6 w-6 text-pink-600" />,
    tags: [
      "child-friendly",
      "home-based",
      "identity maintenance",
      "energy management",
    ],
    routines: [
      {
        id: "sahp-1",
        title: "Parent-Child Exercise",
        description: "Fun physical activities you can do with your children",
        category: "fitness",
        duration: 20,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "10:00",
      },
      {
        id: "sahp-2",
        title: "Quick Touch-Up Beauty",
        description: "5-minute beauty routine to feel put together",
        category: "beauty",
        duration: 5,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "08:30",
      },
      {
        id: "sahp-3",
        title: "Mindful Snack Break",
        description: "Nutritious snack and moment of mindfulness",
        category: "nutrition",
        duration: 10,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "15:00",
      },
      {
        id: "sahp-4",
        title: "Evening Hobby Time",
        description: "Dedicated time for a personal interest or hobby",
        category: "personal",
        duration: 30,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "20:30",
      },
    ],
  },
  {
    id: "working-parent",
    name: "Working Parent",
    description:
      "For parents balancing career and family responsibilities who need efficient self-care that fits into a packed schedule.",
    icon: <Briefcase className="h-6 w-6 text-pink-600" />,
    tags: [
      "work-life integration",
      "time-efficient",
      "dual-role",
      "energy management",
    ],
    routines: [
      {
        id: "wp-1",
        title: "Morning Efficiency Routine",
        description: "Combined skincare and mental preparation for the day",
        category: "beauty",
        duration: 10,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "06:15",
      },
      {
        id: "wp-2",
        title: "Lunch Break Recharge",
        description: "Quick wellness activities during your work break",
        category: "mental",
        duration: 15,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "12:30",
      },
      {
        id: "wp-3",
        title: "Family Fitness Fun",
        description: "Physical activity that includes the whole family",
        category: "fitness",
        duration: 20,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "18:30",
      },
      {
        id: "wp-4",
        title: "Parent Decompression",
        description: "Brief relaxation after kids' bedtime",
        category: "mental",
        duration: 15,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "21:00",
      },
    ],
  },
];

// Student Personas
const studentPersonas: Persona[] = [
  {
    id: "college-student",
    name: "College Student",
    description:
      "For students balancing classes, studying, social life, and possibly work who need affordable and dorm-friendly self-care routines.",
    icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
    tags: [
      "budget-friendly",
      "study breaks",
      "stress management",
      "social balance",
    ],
    routines: [
      {
        id: "college-1",
        title: "Morning Class Prep",
        description:
          "Quick routine to feel fresh and focused for morning lectures",
        category: "beauty",
        duration: 10,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "07:30",
      },
      {
        id: "college-2",
        title: "Study Break Stretches",
        description:
          "Physical movement to refresh your mind during study sessions",
        category: "fitness",
        duration: 5,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "15:00",
      },
      {
        id: "college-3",
        title: "Dorm Room Workout",
        description: "Space-efficient exercises requiring no equipment",
        category: "fitness",
        duration: 15,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "17:00",
      },
      {
        id: "college-4",
        title: "Pre-Sleep Digital Detox",
        description: "Wind down without screens for better sleep quality",
        category: "mental",
        duration: 20,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "22:00",
      },
    ],
  },
  {
    id: "grad-student",
    name: "Graduate Student",
    description:
      "For students pursuing advanced degrees who need self-care routines that support intense research, teaching, and academic pressure.",
    icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
    tags: [
      "mental clarity",
      "stress management",
      "long-term focus",
      "burnout prevention",
    ],
    routines: [
      {
        id: "grad-1",
        title: "Morning Brain Activation",
        description: "Routine to stimulate mental clarity and focus",
        category: "mental",
        duration: 15,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "07:00",
      },
      {
        id: "grad-2",
        title: "Midday Reset",
        description: "Quick routine to prevent afternoon slump",
        category: "fitness",
        duration: 10,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "13:00",
      },
      {
        id: "grad-3",
        title: "Brain-Boosting Snack",
        description: "Nutritious snack to support cognitive function",
        category: "nutrition",
        duration: 5,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "16:00",
      },
      {
        id: "grad-4",
        title: "Evening Tension Release",
        description:
          "Practices to release accumulated stress and prepare for rest",
        category: "mental",
        duration: 20,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "21:30",
      },
    ],
  },
  {
    id: "student-athlete",
    name: "Student Athlete",
    description:
      "For students balancing academic demands with athletic training and competition who need recovery-focused self-care routines.",
    icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
    tags: ["recovery", "performance", "energy management", "balance"],
    routines: [
      {
        id: "athlete-1",
        title: "Morning Mobility Routine",
        description: "Gentle movement to prepare your body for the day",
        category: "fitness",
        duration: 10,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "06:30",
      },
      {
        id: "athlete-2",
        title: "Post-Training Recovery",
        description: "Techniques to optimize recovery after workouts",
        category: "fitness",
        duration: 15,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "16:30",
      },
      {
        id: "athlete-3",
        title: "Performance Nutrition",
        description: "Meal planning for optimal athletic performance",
        category: "nutrition",
        duration: 0,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: false,
      },
      {
        id: "athlete-4",
        title: "Sleep Optimization",
        description: "Routine to maximize sleep quality for recovery",
        category: "mental",
        duration: 15,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "21:00",
      },
    ],
  },
];

// Custom Personas
const customPersonas: Persona[] = [
  {
    id: "shift-worker",
    name: "Shift Worker",
    description:
      "For those working non-traditional hours who need adaptable self-care routines that work with changing schedules.",
    icon: <Clock className="h-6 w-6 text-green-600" />,
    tags: [
      "schedule adaptation",
      "sleep support",
      "energy management",
      "circadian rhythm",
    ],
    routines: [
      {
        id: "shift-1",
        title: "Pre-Shift Energizer",
        description: "Routine to prepare your body and mind for work",
        category: "fitness",
        duration: 10,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "00:00",
      },
      {
        id: "shift-2",
        title: "Mid-Shift Refresh",
        description: "Quick routine to maintain alertness during your shift",
        category: "mental",
        duration: 5,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "00:00",
      },
      {
        id: "shift-3",
        title: "Post-Shift Wind Down",
        description: "Transition routine to prepare for sleep after work",
        category: "mental",
        duration: 15,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "00:00",
      },
      {
        id: "shift-4",
        title: "Sleep Quality Enhancer",
        description: "Techniques to improve sleep despite irregular hours",
        category: "personal",
        duration: 10,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "00:00",
      },
    ],
  },
  {
    id: "chronic-condition",
    name: "Chronic Condition Manager",
    description:
      "For those managing ongoing health conditions who need gentle, adaptable self-care that supports overall wellbeing.",
    icon: <Calendar className="h-6 w-6 text-green-600" />,
    tags: [
      "energy conservation",
      "symptom management",
      "gentle care",
      "adaptable",
    ],
    routines: [
      {
        id: "chronic-1",
        title: "Gentle Morning Awakening",
        description:
          "Slow, gentle routine to start your day with minimal strain",
        category: "personal",
        duration: 15,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "08:00",
      },
      {
        id: "chronic-2",
        title: "Energy Conservation Breaks",
        description: "Strategic rest periods throughout the day",
        category: "mental",
        duration: 10,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "13:00",
      },
      {
        id: "chronic-3",
        title: "Adaptive Movement",
        description: "Gentle physical activity tailored to your energy level",
        category: "fitness",
        duration: 10,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "15:00",
      },
      {
        id: "chronic-4",
        title: "Comfort Evening Routine",
        description: "Self-care focused on comfort and symptom management",
        category: "beauty",
        duration: 15,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "20:00",
      },
    ],
  },
  {
    id: "minimalist",
    name: "Wellness Minimalist",
    description:
      "For those seeking a simplified approach to self-care with high-impact, low-maintenance routines.",
    icon: <CheckCircle2 className="h-6 w-6 text-green-600" />,
    tags: ["simplicity", "essentials-only", "high-impact", "sustainable"],
    routines: [
      {
        id: "min-1",
        title: "Essential Morning Routine",
        description: "Streamlined morning self-care with maximum benefit",
        category: "beauty",
        duration: 5,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
        reminderTime: "07:00",
      },
      {
        id: "min-2",
        title: "One-Minute Mindfulness",
        description: "Brief mindfulness practice to center yourself",
        category: "mental",
        duration: 1,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "12:00",
      },
      {
        id: "min-3",
        title: "Efficient Movement",
        description: "Quick, effective physical activity",
        category: "fitness",
        duration: 7,
        completed: false,
        timeOfDay: "afternoon",
        reminderEnabled: true,
        reminderTime: "17:00",
      },
      {
        id: "min-4",
        title: "Simple Evening Reset",
        description: "Minimal evening routine for quality rest",
        category: "personal",
        duration: 5,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
        reminderTime: "21:00",
      },
    ],
  },
];

export default PersonaRoutines;
