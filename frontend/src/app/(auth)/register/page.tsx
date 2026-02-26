"use client";

import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SearchableDropdown from "@/components/ui/SearchableDropdown";
import PremiumSelect from "@/components/ui/PremiumSelect";
import {
  masterService,
  Country,
  MotherTongue,
  Height,
  Religion,
  Caste,
  State,
  City,
  Education,
  EmploymentType,
  Occupation,
  Currency,
  IncomeRange,
} from "@/services/masterService";
import { Dialog, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  LockClosedIcon,
  MapPinIcon,
  AcademicCapIcon,
  HeartIcon,
  StarIcon,
  SparklesIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

const registerSchema = z.object({
  // Step 1
  createdFor: z.enum([
    "Myself",
    "Daughter",
    "Son",
    "Sister",
    "Brother",
    "Relative",
    "Friend",
  ]),
  gender: z.enum(["Male", "Female", "Other"]),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  countryCodeId: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "Country code is required"),
  mobile: z
    .string()
    .regex(/^\d+$/, "Only numbers allowed")
    .min(5, "Invalid mobile number"),

  // Step 2
  dobDay: z.string().min(1, "Day required"),
  dobMonth: z.string().min(1, "Month required"),
  dobYear: z.string().min(4, "Year required"),
  motherTongueId: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "Mother Tongue is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),

  // Step 3
  heightCm: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "Height is required"),
  physicalStatus: z.enum(["Normal", "Physically Challenged"]),
  maritalStatus: z.enum([
    "Never Married",
    "Widowed",
    "Awaiting Divorce",
    "Divorced",
  ]),
  childrenCount: z.union([z.number(), z.string()]).optional(),
  religionId: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "Religion is required"),
  casteId: z.union([z.number(), z.string()]).optional(),
  subcaste: z.string().optional(),

  // Step 4
  countryId: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "Country is required"),
  stateId: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "State is required"),
  cityId: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "City is required"),

  // Step 5
  educationId: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "Education is required"),
  employmentTypeId: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "Employment Type is required"),
  occupationId: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "Occupation is required"),
  incomeCurrencyId: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "Currency is required"),
  incomeRangeId: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", "Income Range is required"),

  // Step 6
  familyStatus: z
    .enum(["Middle Class", "Upper Middle Class", "Rich", "Affluent"])
    .optional(),
  aboutMe: z
    .string()
    .min(20, "Please write at least 20 characters about yourself"),

  // Step 7 (Lifestyle - NEW)
  diet: z.enum(["Veg", "Non-veg", "Eggetarian", "Vegan"]),
  drink: z.enum(["Yes", "No", "Occasionally"]),
  smoke: z.enum(["Yes", "No", "Occasionally"]),
  fitness: z.enum(["Regular", "Occasional", "Not at all"]),
  spirituality: z.enum([
    "Very Spiritual",
    "Moderately Spiritual",
    "Not Spiritual",
  ]),
  ambition: z.enum(["High", "Moderate", "Low"]),
  childrenPreference: z.enum(["Yes", "No", "Flexible"]),
  careerAfterMarriage: z.enum(["Yes", "No", "Flexible"]),
  relocation: z.enum(["Yes", "No", "Flexible"]),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerAuth, loading, error } = useAuth();
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState<Country[]>([]);
  const [motherTongues, setMotherTongues] = useState<MotherTongue[]>([]);
  const [heights, setHeights] = useState<Height[]>([]);
  const [religions, setReligions] = useState<Religion[]>([]);
  const [castes, setCastes] = useState<Caste[]>([]);
  const [statesList, setStatesList] = useState<State[]>([]);
  const [citiesList, setCitiesList] = useState<City[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[]>([]);
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [incomeRanges, setIncomeRanges] = useState<IncomeRange[]>([]);

  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      createdFor: "Myself",
      gender: "Male",
      firstName: "",
      countryCodeId: "+91",
      mobile: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      motherTongueId: "",
      email: "",
      password: "",
      heightCm: "",
      physicalStatus: "Normal",
      maritalStatus: "Never Married",
      childrenCount: "",
      casteId: "",
      subcaste: "",
      countryId: "",
      stateId: "",
      cityId: "",
      educationId: "",
      employmentTypeId: "",
      occupationId: "",
      incomeCurrencyId: "",
      incomeRangeId: "",
      familyStatus: "Middle Class",
      aboutMe: "",
      diet: "Veg",
      drink: "No",
      smoke: "No",
      fitness: "Occasional",
      spirituality: "Moderately Spiritual",
      ambition: "Moderate",
      childrenPreference: "Flexible",
      careerAfterMarriage: "Yes",
      relocation: "Flexible",
    },
    mode: "onTouched",
  });

  const watchedReligionId = useWatch({ control, name: "religionId" });
  const watchedMaritalStatus = useWatch({ control, name: "maritalStatus" });
  const watchedCountryId = useWatch({ control, name: "countryId" });
  const watchedStateId = useWatch({ control, name: "stateId" });
  const watchedEmploymentTypeId = useWatch({
    control,
    name: "employmentTypeId",
  });
  const watchedCurrencyId = useWatch({ control, name: "incomeCurrencyId" });
  const watchedGender = useWatch({ control, name: "gender" });

  useEffect(() => {
    masterService
      .getCountries()
      .then((data) => {
        setCountries(data);
        const india = data.find((c) => c.phoneCode === "+91");
        if (india) setValue("countryCodeId", india.id);
      })
      .catch(console.error);

    masterService
      .getMotherTongues()
      .then(setMotherTongues)
      .catch(console.error);
    masterService.getHeights().then(setHeights).catch(console.error);
    masterService.getReligions().then(setReligions).catch(console.error);
    masterService.getEducations().then(setEducations).catch(console.error);
    masterService
      .getEmploymentTypes()
      .then(setEmploymentTypes)
      .catch(console.error);
    masterService.getCurrencies().then(setCurrencies).catch(console.error);
  }, [setValue]);

  useEffect(() => {
    if (watchedReligionId) {
      masterService
        .getCastesByReligion(watchedReligionId)
        .then((data) => {
          setCastes([
            {
              id: "0",
              name: "Not Interested",
              religionId: String(watchedReligionId),
            },
            ...data,
          ]);
        })
        .catch(console.error);
      setValue("casteId", "0");
    }
  }, [watchedReligionId, setValue]);

  useEffect(() => {
    if (watchedMaritalStatus === "Never Married") {
      setValue("childrenCount", "");
    }
  }, [watchedMaritalStatus, setValue]);

  useEffect(() => {
    if (watchedCountryId) {
      masterService
        .getStatesByCountry(watchedCountryId)
        .then(setStatesList)
        .catch(console.error);
      setValue("stateId", "");
      setValue("cityId", "");
    }
  }, [watchedCountryId, setValue]);

  useEffect(() => {
    if (watchedStateId) {
      masterService
        .getCitiesByState(watchedStateId)
        .then(setCitiesList)
        .catch(console.error);
      setValue("cityId", "");
    }
  }, [watchedStateId, setValue]);

  useEffect(() => {
    if (watchedEmploymentTypeId) {
      masterService
        .getOccupationsByEmploymentType(watchedEmploymentTypeId)
        .then(setOccupations)
        .catch(console.error);
      setValue("occupationId", "");
    }
  }, [watchedEmploymentTypeId, setValue]);

  useEffect(() => {
    if (watchedCurrencyId) {
      masterService
        .getIncomeRangesByCurrency(watchedCurrencyId)
        .then(setIncomeRanges)
        .catch(console.error);
      setValue("incomeRangeId", "");
    }
  }, [watchedCurrencyId, setValue]);

  const nextStep = async (fields: any[]) => {
    const isValid = await trigger(fields);
    if (isValid) setStep(step + 1);
    return isValid;
  };

  const prevStep = () => setStep(step - 1);

  const handleOtpVerify = () => {
    if (otpInput === "1111") {
      setIsOtpModalOpen(false);
      setStep(2);
    } else {
      setOtpError("Invalid OTP. Use dummy OTP: 1111");
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    const dob = `${data.dobYear}-${data.dobMonth.padStart(2, "0")}-${data.dobDay.padStart(2, "0")}`;
    await registerAuth({
      ...data,
      dob,
      countryId: Number(data.countryId),
      countryCodeId: Number(data.countryCodeId),
      motherTongueId: Number(data.motherTongueId),
      heightCm: Number(data.heightCm),
      religionId: Number(data.religionId),
      casteId:
        data.casteId && data.casteId !== "0" ? Number(data.casteId) : undefined,
      stateId: Number(data.stateId),
      cityId: Number(data.cityId),
      educationId: Number(data.educationId),
      employmentTypeId: Number(data.employmentTypeId),
      occupationId: Number(data.occupationId),
      incomeCurrencyId: Number(data.incomeCurrencyId),
      incomeRangeId: Number(data.incomeRangeId),
      childrenCount: data.childrenCount ? Number(data.childrenCount) : 0,
    });
  };

  const steps = [
    { id: 1, name: "Identity", icon: UserCircleIcon },
    { id: 2, name: "Account", icon: LockClosedIcon },
    { id: 3, name: "Culture", icon: HeartIcon },
    { id: 4, name: "Location", icon: MapPinIcon },
    { id: 5, name: "Career", icon: AcademicCapIcon },
    { id: 6, name: "Family", icon: StarIcon },
    { id: 7, name: "Lifestyle", icon: SparklesIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-gold-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* --- OTP MODAL --- */}
      <Transition appear show={isOtpModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOtpModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-3xl bg-slate-900/90 border border-purple-500/30 p-8 text-left shadow-2xl backdrop-blur-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-amber-400 text-center"
                  >
                    Verify Your Mobile
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-slate-400 text-center">
                    Enter the code sent to your number.
                    <br />
                    <span className="text-amber-400/80 font-mono">
                      (Dummy: 1111)
                    </span>
                  </p>
                  <div className="mt-6">
                    <input
                      type="text"
                      maxLength={4}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="• • • •"
                      className="block w-full py-4 px-4 text-center tracking-[1em] text-3xl bg-slate-800/50 border border-purple-500/20 text-white rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                    />
                    {otpError && (
                      <p className="mt-3 text-center text-xs text-rose-500 font-medium">
                        {otpError}
                      </p>
                    )}
                  </div>
                  <div className="mt-8 space-y-3">
                    <button
                      onClick={handleOtpVerify}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Verify OTP
                    </button>
                    <button
                      onClick={() => setIsOtpModalOpen(false)}
                      className="w-full py-3 bg-slate-800 text-slate-300 rounded-xl font-medium hover:bg-slate-700 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="w-full max-w-4xl z-10 transition-all duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
            <SparklesIcon className="w-4 h-4" />
            <span>Premium Onboarding</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Create Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-amber-300">
              Legacy Profile
            </span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Already part of AuraWeds?{" "}
            <Link
              href="/login"
              className="text-amber-400 font-bold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12 hidden sm:block">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 -translate-y-1/2"></div>
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-amber-500 -translate-y-1/2 transition-all duration-500"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          <div className="relative flex justify-between">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${step >= s.id ? "bg-slate-900 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "bg-slate-900 border-slate-800 text-slate-600"}`}
                >
                  {step > s.id ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    <s.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`mt-3 text-[10px] font-bold uppercase tracking-tighter ${step >= s.id ? "text-white" : "text-slate-600"}`}
                >
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="sm:hidden flex items-center justify-between mb-8 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Step {step} of 7
          </span>
          <div className="flex space-x-1">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`h-1 w-4 rounded-full ${step >= s.id ? "bg-purple-500" : "bg-slate-800"}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-6 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 relative"
          >
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Step 1: Identity */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Profile Creating For
                    </label>
                    <Controller
                      control={control}
                      name="createdFor"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            "Myself",
                            "Daughter",
                            "Son",
                            "Sister",
                            "Brother",
                            "Relative",
                            "Friend",
                          ].map((opt) => ({ id: opt, name: opt }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-4">
                      Gender
                    </label>
                    <div className="flex space-x-4">
                      {["Male", "Female"].map((g) => (
                        <label
                          key={g}
                          className={`flex-1 flex items-center justify-center py-4 rounded-2xl border cursor-pointer transition-all ${watchedGender === g ? "bg-purple-600/20 border-purple-500 text-white" : "bg-slate-900/50 border-white/10 text-slate-400 hover:border-white/20"}`}
                        >
                          <input
                            type="radio"
                            value={g}
                            {...register("gender")}
                            className="hidden"
                          />
                          <span className="font-bold text-sm">{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register("firstName")}
                      placeholder="Enter full name"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4 col-span-full">
                    <div className="col-span-1">
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Code
                      </label>
                      <Controller
                        control={control}
                        name="countryCodeId"
                        render={({ field }) => (
                          <SearchableDropdown
                            options={countries}
                            value={
                              countries.find((c) => c.id === field.value) ||
                              null
                            }
                            onChange={(val) => field.onChange(val?.id || "")}
                            displayKey="phoneCode"
                            placeholder="Code"
                          />
                        )}
                      />
                      {errors.countryCodeId && (
                        <p className="mt-1 text-xs text-rose-400">
                          {errors.countryCodeId.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        {...register("mobile", {
                          onChange: (e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              "",
                            );
                          },
                        })}
                        placeholder="Phone number"
                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all"
                      />
                      {errors.mobile && (
                        <p className="mt-1 text-xs text-rose-400">
                          {errors.mobile.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-6">
                  <button
                    type="button"
                    onClick={() =>
                      nextStep([
                        "createdFor",
                        "gender",
                        "firstName",
                        "countryCodeId",
                        "mobile",
                      ]).then((isValid) => {
                        if (isValid) setIsOtpModalOpen(true);
                      })
                    }
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2 outline-none"
                  >
                    <span>Verify Mobile</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Account */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Date of Birth
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <Controller
                        control={control}
                        name="dobDay"
                        render={({ field }) => (
                          <PremiumSelect
                            options={Array.from(
                              { length: 31 },
                              (_, i) => i + 1,
                            ).map((d) => ({ id: String(d), name: String(d) }))}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Day"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="dobMonth"
                        render={({ field }) => (
                          <PremiumSelect
                            options={[
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sep",
                              "Oct",
                              "Nov",
                              "Dec",
                            ].map((m, i) => ({ id: String(i + 1), name: m }))}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Month"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="dobYear"
                        render={({ field }) => (
                          <PremiumSelect
                            options={Array.from(
                              { length: 60 },
                              (_, i) => new Date().getFullYear() - 18 - i,
                            ).map((y) => ({ id: String(y), name: String(y) }))}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Year"
                          />
                        )}
                      />
                    </div>
                    {(errors.dobDay || errors.dobMonth || errors.dobYear) && (
                      <p className="mt-2 text-xs text-rose-400">
                        Please complete your birth date (Must be 18+)
                      </p>
                    )}
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Mother Tongue
                    </label>
                    <Controller
                      control={control}
                      name="motherTongueId"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={motherTongues}
                          value={
                            motherTongues.find((m) => m.id === field.value) ||
                            null
                          }
                          onChange={(val) => field.onChange(val?.id || "")}
                          placeholder="Search language..."
                        />
                      )}
                    />
                    {errors.motherTongueId && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.motherTongueId.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Professional Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="name@luxury.com"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Security Password
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      placeholder="••••••••"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 transition-all"
                    />
                    {errors.password && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      nextStep([
                        "dobDay",
                        "dobMonth",
                        "dobYear",
                        "motherTongueId",
                        "email",
                        "password",
                      ])
                    }
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <span>Next Phase</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Culture */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Height
                    </label>
                    <Controller
                      control={control}
                      name="heightCm"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={heights}
                          value={
                            heights.find((h) => h.cmValue === field.value) ||
                            null
                          }
                          onChange={(val) => field.onChange(val?.cmValue || "")}
                          displayKey="displayLabel"
                          placeholder="Select height"
                        />
                      )}
                    />
                    {errors.heightCm && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.heightCm.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Marital Status
                    </label>
                    <Controller
                      control={control}
                      name="maritalStatus"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            "Never Married",
                            "Widowed",
                            "Awaiting Divorce",
                            "Divorced",
                          ].map((opt) => ({ id: opt, name: opt }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  {watchedMaritalStatus !== "Never Married" && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Number of Children
                      </label>
                      <Controller
                        control={control}
                        name="childrenCount"
                        render={({ field }) => (
                          <PremiumSelect
                            options={["0", "1", "2", "3", "4+"].map((cnt) => ({
                              id: cnt,
                              name: cnt,
                            }))}
                            value={String(field.value || "0")}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.childrenCount && (
                        <p className="mt-1 text-xs text-rose-400">
                          {errors.childrenCount.message}
                        </p>
                      )}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Physical Status
                    </label>
                    <Controller
                      control={control}
                      name="physicalStatus"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            { id: "Normal", name: "Normal" },
                            {
                              id: "Physically Challenged",
                              name: "Physically Challenged",
                            },
                          ]}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Religion
                    </label>
                    <Controller
                      control={control}
                      name="religionId"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={religions}
                          value={
                            religions.find((r) => r.id === field.value) || null
                          }
                          onChange={(val) => field.onChange(val?.id || "")}
                          placeholder="Path to faith..."
                        />
                      )}
                    />
                    {errors.religionId && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.religionId.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Caste / Root
                    </label>
                    <Controller
                      control={control}
                      name="casteId"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={castes}
                          value={
                            castes.find((c) => c.id === field.value) || null
                          }
                          onChange={(val) => field.onChange(val?.id || "")}
                          placeholder="Seek root..."
                          disabled={!watchedReligionId}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Subcaste (Optional)
                    </label>
                    <input
                      type="text"
                      {...register("subcaste")}
                      placeholder="Legacy niche"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      nextStep([
                        "heightCm",
                        "physicalStatus",
                        "maritalStatus",
                        "childrenCount",
                        "religionId",
                      ])
                    }
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <span>Next Phase</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Location */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Country of Residence
                    </label>
                    <Controller
                      control={control}
                      name="countryId"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={countries}
                          value={
                            countries.find((c) => c.id === field.value) || null
                          }
                          onChange={(val) => field.onChange(val?.id || "")}
                          placeholder="Global region..."
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      State / Province
                    </label>
                    <Controller
                      control={control}
                      name="stateId"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={statesList}
                          value={
                            statesList.find((s) => s.id === field.value) || null
                          }
                          onChange={(val) => field.onChange(val?.id || "")}
                          placeholder="State territory..."
                          disabled={!watchedCountryId}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      City / Urban Base
                    </label>
                    <Controller
                      control={control}
                      name="cityId"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={citiesList}
                          value={
                            citiesList.find((c) => c.id === field.value) || null
                          }
                          onChange={(val) => field.onChange(val?.id || "")}
                          placeholder="Home base..."
                          disabled={!watchedStateId}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => nextStep(["countryId", "stateId", "cityId"])}
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <span>Next Phase</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Career */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Education Background
                    </label>
                    <Controller
                      control={control}
                      name="educationId"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={educations}
                          value={
                            educations.find((e) => e.id === field.value) || null
                          }
                          onChange={(val) => field.onChange(val?.id || "")}
                          placeholder="Primary qualification..."
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Employment
                    </label>
                    <Controller
                      control={control}
                      name="employmentTypeId"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={employmentTypes}
                          value={
                            employmentTypes.find((e) => e.id === field.value) ||
                            null
                          }
                          onChange={(val) => field.onChange(val?.id || "")}
                          placeholder="Domain..."
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Professional Role
                    </label>
                    <Controller
                      control={control}
                      name="occupationId"
                      render={({ field }) => (
                        <SearchableDropdown
                          options={occupations}
                          value={
                            occupations.find((o) => o.id === field.value) ||
                            null
                          }
                          onChange={(val) => field.onChange(val?.id || "")}
                          placeholder="Designation..."
                          disabled={!watchedEmploymentTypeId}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Curr
                      </label>
                      <Controller
                        control={control}
                        name="incomeCurrencyId"
                        render={({ field }) => (
                          <SearchableDropdown
                            options={currencies}
                            value={
                              currencies.find((c) => c.id === field.value) ||
                              null
                            }
                            onChange={(val) => field.onChange(val?.id || "")}
                            displayKey="name"
                            placeholder="$"
                          />
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Annual Wealth Range
                      </label>
                      <Controller
                        control={control}
                        name="incomeRangeId"
                        render={({ field }) => (
                          <SearchableDropdown
                            options={incomeRanges}
                            value={
                              incomeRanges.find((i) => i.id === field.value) ||
                              null
                            }
                            onChange={(val) => field.onChange(val?.id || "")}
                            displayKey="displayLabel"
                            placeholder="Bracket..."
                            disabled={!watchedCurrencyId}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      nextStep([
                        "educationId",
                        "employmentTypeId",
                        "occupationId",
                        "incomeCurrencyId",
                        "incomeRangeId",
                      ])
                    }
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <span>Next Phase</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Family */}
            {step === 6 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Family Class
                    </label>
                    <Controller
                      control={control}
                      name="familyStatus"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            "Middle Class",
                            "Upper Middle Class",
                            "Rich",
                            "Affluent",
                          ].map((opt) => ({ id: opt, name: opt }))}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      About Your Story
                    </label>
                    <textarea
                      {...register("aboutMe")}
                      rows={5}
                      placeholder="The universe needs to hear your story... (min 20 chars)"
                      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-3xl py-4 px-4 focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600 resize-none transition-all"
                    />
                    {errors.aboutMe && (
                      <p className="mt-2 text-xs text-rose-400 font-medium">
                        {errors.aboutMe.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => nextStep(["familyStatus", "aboutMe"])}
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <span>Final Step</span>
                    <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: Lifestyle (NEW) */}
            {step === 7 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Dietary Choice
                    </label>
                    <Controller
                      control={control}
                      name="diet"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            "Veg",
                            "Non-veg",
                            "Eggetarian",
                            "Vegan",
                          ].map((opt) => ({ id: opt, name: opt }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Spiritual Essence
                    </label>
                    <Controller
                      control={control}
                      name="spirituality"
                      render={({ field }) => (
                        <PremiumSelect
                          options={[
                            "Very Spiritual",
                            "Moderately Spiritual",
                            "Not Spiritual",
                          ].map((opt) => ({ id: opt, name: opt }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Drinking Habit
                    </label>
                    <Controller
                      control={control}
                      name="drink"
                      render={({ field }) => (
                        <PremiumSelect
                          options={["No", "Yes", "Occasionally"].map((opt) => ({
                            id: opt,
                            name: opt,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Smoking Habit
                    </label>
                    <Controller
                      control={control}
                      name="smoke"
                      render={({ field }) => (
                        <PremiumSelect
                          options={["No", "Yes", "Occasionally"].map((opt) => ({
                            id: opt,
                            name: opt,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Ambition Level
                    </label>
                    <Controller
                      control={control}
                      name="ambition"
                      render={({ field }) => (
                        <PremiumSelect
                          options={["High", "Moderate", "Low"].map((opt) => ({
                            id: opt,
                            name: opt,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Career Post-Marriage
                    </label>
                    <Controller
                      control={control}
                      name="careerAfterMarriage"
                      render={({ field }) => (
                        <PremiumSelect
                          options={["Yes", "No", "Flexible"].map((opt) => ({
                            id: opt,
                            name: opt,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Relocation Openness
                    </label>
                    <Controller
                      control={control}
                      name="relocation"
                      render={({ field }) => (
                        <PremiumSelect
                          options={["Yes", "No", "Flexible"].map((opt) => ({
                            id: opt,
                            name: opt,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Fitness Commitment
                    </label>
                    <Controller
                      control={control}
                      name="fitness"
                      render={({ field }) => (
                        <PremiumSelect
                          options={["Regular", "Occasional", "Not at all"].map(
                            (opt) => ({ id: opt, name: opt }),
                          )}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center space-x-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-12 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-2xl font-black shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:scale-[1.05] active:scale-95 transition-all outline-none"
                  >
                    {loading ? "Designing Destiny..." : "Complete My Legacy"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        <p className="mt-8 text-center text-[10px] text-slate-500 uppercase tracking-widest leading-loose">
          By creating an account, you agree to AuraWeds Premium{" "}
          <Link href="#" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline">
            Privacy Covenant
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
