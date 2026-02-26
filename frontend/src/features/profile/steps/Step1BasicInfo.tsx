"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PremiumSelect from "@/components/ui/PremiumSelect";

const basicInfoSchema = z.object({
  createdFor: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().optional(),
  mobile: z.string().optional(),
});

type BasicInfoData = z.infer<typeof basicInfoSchema>;

interface Props {
  initialData?: any;
  onNext: (data: BasicInfoData) => void;
}

export default function Step1BasicInfo({ initialData, onNext }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: initialData || { createdFor: "Myself", gender: "Male" },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label>Created For</label>
          <Controller
            control={control}
            name="createdFor"
            render={({ field }) => (
              <PremiumSelect
                options={[
                  "Myself",
                  "Parent",
                  "Guardian",
                  "Friend",
                  "Sister",
                  "Brother",
                  "Daughter",
                  "Son",
                  "Relative",
                ].map((opt) => ({ id: opt, name: opt }))}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.createdFor && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.createdFor.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Gender</label>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <PremiumSelect
                options={["Male", "Female", "Other"].map((opt) => ({
                  id: opt,
                  name: opt,
                }))}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.gender && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.gender.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>First Name</label>
          <input
            {...register("firstName")}
            type="text"
            placeholder="Name of the soul"
          />
          {errors.firstName && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Last Name (Optional)</label>
          <input
            {...register("lastName")}
            type="text"
            placeholder="Legacy name"
          />
        </div>

        <div className="space-y-3 sm:col-span-2">
          <label>Mobile Number (Optional)</label>
          <input
            {...register("mobile")}
            type="tel"
            placeholder="+91 Mobile path"
          />
        </div>
      </div>

      <div className="flex justify-center pt-10 mt-8">
        <button type="submit" className="premium-btn">
          Save & Continue
        </button>
      </div>
    </form>
  );
}
