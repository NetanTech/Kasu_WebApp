"use client";
import { useState } from "react";
import TextField from "@/app/components/ui/Textfield";
import { Lock } from "@/app/components/svgs/svg";
import { Tick } from "../page";

const businessList: string[] = [
  "Shop or retail",
  "Food and restaurant",
  "Fashion & tailoring",
  "Beauty & barbing",
  "Services",
  "Wholesale or distribution",
  "Other",
];

const numberofWorkers: string[] = ["1 to 5", "6 to 20", "21 to 50", "50+"];

const FirstStep = () => {
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState<string>(numberofWorkers[0]);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          {/* Business name input */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <p className="body-small-medium text-black">
                What is your business name?
              </p>
              <TextField
                type="text"
                placeholder="e.g. Adaeze Provisions & Grains"
              />
            </div>
            <p className="text-[13px] leading-4.5 text-grey-300">
              Or your trading name if not formally registered.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {/* Types of businesses */}
            <div className="flex flex-col gap-4">
              <p className="body-small-medium text-black">
                What type of business do you run?
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {businessList.map((b, i) => {
                  const selected = selectedBusinesses.includes(b);
                  return (
                    <button
                      key={i}
                      className={`body-xsmall-regular flex items-center gap-2 py-2 px-3.5 rounded-full transition-colors ${selected ? "bg-blue-500 text-white shadow-[0px_0px_2px_0px_rgba(0,0,0,0.2)]" : "bg-blue-50 hover:bg-blue-300 hover:text-white text-black"}`}
                      onClick={() => setSelectedBusinesses((p) => [...p, b])}
                    >
                      {selected && <Tick />}
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Business location */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <p className="body-small-medium text-black">
                Where is your business located?
              </p>
              <TextField
                type="text"
                placeholder="e.g. Lagos (Idumota, Lagos Island)"
              />
            </div>
            <p className="text-[13px] leading-4.5 text-grey-300">
              Mention town, market, or local government area.
            </p>
          </div>
        </div>

        {/* Team size */}
        <div className="flex flex-col gap-4">
          <p className="body-small-medium text-black">
            How many people work with you?
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {numberofWorkers.map((m, i) => (
              <button
                key={i}
                className={`body-small-semibold flex flex-col items-center py-3 px-7.5 rounded-lg group/teamSize transition-colors ${m === teamSize ? "bg-blue-500 text-white shadow-[0px_0px_2px_0px_rgba(0,0,0,0.2)]" : "bg-blue-50 hover:bg-blue-300 hover:text-white text-black"}`}
                onClick={() => setTeamSize(m)}
              >
                <div className="flex items-center gap-2">
                  {" "}
                  {m === teamSize && <Tick />} {m}
                </div>{" "}
                <span
                  className={` font-medium text-[12px] leading-4 tracking-[0.4px] ${m !== teamSize ? "text-grey-300 group-hover/teamSize:text-white" : "text-white"}`}
                >
                  {" "}
                  people
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-blue-50 py-3 px-4.25 w-full">
        <div className="flex items-center gap-2.5 md:max-w-[40%]">
          <Lock className="text-grey-400" />
          <p className="body-xsmall-regular text-grey-300">
            Your details are private and safely encrypted. KASU only uses this
            to customize receipt headers and sales reports for your shop.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
