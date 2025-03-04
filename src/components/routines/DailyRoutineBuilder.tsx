import React, { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Plus,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  AlarmClock,
  Bot,
  Repeat,
  MoreVertical,
  ArrowRight,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PersonaRoutines from "./PersonaRoutines";

export interface RoutineItem {
  id: string;
  title: string;
  description?: string;
  category: "beauty" | "fitness" | "mental" | "nutrition" | "personal";
  duration: number; // in minutes
  completed: boolean;
  timeOfDay: "morning" | "afternoon" | "evening";
  reminderEnabled: boolean;
  reminderTime?: string;
}

interface DailyRoutineBuilderProps {
  userName?: string;
  onSaveRoutine?: (routine: RoutineItem[]) => void;
  savedRoutine?: RoutineItem[];
}

const DailyRoutineBuilder: React.FC<DailyRoutineBuilderProps> = ({
  userName = "Sarah",
  onSaveRoutine = () => {},
  savedRoutine = [],
}) => {
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>(
    savedRoutine.length > 0 ? savedRoutine : defaultRoutineItems,
  );
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RoutineItem | null>(null);
  const [goalCount, setGoalCount] = useState<number>(2);
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [goalInput, setGoalInput] = useState("");
  const [setupComplete, setSetupComplete] = useState(savedRoutine.length > 0);
  const [aiSuggestionsOpen, setAiSuggestionsOpen] = useState(false);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<RoutineItem[]>([]);
  const [personaRoutinesOpen, setPersonaRoutinesOpen] = useState(false);

  // New item form state
  const [newItem, setNewItem] = useState<Omit<RoutineItem, "id" | "completed">>(
    {
      title: "",
      description: "",
      category: "beauty",
      duration: 15,
      timeOfDay: "morning",
      reminderEnabled: false,
    },
  );

  // Group routine items by time of day
  const routineByTimeOfDay = {
    morning: routineItems.filter((item) => item.timeOfDay === "morning"),
    afternoon: routineItems.filter((item) => item.timeOfDay === "afternoon"),
    evening: routineItems.filter((item) => item.timeOfDay === "evening"),
  };

  // Calculate completion percentage
  const completionPercentage =
    routineItems.length > 0
      ? Math.round(
          (routineItems.filter((item) => item.completed).length /
            routineItems.length) *
            100,
        )
      : 0;

  // Handle adding a new routine item
  const handleAddItem = () => {
    const newRoutineItem: RoutineItem = {
      ...newItem,
      id: `routine-${Date.now()}`,
      completed: false,
    };

    setRoutineItems([...routineItems, newRoutineItem]);
    setNewItem({
      title: "",
      description: "",
      category: "beauty",
      duration: 15,
      timeOfDay: "morning",
      reminderEnabled: false,
    });
    setNewItemDialogOpen(false);
    onSaveRoutine([...routineItems, newRoutineItem]);
  };

  // Handle updating an existing routine item
  const handleUpdateItem = () => {
    if (!editingItem) return;

    const updatedItems = routineItems.map((item) =>
      item.id === editingItem.id ? editingItem : item,
    );

    setRoutineItems(updatedItems);
    setEditingItem(null);
    onSaveRoutine(updatedItems);
  };

  // Handle deleting a routine item
  const handleDeleteItem = (id: string) => {
    const updatedItems = routineItems.filter((item) => item.id !== id);
    setRoutineItems(updatedItems);
    onSaveRoutine(updatedItems);
  };

  // Handle toggling completion status
  const handleToggleComplete = (id: string) => {
    const updatedItems = routineItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );

    setRoutineItems(updatedItems);
    onSaveRoutine(updatedItems);
  };

  // Add a user goal
  const handleAddGoal = () => {
    if (goalInput.trim() && userGoals.length < goalCount) {
      setUserGoals([...userGoals, goalInput.trim()]);
      setGoalInput("");
    }
  };

  // Complete the initial setup
  const handleCompleteSetup = () => {
    setSetupComplete(true);
    generateAiSuggestions();
  };

  // Generate AI suggestions based on user goals
  const generateAiSuggestions = () => {
    setIsGeneratingSuggestions(true);
    setAiSuggestionsOpen(true);

    // Simulate API call delay
    setTimeout(() => {
      const suggestions = generateSuggestionsFromGoals(userGoals);
      setAiSuggestions(suggestions);
      setIsGeneratingSuggestions(false);
    }, 2000);
  };

  // Add an AI suggestion to routine
  const addSuggestionToRoutine = (suggestion: RoutineItem) => {
    const newItem = {
      ...suggestion,
      id: `routine-${Date.now()}`,
    };

    setRoutineItems([...routineItems, newItem]);
    onSaveRoutine([...routineItems, newItem]);
  };

  // Get category badge color
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

  // Get time of day section title and icon
  const getTimeOfDayInfo = (timeOfDay: string) => {
    switch (timeOfDay) {
      case "morning":
        return {
          title: "Morning Routine",
          icon: <Calendar className="h-5 w-5 text-orange-500" />,
          description: "Start your day with intention",
        };
      case "afternoon":
        return {
          title: "Afternoon Routine",
          icon: <Clock className="h-5 w-5 text-blue-500" />,
          description: "Midday wellness activities",
        };
      case "evening":
        return {
          title: "Evening Routine",
          icon: <AlarmClock className="h-5 w-5 text-purple-500" />,
          description: "Wind down and prepare for rest",
        };
      default:
        return {
          title: "Daily Routine",
          icon: <Calendar className="h-5 w-5 text-gray-500" />,
          description: "Your wellness activities",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {!setupComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-purple-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                <CardTitle className="text-2xl font-bold text-purple-800">
                  Create Your Daily Routine
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Let's build a personalized daily routine to help you achieve
                  your wellness goals
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    How many daily goals would you like to set? (2-8)
                  </h3>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGoalCount(Math.max(2, goalCount - 1))}
                      disabled={goalCount <= 2}
                      className="border-purple-200 text-purple-700"
                    >
                      -
                    </Button>
                    <span className="text-xl font-semibold text-purple-800">
                      {goalCount}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGoalCount(Math.min(8, goalCount + 1))}
                      disabled={goalCount >= 8}
                      className="border-purple-200 text-purple-700"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    What are your wellness goals?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Examples: morning skincare, 30-minute workout, meditation,
                    reading, journaling
                  </p>

                  <div className="flex items-center space-x-2 mb-4">
                    <Input
                      placeholder="Enter a daily goal"
                      value={goalInput}
                      onChange={(e) => setGoalInput(e.target.value)}
                      className="border-purple-200 focus:border-purple-400"
                    />
                    <Button
                      onClick={handleAddGoal}
                      disabled={
                        !goalInput.trim() || userGoals.length >= goalCount
                      }
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {userGoals.map((goal, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-purple-50 rounded-md border border-purple-100"
                      >
                        <span className="text-purple-800">{goal}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setUserGoals(
                              userGoals.filter((_, i) => i !== index),
                            );
                          }}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        >
                          <XCircle className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}

                    {userGoals.length === 0 && (
                      <p className="text-sm text-gray-500 italic">
                        No goals added yet. Add up to {goalCount} goals.
                      </p>
                    )}

                    {userGoals.length > 0 && userGoals.length < goalCount && (
                      <p className="text-sm text-purple-600">
                        {goalCount - userGoals.length} more goal(s) to add
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 p-4 flex justify-between">
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-700"
                >
                  Skip for Now
                </Button>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setPersonaRoutinesOpen(true)}
                    variant="outline"
                    className="border-blue-200 text-blue-700"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Use Persona Template
                  </Button>
                  <Button
                    onClick={handleCompleteSetup}
                    disabled={userGoals.length === 0}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Create My Routine
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <>
            <header className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-gray-800"
                  >
                    Your Daily Routine
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-gray-600"
                  >
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </motion.p>
                </div>

                <div className="flex space-x-3">
                  <Dialog
                    open={personaRoutinesOpen}
                    onOpenChange={setPersonaRoutinesOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-blue-200 text-blue-700"
                      >
                        <Users className="h-4 w-4" />
                        Persona Routines
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          Choose a Persona-Based Routine
                        </DialogTitle>
                        <DialogDescription>
                          Select a lifestyle persona that matches your needs for
                          tailored self-care routines
                        </DialogDescription>
                      </DialogHeader>

                      <div className="py-4">
                        <PersonaRoutines
                          onSelectRoutine={(routines) => {
                            setRoutineItems(routines);
                            onSaveRoutine(routines);
                            setPersonaRoutinesOpen(false);
                          }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={aiSuggestionsOpen}
                    onOpenChange={setAiSuggestionsOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-purple-200 text-purple-700"
                      >
                        <Bot className="h-4 w-4" />
                        AI Suggestions
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>AI Routine Suggestions</DialogTitle>
                        <DialogDescription>
                          Personalized suggestions based on your wellness goals
                        </DialogDescription>
                      </DialogHeader>

                      {isGeneratingSuggestions ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                          <p className="text-purple-700 font-medium">
                            Generating personalized suggestions...
                          </p>
                        </div>
                      ) : (
                        <div className="py-4 space-y-4">
                          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
                            <div className="flex items-start gap-3">
                              <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <h3 className="text-sm font-medium text-blue-800">
                                  AI Recommendations
                                </h3>
                                <p className="text-sm text-blue-600 mt-1">
                                  Based on your goals, here are some suggested
                                  routine items you can add to your daily
                                  schedule.
                                </p>
                                <p className="text-sm text-blue-600 mt-1">
                                  <Button
                                    variant="link"
                                    className="p-0 h-auto text-blue-700"
                                    onClick={() => {
                                      setAiSuggestionsOpen(false);
                                      setPersonaRoutinesOpen(true);
                                    }}
                                  >
                                    Try persona-based routines instead
                                  </Button>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                            {aiSuggestions.map((suggestion) => (
                              <div
                                key={suggestion.id}
                                className="p-4 border border-purple-100 rounded-md hover:shadow-sm transition-shadow"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-medium text-gray-800">
                                      {suggestion.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge
                                        className={getCategoryColor(
                                          suggestion.category,
                                        )}
                                      >
                                        {suggestion.category
                                          .charAt(0)
                                          .toUpperCase() +
                                          suggestion.category.slice(1)}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className="text-gray-600"
                                      >
                                        {suggestion.duration} min
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className="text-gray-600"
                                      >
                                        {suggestion.timeOfDay
                                          .charAt(0)
                                          .toUpperCase() +
                                          suggestion.timeOfDay.slice(1)}
                                      </Badge>
                                    </div>
                                  </div>
                                  <Button
                                    onClick={() =>
                                      addSuggestionToRoutine(suggestion)
                                    }
                                    size="sm"
                                    className="bg-purple-100 hover:bg-purple-200 text-purple-700"
                                  >
                                    <Plus className="h-4 w-4 mr-1" /> Add
                                  </Button>
                                </div>
                                {suggestion.description && (
                                  <p className="text-sm text-gray-600 mt-2">
                                    {suggestion.description}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setAiSuggestionsOpen(false)}
                        >
                          Close
                        </Button>
                        <Button
                          onClick={generateAiSuggestions}
                          disabled={isGeneratingSuggestions}
                        >
                          {isGeneratingSuggestions ? (
                            <>
                              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Refresh Suggestions
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={newItemDialogOpen}
                    onOpenChange={setNewItemDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Routine Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add to Your Routine</DialogTitle>
                        <DialogDescription>
                          Create a new item for your daily wellness routine
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <label
                            htmlFor="title"
                            className="text-sm font-medium"
                          >
                            Title
                          </label>
                          <Input
                            id="title"
                            value={newItem.title}
                            onChange={(e) =>
                              setNewItem({ ...newItem, title: e.target.value })
                            }
                            placeholder="e.g., Morning Skincare Routine"
                            className="border-purple-200"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label
                            htmlFor="description"
                            className="text-sm font-medium"
                          >
                            Description (Optional)
                          </label>
                          <Textarea
                            id="description"
                            value={newItem.description || ""}
                            onChange={(e) =>
                              setNewItem({
                                ...newItem,
                                description: e.target.value,
                              })
                            }
                            placeholder="Brief description of this routine item"
                            className="border-purple-200"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label
                              htmlFor="category"
                              className="text-sm font-medium"
                            >
                              Category
                            </label>
                            <Select
                              value={newItem.category}
                              onValueChange={(value: any) =>
                                setNewItem({ ...newItem, category: value })
                              }
                            >
                              <SelectTrigger
                                id="category"
                                className="border-purple-200"
                              >
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beauty">Beauty</SelectItem>
                                <SelectItem value="fitness">Fitness</SelectItem>
                                <SelectItem value="mental">Mental</SelectItem>
                                <SelectItem value="nutrition">
                                  Nutrition
                                </SelectItem>
                                <SelectItem value="personal">
                                  Personal
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <label
                              htmlFor="duration"
                              className="text-sm font-medium"
                            >
                              Duration (minutes)
                            </label>
                            <Input
                              id="duration"
                              type="number"
                              min="1"
                              max="180"
                              value={newItem.duration}
                              onChange={(e) =>
                                setNewItem({
                                  ...newItem,
                                  duration: parseInt(e.target.value) || 15,
                                })
                              }
                              className="border-purple-200"
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <label
                            htmlFor="timeOfDay"
                            className="text-sm font-medium"
                          >
                            Time of Day
                          </label>
                          <Select
                            value={newItem.timeOfDay}
                            onValueChange={(value: any) =>
                              setNewItem({ ...newItem, timeOfDay: value })
                            }
                          >
                            <SelectTrigger
                              id="timeOfDay"
                              className="border-purple-200"
                            >
                              <SelectValue placeholder="Select time of day" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning</SelectItem>
                              <SelectItem value="afternoon">
                                Afternoon
                              </SelectItem>
                              <SelectItem value="evening">Evening</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="reminderEnabled"
                            checked={newItem.reminderEnabled}
                            onChange={(e) =>
                              setNewItem({
                                ...newItem,
                                reminderEnabled: e.target.checked,
                              })
                            }
                            className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                          />
                          <label
                            htmlFor="reminderEnabled"
                            className="text-sm font-medium"
                          >
                            Enable Reminder
                          </label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setNewItemDialogOpen(false)}
                          className="border-purple-200 text-purple-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleAddItem}
                          disabled={!newItem.title}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                        >
                          Add to Routine
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-purple-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    Today's Progress
                  </h3>
                  <span className="text-lg font-semibold text-purple-700">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>
                    {routineItems.filter((item) => item.completed).length} of{" "}
                    {routineItems.length} completed
                  </span>
                  <span className="flex items-center">
                    <Repeat className="h-4 w-4 mr-1" />
                    Daily Routine
                  </span>
                </div>
              </motion.div>
            </header>

            {/* Routine Sections by Time of Day */}
            <div className="space-y-8">
              {Object.entries(routineByTimeOfDay).map(([timeOfDay, items]) => {
                const { title, icon, description } =
                  getTimeOfDayInfo(timeOfDay);

                return (
                  <motion.div
                    key={timeOfDay}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="border-purple-200 shadow-sm overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
                        <div className="flex items-center gap-2">
                          {icon}
                          <CardTitle className="text-xl font-semibold text-gray-800">
                            {title}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-gray-600">
                          {description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-6">
                        {items.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-gray-500">
                              No {timeOfDay} routine items yet. Add some to get
                              started!
                            </p>
                            <Button
                              onClick={() => {
                                setNewItem({
                                  ...newItem,
                                  timeOfDay: timeOfDay as
                                    | "morning"
                                    | "afternoon"
                                    | "evening",
                                });
                                setNewItemDialogOpen(true);
                              }}
                              variant="outline"
                              className="mt-4 border-purple-200 text-purple-700"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add{" "}
                              {timeOfDay.charAt(0).toUpperCase() +
                                timeOfDay.slice(1)}{" "}
                              Item
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className={`border rounded-lg p-4 transition-all duration-300 ${item.completed ? "bg-gray-50 border-gray-200" : "bg-white border-purple-100 hover:border-purple-200"}`}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex items-start gap-3">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        handleToggleComplete(item.id)
                                      }
                                      className={`rounded-full h-6 w-6 p-0 ${item.completed ? "text-green-500 hover:text-green-600 hover:bg-green-50" : "text-gray-400 hover:text-purple-500 hover:bg-purple-50"}`}
                                    >
                                      {item.completed ? (
                                        <CheckCircle2 className="h-6 w-6" />
                                      ) : (
                                        <div className="h-5 w-5 rounded-full border-2 border-current" />
                                      )}
                                    </Button>
                                    <div
                                      className={
                                        item.completed ? "opacity-60" : ""
                                      }
                                    >
                                      <h3
                                        className={`font-medium ${item.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                                      >
                                        {item.title}
                                      </h3>
                                      {item.description && (
                                        <p className="text-sm text-gray-600 mt-1">
                                          {item.description}
                                        </p>
                                      )}
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        <Badge
                                          className={getCategoryColor(
                                            item.category,
                                          )}
                                        >
                                          {item.category
                                            .charAt(0)
                                            .toUpperCase() +
                                            item.category.slice(1)}
                                        </Badge>
                                        <Badge
                                          variant="outline"
                                          className="text-gray-600"
                                        >
                                          {item.duration} min
                                        </Badge>
                                        {item.reminderEnabled && (
                                          <Badge
                                            variant="outline"
                                            className="text-purple-600 border-purple-200"
                                          >
                                            <AlarmClock className="h-3 w-3 mr-1" />
                                            Reminder
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-gray-500 hover:text-gray-700"
                                      >
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setEditingItem(item);
                                        }}
                                      >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleDeleteItem(item.id)
                                        }
                                        className="text-red-600"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Edit Item Dialog */}
            {editingItem && (
              <Dialog
                open={!!editingItem}
                onOpenChange={(open) => !open && setEditingItem(null)}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Routine Item</DialogTitle>
                    <DialogDescription>
                      Update this item in your daily wellness routine
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label
                        htmlFor="edit-title"
                        className="text-sm font-medium"
                      >
                        Title
                      </label>
                      <Input
                        id="edit-title"
                        value={editingItem.title}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            title: e.target.value,
                          })
                        }
                        className="border-purple-200"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="edit-description"
                        className="text-sm font-medium"
                      >
                        Description (Optional)
                      </label>
                      <Textarea
                        id="edit-description"
                        value={editingItem.description || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            description: e.target.value,
                          })
                        }
                        className="border-purple-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label
                          htmlFor="edit-category"
                          className="text-sm font-medium"
                        >
                          Category
                        </label>
                        <Select
                          value={editingItem.category}
                          onValueChange={(value: any) =>
                            setEditingItem({ ...editingItem, category: value })
                          }
                        >
                          <SelectTrigger
                            id="edit-category"
                            className="border-purple-200"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beauty">Beauty</SelectItem>
                            <SelectItem value="fitness">Fitness</SelectItem>
                            <SelectItem value="mental">Mental</SelectItem>
                            <SelectItem value="nutrition">Nutrition</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="edit-duration"
                          className="text-sm font-medium"
                        >
                          Duration (minutes)
                        </label>
                        <Input
                          id="edit-duration"
                          type="number"
                          min="1"
                          max="180"
                          value={editingItem.duration}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              duration: parseInt(e.target.value) || 15,
                            })
                          }
                          className="border-purple-200"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="edit-timeOfDay"
                        className="text-sm font-medium"
                      >
                        Time of Day
                      </label>
                      <Select
                        value={editingItem.timeOfDay}
                        onValueChange={(value: any) =>
                          setEditingItem({ ...editingItem, timeOfDay: value })
                        }
                      >
                        <SelectTrigger
                          id="edit-timeOfDay"
                          className="border-purple-200"
                        >
                          <SelectValue placeholder="Select time of day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="edit-reminderEnabled"
                        checked={editingItem.reminderEnabled}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            reminderEnabled: e.target.checked,
                          })
                        }
                        className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label
                        htmlFor="edit-reminderEnabled"
                        className="text-sm font-medium"
                      >
                        Enable Reminder
                      </label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setEditingItem(null)}
                      className="border-purple-200 text-purple-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpdateItem}
                      disabled={!editingItem.title}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Helper function to generate AI suggestions based on user goals
function generateSuggestionsFromGoals(goals: string[]): RoutineItem[] {
  const suggestions: RoutineItem[] = [];

  // Map common keywords to categories and generate appropriate suggestions
  goals.forEach((goal) => {
    const goalLower = goal.toLowerCase();

    // Skincare related
    if (
      goalLower.includes("skin") ||
      goalLower.includes("face") ||
      goalLower.includes("cleanse")
    ) {
      if (goalLower.includes("morning") || goalLower.includes("am")) {
        suggestions.push({
          id: `ai-suggestion-${Date.now()}-1`,
          title: "Morning Skincare Routine",
          description:
            "Cleanse, tone, moisturize, and apply sunscreen to protect your skin throughout the day.",
          category: "beauty",
          duration: 10,
          completed: false,
          timeOfDay: "morning",
          reminderEnabled: true,
          reminderTime: "07:00",
        });
      } else if (
        goalLower.includes("evening") ||
        goalLower.includes("night") ||
        goalLower.includes("pm")
      ) {
        suggestions.push({
          id: `ai-suggestion-${Date.now()}-2`,
          title: "Evening Skincare Routine",
          description:
            "Double cleanse, exfoliate (if needed), apply serum, moisturize, and use night cream.",
          category: "beauty",
          duration: 15,
          completed: false,
          timeOfDay: "evening",
          reminderEnabled: true,
          reminderTime: "21:00",
        });
      } else {
        suggestions.push({
          id: `ai-suggestion-${Date.now()}-3`,
          title: "Daily Skincare Routine",
          description:
            "Complete your personalized skincare regimen for healthy, glowing skin.",
          category: "beauty",
          duration: 10,
          completed: false,
          timeOfDay: "morning",
          reminderEnabled: true,
        });
      }
    }

    // Hair related
    if (
      goalLower.includes("hair") ||
      goalLower.includes("detangle") ||
      goalLower.includes("rejuvenate")
    ) {
      suggestions.push({
        id: `ai-suggestion-${Date.now()}-4`,
        title: "Hair Care Routine",
        description:
          "Detangle, apply hair treatment, and style your hair for the day.",
        category: "beauty",
        duration: 15,
        completed: false,
        timeOfDay: goalLower.includes("morning") ? "morning" : "evening",
        reminderEnabled: false,
      });
    }

    // Workout related
    if (
      goalLower.includes("workout") ||
      goalLower.includes("exercise") ||
      goalLower.includes("fitness") ||
      goalLower.includes("gym") ||
      goalLower.includes("legs") ||
      goalLower.includes("cardio")
    ) {
      let workoutTitle = "Daily Workout";
      let workoutDesc =
        "Complete your daily exercise routine for better health and fitness.";
      let workoutDuration = 30;

      if (goalLower.includes("leg")) {
        workoutTitle = "Leg Workout";
        workoutDesc =
          "Focus on strengthening and toning your legs with targeted exercises.";
      } else if (goalLower.includes("cardio")) {
        workoutTitle = "Cardio Session";
        workoutDesc =
          "Get your heart rate up with an energizing cardio workout.";
      } else if (
        goalLower.includes("strength") ||
        goalLower.includes("weight")
      ) {
        workoutTitle = "Strength Training";
        workoutDesc =
          "Build muscle and increase strength with resistance exercises.";
      }

      // Extract duration if mentioned
      const durationMatch = goalLower.match(/(\d+)\s*min/);
      if (durationMatch && durationMatch[1]) {
        workoutDuration = parseInt(durationMatch[1]);
      }

      suggestions.push({
        id: `ai-suggestion-${Date.now()}-5`,
        title: workoutTitle,
        description: workoutDesc,
        category: "fitness",
        duration: workoutDuration,
        completed: false,
        timeOfDay: goalLower.includes("morning")
          ? "morning"
          : goalLower.includes("evening") || goalLower.includes("night")
            ? "evening"
            : "afternoon",
        reminderEnabled: true,
      });
    }

    // Reading related
    if (goalLower.includes("read") || goalLower.includes("book")) {
      let readingDuration = 20; // default

      // Extract duration if mentioned
      const durationMatch = goalLower.match(/(\d+)(?:\s*-\s*(\d+))?\s*min/);
      if (durationMatch) {
        if (durationMatch[2]) {
          // range provided (e.g., 10-30 mins)
          readingDuration = Math.floor(
            (parseInt(durationMatch[1]) + parseInt(durationMatch[2])) / 2,
          );
        } else if (durationMatch[1]) {
          readingDuration = parseInt(durationMatch[1]);
        }
      }

      suggestions.push({
        id: `ai-suggestion-${Date.now()}-6`,
        title: "Reading Time",
        description: `Dedicate ${readingDuration} minutes to reading for knowledge and relaxation.`,
        category: "personal",
        duration: readingDuration,
        completed: false,
        timeOfDay: goalLower.includes("morning")
          ? "morning"
          : goalLower.includes("afternoon")
            ? "afternoon"
            : "evening",
        reminderEnabled: false,
      });
    }

    // Meditation/Mental wellness related
    if (
      goalLower.includes("meditat") ||
      goalLower.includes("mindful") ||
      goalLower.includes("relax") ||
      goalLower.includes("mental") ||
      goalLower.includes("affirmation")
    ) {
      if (goalLower.includes("affirmation")) {
        suggestions.push({
          id: `ai-suggestion-${Date.now()}-7`,
          title: "Daily Affirmations",
          description:
            "Practice positive affirmations to boost confidence and mental wellbeing.",
          category: "mental",
          duration: 5,
          completed: false,
          timeOfDay: "morning",
          reminderEnabled: true,
        });
      } else {
        suggestions.push({
          id: `ai-suggestion-${Date.now()}-8`,
          title: "Meditation Session",
          description: "Take time to center yourself with mindful meditation.",
          category: "mental",
          duration: 10,
          completed: false,
          timeOfDay: goalLower.includes("morning")
            ? "morning"
            : goalLower.includes("evening") || goalLower.includes("night")
              ? "evening"
              : "afternoon",
          reminderEnabled: true,
        });
      }
    }

    // Nutrition related
    if (
      goalLower.includes("meal") ||
      goalLower.includes("nutrition") ||
      goalLower.includes("eat") ||
      goalLower.includes("diet") ||
      goalLower.includes("food")
    ) {
      suggestions.push({
        id: `ai-suggestion-${Date.now()}-9`,
        title: "Healthy Meal Preparation",
        description:
          "Prepare nutritious meals that support your wellness goals.",
        category: "nutrition",
        duration: 30,
        completed: false,
        timeOfDay: goalLower.includes("morning")
          ? "morning"
          : goalLower.includes("evening")
            ? "evening"
            : "afternoon",
        reminderEnabled: false,
      });
    }

    // Generic self-care
    if (
      goalLower.includes("self") ||
      goalLower.includes("care") ||
      goalLower.includes("time")
    ) {
      suggestions.push({
        id: `ai-suggestion-${Date.now()}-10`,
        title: "Self-Care Time",
        description:
          "Dedicate time to activities that bring you joy and relaxation.",
        category: "personal",
        duration: 20,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: false,
      });
    }
  });

  // If no specific suggestions were generated, add some defaults
  if (suggestions.length === 0) {
    suggestions.push(
      {
        id: `ai-suggestion-${Date.now()}-11`,
        title: "Morning Wellness Routine",
        description:
          "Start your day with intention through a combination of skincare, light exercise, and mindfulness.",
        category: "personal",
        duration: 20,
        completed: false,
        timeOfDay: "morning",
        reminderEnabled: true,
      },
      {
        id: `ai-suggestion-${Date.now()}-12`,
        title: "Evening Wind-Down",
        description:
          "Prepare your mind and body for restful sleep with a calming routine.",
        category: "mental",
        duration: 15,
        completed: false,
        timeOfDay: "evening",
        reminderEnabled: true,
      },
    );
  }

  // Ensure we don't have too many suggestions
  return suggestions.slice(0, 6);
}

// Default routine items
const defaultRoutineItems: RoutineItem[] = [
  {
    id: "routine-1",
    title: "Morning Skincare Routine",
    description: "Cleanse, tone, moisturize, and apply sunscreen",
    category: "beauty",
    duration: 10,
    completed: false,
    timeOfDay: "morning",
    reminderEnabled: true,
    reminderTime: "07:30",
  },
  {
    id: "routine-2",
    title: "10-Minute Meditation",
    description: "Practice mindfulness to start the day centered",
    category: "mental",
    duration: 10,
    completed: false,
    timeOfDay: "morning",
    reminderEnabled: true,
    reminderTime: "08:00",
  },
  {
    id: "routine-3",
    title: "Afternoon Stretch Break",
    description: "Take a break from work to stretch and reset",
    category: "fitness",
    duration: 5,
    completed: false,
    timeOfDay: "afternoon",
    reminderEnabled: true,
    reminderTime: "14:00",
  },
  {
    id: "routine-4",
    title: "Evening Skincare Routine",
    description: "Double cleanse, apply serum, and moisturize",
    category: "beauty",
    duration: 15,
    completed: false,
    timeOfDay: "evening",
    reminderEnabled: true,
    reminderTime: "21:00",
  },
  {
    id: "routine-5",
    title: "Reading Time",
    description: "Read a book before bed to relax the mind",
    category: "personal",
    duration: 20,
    completed: false,
    timeOfDay: "evening",
    reminderEnabled: false,
  },
];

export default DailyRoutineBuilder;
