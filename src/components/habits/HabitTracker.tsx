import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import {
  Check,
  Plus,
  Bell,
  Trash2,
  Edit,
  MoreVertical,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Habit {
  id: string;
  name: string;
  description?: string;
  category: "beauty" | "fitness" | "mental" | "nutrition";
  frequency: "daily" | "weekly" | "monthly";
  timeOfDay?: "morning" | "afternoon" | "evening" | "anytime";
  streak: number;
  completedDates: Date[];
  reminderEnabled: boolean;
  reminderTime?: string;
  createdAt: Date;
}

interface HabitTrackerProps {
  habits?: Habit[];
  onAddHabit?: (
    habit: Omit<Habit, "id" | "streak" | "completedDates" | "createdAt">,
  ) => void;
  onDeleteHabit?: (id: string) => void;
  onEditHabit?: (id: string, updates: Partial<Habit>) => void;
  onToggleComplete?: (id: string, date: Date, completed: boolean) => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({
  habits = defaultHabits,
  onAddHabit = () => {},
  onDeleteHabit = () => {},
  onEditHabit = () => {},
  onToggleComplete = () => {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [newHabitDialogOpen, setNewHabitDialogOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    category: "beauty" as const,
    frequency: "daily" as const,
    timeOfDay: "morning" as const,
    reminderEnabled: false,
  });

  // Get today and the past 6 days for the weekly view
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // 0 = Sunday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Filter habits by category
  const filteredHabits =
    selectedCategory === "all"
      ? habits
      : habits.filter((habit) => habit.category === selectedCategory);

  // Calculate completion rate for today
  const calculateTodayCompletionRate = () => {
    const totalHabits = habits.length;
    if (totalHabits === 0) return 0;

    const completedToday = habits.filter((habit) =>
      habit.completedDates.some((date) => isSameDay(date, today)),
    ).length;

    return (completedToday / totalHabits) * 100;
  };

  const todayCompletionRate = calculateTodayCompletionRate();

  // Handle habit completion toggle
  const handleToggleComplete = (habit: Habit, date: Date) => {
    const isCompleted = habit.completedDates.some((d) => isSameDay(d, date));
    onToggleComplete(habit.id, date, !isCompleted);
  };

  // Handle adding a new habit
  const handleAddHabit = () => {
    onAddHabit(newHabit);
    setNewHabit({
      name: "",
      description: "",
      category: "beauty",
      frequency: "daily",
      timeOfDay: "morning",
      reminderEnabled: false,
    });
    setNewHabitDialogOpen(false);
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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-purple-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-purple-800">
                Habit Tracker
              </CardTitle>
              <CardDescription className="text-purple-600">
                Track your daily self-care routines
              </CardDescription>
            </div>
            <Dialog
              open={newHabitDialogOpen}
              onOpenChange={setNewHabitDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Habit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Habit</DialogTitle>
                  <DialogDescription>
                    Add a new self-care habit to track daily, weekly, or
                    monthly.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Habit Name</Label>
                    <Input
                      id="name"
                      value={newHabit.name}
                      onChange={(e) =>
                        setNewHabit({ ...newHabit, name: e.target.value })
                      }
                      placeholder="e.g., Morning Skincare Routine"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input
                      id="description"
                      value={newHabit.description}
                      onChange={(e) =>
                        setNewHabit({
                          ...newHabit,
                          description: e.target.value,
                        })
                      }
                      placeholder="Brief description of your habit"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newHabit.category}
                        onValueChange={(value: any) =>
                          setNewHabit({ ...newHabit, category: value })
                        }
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beauty">Beauty</SelectItem>
                          <SelectItem value="fitness">Fitness</SelectItem>
                          <SelectItem value="mental">Mental</SelectItem>
                          <SelectItem value="nutrition">Nutrition</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select
                        value={newHabit.frequency}
                        onValueChange={(value: any) =>
                          setNewHabit({ ...newHabit, frequency: value })
                        }
                      >
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timeOfDay">Time of Day</Label>
                    <Select
                      value={newHabit.timeOfDay}
                      onValueChange={(value: any) =>
                        setNewHabit({ ...newHabit, timeOfDay: value })
                      }
                    >
                      <SelectTrigger id="timeOfDay">
                        <SelectValue placeholder="Select time of day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="reminderEnabled"
                      checked={newHabit.reminderEnabled}
                      onChange={(e) =>
                        setNewHabit({
                          ...newHabit,
                          reminderEnabled: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <Label
                      htmlFor="reminderEnabled"
                      className="text-sm font-normal"
                    >
                      Enable Reminder
                    </Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setNewHabitDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddHabit} disabled={!newHabit.name}>
                    Create Habit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-purple-700">
                Today's Progress
              </span>
              <span className="text-sm font-medium text-purple-700">
                {Math.round(todayCompletionRate)}%
              </span>
            </div>
            <Progress
              value={todayCompletionRate}
              className="h-2 bg-purple-100"
            />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={
                selectedCategory === "all"
                  ? "bg-purple-500 hover:bg-purple-600"
                  : "border-purple-200 text-purple-700"
              }
            >
              All
            </Button>
            <Button
              variant={selectedCategory === "beauty" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("beauty")}
              className={
                selectedCategory === "beauty"
                  ? "bg-pink-500 hover:bg-pink-600"
                  : "border-pink-200 text-pink-700"
              }
            >
              Beauty
            </Button>
            <Button
              variant={selectedCategory === "fitness" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("fitness")}
              className={
                selectedCategory === "fitness"
                  ? "bg-purple-500 hover:bg-purple-600"
                  : "border-purple-200 text-purple-700"
              }
            >
              Fitness
            </Button>
            <Button
              variant={selectedCategory === "mental" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("mental")}
              className={
                selectedCategory === "mental"
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "border-indigo-200 text-indigo-700"
              }
            >
              Mental
            </Button>
            <Button
              variant={selectedCategory === "nutrition" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("nutrition")}
              className={
                selectedCategory === "nutrition"
                  ? "bg-green-500 hover:bg-green-600"
                  : "border-green-200 text-green-700"
              }
            >
              Nutrition
            </Button>
          </div>

          {/* Week Days */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex min-w-max">
              {weekDays.map((day, index) => (
                <div key={index} className="flex-1 text-center min-w-[80px]">
                  <div className="text-xs font-medium text-gray-500 mb-1">
                    {format(day, "EEE")}
                  </div>
                  <div
                    className={`text-sm font-semibold ${isSameDay(day, today) ? "text-purple-600 bg-purple-50 rounded-full" : "text-gray-700"}`}
                  >
                    {format(day, "d")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Habits List */}
          <div className="space-y-4">
            {filteredHabits.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No habits found. Add your first habit to get started!
                </p>
              </div>
            ) : (
              filteredHabits.map((habit) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-800">
                          {habit.name}
                        </h3>
                        <Badge
                          className={`ml-2 ${getCategoryColor(habit.category)}`}
                        >
                          {habit.category.charAt(0).toUpperCase() +
                            habit.category.slice(1)}
                        </Badge>
                        {habit.reminderEnabled && (
                          <Badge
                            variant="outline"
                            className="ml-2 border-purple-200 text-purple-700"
                          >
                            <Bell className="h-3 w-3 mr-1" />
                            Reminder
                          </Badge>
                        )}
                      </div>
                      {habit.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {habit.description}
                        </p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onEditHabit(habit.id, {})}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteHabit(habit.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className="border-purple-200 text-purple-700"
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        {habit.frequency.charAt(0).toUpperCase() +
                          habit.frequency.slice(1)}
                      </Badge>
                      {habit.streak > 0 && (
                        <Badge className="ml-2 bg-amber-100 text-amber-800">
                          {habit.streak} day streak 🔥
                        </Badge>
                      )}
                    </div>
                    <div className="flex">
                      {weekDays.map((day, index) => {
                        const isCompleted = habit.completedDates.some((d) =>
                          isSameDay(d, day),
                        );
                        return (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleToggleComplete(habit, day)}
                            className={`
                              w-8 h-8 mx-1 rounded-full flex items-center justify-center
                              ${isCompleted ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}
                              ${isSameDay(day, today) ? "ring-2 ring-purple-300" : ""}
                            `}
                          >
                            {isCompleted ? <Check className="h-4 w-4" /> : ""}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 flex justify-between">
          <Button
            variant="outline"
            className="border-purple-200 text-purple-700"
          >
            View All Habits
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            View Statistics
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Default habits for demo
const defaultHabits: Habit[] = [
  {
    id: "1",
    name: "Morning Skincare Routine",
    description: "Cleanse, tone, moisturize, and apply sunscreen",
    category: "beauty",
    frequency: "daily",
    timeOfDay: "morning",
    streak: 5,
    completedDates: [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 2)),
      new Date(new Date().setDate(new Date().getDate() - 3)),
      new Date(new Date().setDate(new Date().getDate() - 4)),
      new Date(new Date().setDate(new Date().getDate() - 5)),
    ],
    reminderEnabled: true,
    reminderTime: "07:00",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
  },
  {
    id: "2",
    name: "10-Minute Meditation",
    description: "Mindfulness meditation for stress reduction",
    category: "mental",
    frequency: "daily",
    timeOfDay: "morning",
    streak: 3,
    completedDates: [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 2)),
      new Date(new Date().setDate(new Date().getDate() - 3)),
    ],
    reminderEnabled: true,
    reminderTime: "08:00",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 15)),
  },
  {
    id: "3",
    name: "30-Minute Workout",
    description: "Mix of cardio and strength training",
    category: "fitness",
    frequency: "daily",
    timeOfDay: "afternoon",
    streak: 0,
    completedDates: [],
    reminderEnabled: true,
    reminderTime: "17:00",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
  {
    id: "4",
    name: "Drink 8 Glasses of Water",
    description: "Stay hydrated throughout the day",
    category: "nutrition",
    frequency: "daily",
    timeOfDay: "anytime",
    streak: 2,
    completedDates: [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 2)),
    ],
    reminderEnabled: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
  },
  {
    id: "5",
    name: "Evening Skincare Routine",
    description: "Cleanse, exfoliate, apply serum and night cream",
    category: "beauty",
    frequency: "daily",
    timeOfDay: "evening",
    streak: 7,
    completedDates: [
      new Date(),
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 2)),
      new Date(new Date().setDate(new Date().getDate() - 3)),
      new Date(new Date().setDate(new Date().getDate() - 4)),
      new Date(new Date().setDate(new Date().getDate() - 5)),
      new Date(new Date().setDate(new Date().getDate() - 6)),
    ],
    reminderEnabled: true,
    reminderTime: "21:00",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 20)),
  },
];

export default HabitTracker;
