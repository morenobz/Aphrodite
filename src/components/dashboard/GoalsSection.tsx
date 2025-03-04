import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Plus, Edit, Check, Trash2 } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: "beauty" | "wellness" | "mental";
}

interface GoalsSectionProps {
  goals?: Goal[];
  onAddGoal?: () => void;
  onEditGoal?: (id: string) => void;
  onDeleteGoal?: (id: string) => void;
}

const GoalsSection = ({
  goals = [
    {
      id: "1",
      title: "Skincare Routine",
      description: "Follow morning and evening skincare routine daily",
      progress: 75,
      category: "beauty",
    },
    {
      id: "2",
      title: "Meditation",
      description: "Practice 10 minutes of meditation daily",
      progress: 40,
      category: "mental",
    },
    {
      id: "3",
      title: "Hydration",
      description: "Drink 8 glasses of water daily",
      progress: 60,
      category: "wellness",
    },
  ],
  onAddGoal = () => console.log("Add goal clicked"),
  onEditGoal = (id) => console.log(`Edit goal ${id}`),
  onDeleteGoal = (id) => console.log(`Delete goal ${id}`),
}: GoalsSectionProps) => {
  // Function to get category-specific styling
  const getCategoryStyle = (category: Goal["category"]) => {
    switch (category) {
      case "beauty":
        return "bg-pink-100 text-pink-800";
      case "wellness":
        return "bg-purple-100 text-purple-800";
      case "mental":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get progress bar color
  const getProgressColor = (category: Goal["category"]) => {
    switch (category) {
      case "beauty":
        return "bg-pink-500";
      case "wellness":
        return "bg-purple-500";
      case "mental":
        return "bg-indigo-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Goals</h2>
        <Button
          onClick={onAddGoal}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryStyle(goal.category)}`}
                  >
                    {goal.category.charAt(0).toUpperCase() +
                      goal.category.slice(1)}
                  </span>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                    onClick={() => onEditGoal(goal.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-red-500"
                    onClick={() => onDeleteGoal(goal.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-sm text-gray-600">
                {goal.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Progress
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {goal.progress}%
                  </span>
                </div>
                <Progress
                  value={goal.progress}
                  className="h-2 bg-gray-200"
                  // Override the default indicator style with custom colors
                  style={
                    {
                      "--progress-background": getProgressColor(goal.category),
                    } as React.CSSProperties
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4">
              {goal.progress === 100 ? (
                <div className="flex items-center text-green-600 text-sm">
                  <Check className="mr-1 h-4 w-4" />
                  Completed
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border border-gray-300 hover:bg-gray-50"
                  onClick={() => onEditGoal(goal.id)}
                >
                  Update Progress
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalsSection;
