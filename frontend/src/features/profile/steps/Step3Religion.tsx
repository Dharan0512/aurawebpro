"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useReligions,
  useCastes,
  useMotherTongues,
} from "@/hooks/useMasterData";
import SearchableDropdown from "@/components/ui/SearchableDropdown";

const religionSchema = z.object({
  religionId: z.string().min(1, "Religion is required"),
  casteId: z.string().optional(),
  subCaste: z.string().optional(),
  motherTongue: z.string().min(1, "Mother tongue is required"),
});

type ReligionData = z.infer<typeof religionSchema>;

interface Props {
  initialData?: any;
  onNext: (data: ReligionData) => void;
  onBack: () => void;
}

export default function Step3Religion({ initialData, onNext, onBack }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReligionData>({
    resolver: zodResolver(religionSchema),
    defaultValues: initialData || {},
  });

  const selectedReligion = watch("religionId");
  const selectedMotherTongue = watch("motherTongue");

  const { data: religions, isLoading: loadingReligions } = useReligions();
  const { data: castes, isLoading: loadingCastes } =
    useCastes(selectedReligion);
  const { data: motherTongues, isLoading: loadingMotherTongues } =
    useMotherTongues();

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label>Religion</label>
          <SearchableDropdown
            options={religions || []}
            value={
              religions?.find((r) => r.id.toString() === selectedReligion) ||
              null
            }
            onChange={(option) => {
              setValue("religionId", option?.id.toString() || "");
              setValue("casteId", "");
            }}
            placeholder="Search Religion..."
          />
          {errors.religionId && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.religionId.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Caste / Community</label>
          <SearchableDropdown
            options={castes || []}
            value={
              castes?.find((c) => c.id.toString() === watch("casteId")) || null
            }
            onChange={(option) =>
              setValue("casteId", option?.id.toString() || "")
            }
            placeholder={
              loadingCastes ? "Loading..." : "Search Caste / Community..."
            }
            disabled={!selectedReligion}
          />
          {errors.casteId && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.casteId.message}
            </p>
          )}
        </div>

        <div className="space-y-3 sm:col-span-2">
          <label>Sub-caste (Optional)</label>
          <input
            {...register("subCaste")}
            type="text"
            placeholder="e.g. Mudaliar, Iyer, etc. Specify for better matching"
          />
        </div>

        <div className="space-y-3">
          <label>Mother Tongue</label>
          <SearchableDropdown
            options={motherTongues || []}
            value={
              motherTongues?.find(
                (m) => m.id.toString() === selectedMotherTongue,
              ) || null
            }
            onChange={(option) =>
              setValue("motherTongue", option?.id.toString() || "")
            }
            placeholder="Search Mother Tongue..."
          />
          {errors.motherTongue && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.motherTongue.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-10">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button type="submit" className="premium-btn mt-8">
          Save & Continue
        </button>
      </div>
    </form>
  );
}
