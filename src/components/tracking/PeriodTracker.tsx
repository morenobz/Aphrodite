import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  format,
  addDays,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Info,
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
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PeriodDay {
  date: Date;
  flow?: "light" | "medium" | "heavy" | null;
  symptoms?: string[];
  notes?: string;
}

interface PeriodTrackerProps {
  cycleLength?: number;
  periodLength?: number;
  lastPeriodStart?: Date;
  periodData?: PeriodDay[];
  onDateSelect?: (date: Date) => void;
  onDataUpdate?: (data: PeriodDay[]) => void;
}

const PeriodTracker: React.FC<PeriodTrackerProps> = ({
  cycleLength = 28,
  periodLength = 5,
  lastPeriodStart = new Date(2023, 5, 15), // June 15, 2023
  periodData = [],
  onDateSelect = () => {},
  onDataUpdate = () => {},
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calculate predicted period days
  const calculatePredictedPeriods = () => {
    const predictions: Date[] = [];
    let startDate = new Date(lastPeriodStart);

    // Generate 3 future cycles
    for (let i = 0; i < 3; i++) {
      // Add cycle length to get next period start
      startDate = addDays(startDate, cycleLength);

      // Add all days of the period
      for (let day = 0; day < periodLength; day++) {
        predictions.push(addDays(startDate, day));
      }
    }

    return predictions;
  };

  const predictedPeriods = calculatePredictedPeriods();

  // Check if a date is a predicted period day
  const isPredictedPeriodDay = (date: Date) => {
    return predictedPeriods.some((d) => isSameDay(d, date));
  };

  // Check if a date has logged period data
  const getLoggedPeriodData = (date: Date) => {
    return periodData.find((d) => isSameDay(d.date, date));
  };

  // Get days for the current month view
  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  // Navigate to previous month
  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  // Calculate next period start date
  const nextPeriodStart = addDays(lastPeriodStart, cycleLength);
  const daysUntilNextPeriod = Math.round(
    (nextPeriodStart.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Determine current cycle phase
  const getCurrentPhase = () => {
    const daysSinceLastPeriod = Math.round(
      (currentDate.getTime() - lastPeriodStart.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (daysSinceLastPeriod >= 0 && daysSinceLastPeriod < periodLength) {
      return {
        name: "Menstrual",
        color: "bg-red-100 text-red-800",
        description: "Your period is happening now.",
      };
    } else if (
      daysSinceLastPeriod >= periodLength &&
      daysSinceLastPeriod < 14
    ) {
      return {
        name: "Follicular",
        color: "bg-yellow-100 text-yellow-800",
        description: "Your body is preparing for ovulation.",
      };
    } else if (daysSinceLastPeriod >= 14 && daysSinceLastPeriod < 17) {
      return {
        name: "Ovulatory",
        color: "bg-green-100 text-green-800",
        description: "You are most fertile during this phase.",
      };
    } else {
      return {
        name: "Luteal",
        color: "bg-purple-100 text-purple-800",
        description: "Your body is preparing for your next period.",
      };
    }
  };

  const currentPhase = getCurrentPhase();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-pink-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-purple-800">
                Period Tracker
              </CardTitle>
              <CardDescription className="text-purple-600">
                Track your cycle and symptoms
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={currentPhase.color}>
                {currentPhase.name} Phase
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <Info className="h-4 w-4 text-purple-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{currentPhase.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calendar Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {format(currentMonth, "MMMM yyyy")}
                </h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={previousMonth}
                    className="h-8 w-8 border-pink-200 text-pink-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextMonth}
                    className="h-8 w-8 border-pink-200 text-pink-700"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="text-xs font-medium text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {getDaysInMonth().map((day, i) => {
                  const isToday = isSameDay(day, new Date());
                  const isSelected =
                    selectedDate && isSameDay(day, selectedDate);
                  const isPeriodDay = isPredictedPeriodDay(day);
                  const loggedData = getLoggedPeriodData(day);
                  const isCurrentMonth = isSameMonth(day, currentMonth);

                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDateSelect(day)}
                      className={`
                        relative rounded-full w-10 h-10 mx-auto flex items-center justify-center text-sm
                        ${!isCurrentMonth ? "text-gray-300" : ""}
                        ${isToday ? "border border-pink-400" : ""}
                        ${isSelected ? "bg-pink-500 text-white" : ""}
                        ${isPeriodDay && !isSelected ? "bg-pink-100 text-pink-800" : ""}
                        ${loggedData && !isSelected ? "bg-pink-200 text-pink-800" : ""}
                      `}
                    >
                      {format(day, "d")}
                      {loggedData?.flow && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <Droplet
                            className={`h-3 w-3 ${loggedData.flow === "light" ? "text-pink-300" : loggedData.flow === "medium" ? "text-pink-500" : "text-pink-700"}`}
                            fill="currentColor"
                          />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-100 mr-1"></div>
                  <span>Predicted</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-200 mr-1"></div>
                  <span>Logged</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full border border-pink-400 mr-1"></div>
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* Cycle Information */}
            <div>
              <div className="bg-pink-50 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-medium text-pink-800 mb-2 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Cycle Summary
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">
                      Average Cycle Length
                    </p>
                    <p className="text-lg font-medium">{cycleLength} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Average Period Length
                    </p>
                    <p className="text-lg font-medium">{periodLength} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Next Period Expected
                    </p>
                    <p className="text-lg font-medium">
                      {format(nextPeriodStart, "MMMM d, yyyy")}
                      <Badge className="ml-2 bg-pink-100 text-pink-800">
                        {daysUntilNextPeriod > 0
                          ? `In ${daysUntilNextPeriod} days`
                          : "Today"}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>

              {selectedDate && (
                <div className="border border-pink-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    {format(selectedDate, "MMMM d, yyyy")}
                  </h3>

                  {isPredictedPeriodDay(selectedDate) && (
                    <Badge className="bg-pink-100 text-pink-800 mb-3">
                      Predicted Period Day
                    </Badge>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Flow
                      </label>
                      <div className="flex space-x-2">
                        {["light", "medium", "heavy"].map((flow) => (
                          <Button
                            key={flow}
                            variant="outline"
                            size="sm"
                            className={`
                              border-pink-200 
                              ${getLoggedPeriodData(selectedDate)?.flow === flow ? "bg-pink-100 text-pink-800" : ""}
                            `}
                            onClick={() => {
                              // This would update the period data in a real app
                              console.log(
                                `Selected flow: ${flow} for ${format(selectedDate, "yyyy-MM-dd")}`,
                              );
                            }}
                          >
                            {flow.charAt(0).toUpperCase() + flow.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Common Symptoms
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Cramps",
                          "Headache",
                          "Bloating",
                          "Fatigue",
                          "Mood Swings",
                        ].map((symptom) => (
                          <Badge
                            key={symptom}
                            variant="outline"
                            className={`
                              cursor-pointer border-pink-200
                              ${getLoggedPeriodData(selectedDate)?.symptoms?.includes(symptom) ? "bg-pink-100 text-pink-800" : ""}
                            `}
                            onClick={() => {
                              // This would toggle the symptom in a real app
                              console.log(
                                `Toggled symptom: ${symptom} for ${format(selectedDate, "yyyy-MM-dd")}`,
                              );
                            }}
                          >
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 flex justify-between">
          <Button variant="outline" className="border-pink-200 text-pink-700">
            View Insights
          </Button>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PeriodTracker;
