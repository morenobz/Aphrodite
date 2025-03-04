import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface OnboardingFlowProps {
  onComplete?: () => void;
  initialStep?: number;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete = () => {},
  initialStep = 0,
}) => {
  const [step, setStep] = useState(initialStep);
  const navigate = useNavigate();
  const totalSteps = 4;

  // Form schemas for each step
  const personalInfoSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Please enter a valid age",
    }),
  });

  const beautyGoalsSchema = z.object({
    skinGoals: z
      .array(z.string())
      .min(1, { message: "Select at least one skin goal" }),
    hairGoals: z
      .array(z.string())
      .min(1, { message: "Select at least one hair goal" }),
  });

  const wellnessGoalsSchema = z.object({
    fitnessLevel: z
      .string()
      .min(1, { message: "Please select your fitness level" }),
    sleepQuality: z
      .string()
      .min(1, { message: "Please rate your sleep quality" }),
    stressLevel: z
      .string()
      .min(1, { message: "Please rate your stress level" }),
  });

  const preferencesSchema = z.object({
    notificationPreference: z
      .string()
      .min(1, { message: "Please select a notification preference" }),
    theme: z.string().min(1, { message: "Please select a theme" }),
  });

  // Form setup for each step
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      age: "",
    },
  });

  const beautyGoalsForm = useForm<z.infer<typeof beautyGoalsSchema>>({
    resolver: zodResolver(beautyGoalsSchema),
    defaultValues: {
      skinGoals: [],
      hairGoals: [],
    },
  });

  const wellnessGoalsForm = useForm<z.infer<typeof wellnessGoalsSchema>>({
    resolver: zodResolver(wellnessGoalsSchema),
    defaultValues: {
      fitnessLevel: "",
      sleepQuality: "",
      stressLevel: "",
    },
  });

  const preferencesForm = useForm<z.infer<typeof preferencesSchema>>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      notificationPreference: "",
      theme: "light",
    },
  });

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onComplete();
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const onSubmitPersonalInfo = (data: z.infer<typeof personalInfoSchema>) => {
    console.log("Personal info:", data);
    handleNext();
  };

  const onSubmitBeautyGoals = (data: z.infer<typeof beautyGoalsSchema>) => {
    console.log("Beauty goals:", data);
    handleNext();
  };

  const onSubmitWellnessGoals = (data: z.infer<typeof wellnessGoalsSchema>) => {
    console.log("Wellness goals:", data);
    handleNext();
  };

  const onSubmitPreferences = (data: z.infer<typeof preferencesSchema>) => {
    console.log("Preferences:", data);
    handleNext();
  };

  // Step content components
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Form {...personalInfoForm}>
            <form
              onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)}
              className="space-y-6"
            >
              <FormField
                control={personalInfoForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-700">Your Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="border-purple-200 focus:border-purple-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-pink-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-700">Your Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your age"
                        className="border-purple-200 focus:border-purple-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-pink-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
      case 1:
        return (
          <Form {...beautyGoalsForm}>
            <form
              onSubmit={beautyGoalsForm.handleSubmit(onSubmitBeautyGoals)}
              className="space-y-6"
            >
              <FormField
                control={beautyGoalsForm.control}
                name="skinGoals"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-purple-700">
                      Skin Goals
                    </FormLabel>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "Clear skin",
                        "Anti-aging",
                        "Hydration",
                        "Even tone",
                        "Reduce acne",
                        "Minimize pores",
                      ].map((goal) => (
                        <FormField
                          key={goal}
                          control={beautyGoalsForm.control}
                          name="skinGoals"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={goal}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-purple-100 p-3"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(goal)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, goal])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== goal,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {goal}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage className="text-pink-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={beautyGoalsForm.control}
                name="hairGoals"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-purple-700">
                      Hair Goals
                    </FormLabel>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "Growth",
                        "Strength",
                        "Shine",
                        "Volume",
                        "Reduce frizz",
                        "Scalp health",
                      ].map((goal) => (
                        <FormField
                          key={goal}
                          control={beautyGoalsForm.control}
                          name="hairGoals"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={goal}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-purple-100 p-3"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(goal)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, goal])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== goal,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {goal}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage className="text-pink-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
      case 2:
        return (
          <Form {...wellnessGoalsForm}>
            <form
              onSubmit={wellnessGoalsForm.handleSubmit(onSubmitWellnessGoals)}
              className="space-y-6"
            >
              <FormField
                control={wellnessGoalsForm.control}
                name="fitnessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-700">
                      Your Fitness Level
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-purple-200 focus:ring-purple-300">
                          <SelectValue placeholder="Select your fitness level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-pink-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={wellnessGoalsForm.control}
                name="sleepQuality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-700">
                      Sleep Quality
                    </FormLabel>
                    <div className="space-y-2">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {[
                          { value: "poor", label: "Poor" },
                          { value: "fair", label: "Fair" },
                          { value: "good", label: "Good" },
                          { value: "excellent", label: "Excellent" },
                        ].map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={`sleep-${option.value}`}
                            />
                            <FormLabel
                              htmlFor={`sleep-${option.value}`}
                              className="font-normal"
                            >
                              {option.label}
                            </FormLabel>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <FormMessage className="text-pink-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={wellnessGoalsForm.control}
                name="stressLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-700">
                      Stress Level
                    </FormLabel>
                    <div className="space-y-2">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {[
                          { value: "low", label: "Low" },
                          { value: "moderate", label: "Moderate" },
                          { value: "high", label: "High" },
                          { value: "severe", label: "Severe" },
                        ].map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={`stress-${option.value}`}
                            />
                            <FormLabel
                              htmlFor={`stress-${option.value}`}
                              className="font-normal"
                            >
                              {option.label}
                            </FormLabel>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <FormMessage className="text-pink-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
      case 3:
        return (
          <Form {...preferencesForm}>
            <form
              onSubmit={preferencesForm.handleSubmit(onSubmitPreferences)}
              className="space-y-6"
            >
              <FormField
                control={preferencesForm.control}
                name="notificationPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-700">
                      Notification Preferences
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-purple-200 focus:ring-purple-300">
                          <SelectValue placeholder="Select notification preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All notifications</SelectItem>
                        <SelectItem value="important">
                          Important only
                        </SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-pink-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={preferencesForm.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-700">App Theme</FormLabel>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      {[
                        { value: "light", label: "Light" },
                        { value: "dark", label: "Dark" },
                        { value: "system", label: "System" },
                      ].map((theme) => (
                        <div
                          key={theme.value}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${field.value === theme.value ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}
                          onClick={() => field.onChange(theme.value)}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {theme.label}
                            </span>
                            {field.value === theme.value && (
                              <Check className="h-4 w-4 text-purple-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <FormMessage className="text-pink-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  Complete
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-purple-800">
              Welcome to Aphrodite
            </CardTitle>
            <CardDescription className="text-center text-purple-600">
              Let's set up your personalized beauty & wellness journey
            </CardDescription>
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`text-xs font-medium ${step >= index ? "text-purple-700" : "text-gray-400"}`}
                  >
                    Step {index + 1}
                  </div>
                ))}
              </div>
              <Progress
                value={(step / (totalSteps - 1)) * 100}
                className="h-2 bg-gray-200"
                style={
                  {
                    "--progress-background":
                      "linear-gradient(to right, #ec4899, #a855f7)",
                  } as React.CSSProperties
                }
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">{renderStepContent()}</CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingFlow;
