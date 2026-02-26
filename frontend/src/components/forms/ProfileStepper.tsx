"use client";

import { useState } from "react";

interface ProfileStepperProps {
  children: React.ReactNode[];
  currentStep: number;
}

export default function ProfileStepper({
  children,
  currentStep,
}: ProfileStepperProps) {
  const steps = [
    "Basic Info",
    "Personal Details",
    "Religion & Community",
    "Education & Career",
    "Location",
    "Preferences",
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
        {steps.map((label, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;

          return (
            <div
              key={label}
              className="flex flex-col items-center min-w-[80px] space-y-2 relative"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#6A0DAD] text-white"
                    : isPast
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {isPast ? "✓" : index + 1}
              </div>
              <span
                className={`text-xs text-center font-medium ${
                  isActive
                    ? "text-[#6A0DAD]"
                    : isPast
                      ? "text-green-600"
                      : "text-gray-400"
                }`}
              >
                {label}
              </span>

              {/* Line connector */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-4 left-[50%] w-full h-[2px] -z-10 ${
                    isPast ? "bg-green-500" : "bg-gray-200"
                  }`}
                  style={{ transform: "translateX(50%)" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Render Current Step Component */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-50 p-6 md:p-8">
        {children[currentStep]}
      </div>
    </div>
  );
}
