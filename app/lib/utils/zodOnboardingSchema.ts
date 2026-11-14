import * as z from "zod";

const REQUIRED = {
  businessName: "Enter your business name",
  businessTypes: "Select at least one business type",
  location: "Enter your business location",
  teamSize: "Select how many people work with you",
  recordMethods: "Select at least one record method",
  separateMoney: "Select whether you separate business and personal money",
  preference: "Choose how you'd like to add your first records",
} as const;

export const onboardingSchema = z.object({
  businessName: z.string().trim().min(1, REQUIRED.businessName),
  businessTypes: z.array(z.string()).min(1, REQUIRED.businessTypes),
  location: z.string().trim().min(1, REQUIRED.location),
  teamSize: z.string().min(1, REQUIRED.teamSize),
  recordMethods: z.array(z.string()).min(1, REQUIRED.recordMethods),
  separateMoney: z.string().min(1, REQUIRED.separateMoney),
  preference: z.string().min(1, REQUIRED.preference),
});

export type OnboardingValues = z.infer<typeof onboardingSchema>;
