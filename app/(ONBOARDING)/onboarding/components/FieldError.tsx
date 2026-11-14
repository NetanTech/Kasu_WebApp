import { AlertDiamond } from "@/app/components/svgs/svg";
import type { ReactNode } from "react";

interface FieldErrorProps {
  id?: string;
  children: ReactNode;
}

const FieldError = ({ id, children }: FieldErrorProps) => (
  <p
    id={id}
    role="alert"
    className="flex items-center gap-1 text-xs leading-4 tracking-[-0.02em] text-error-500 md:text-sm md:leading-5"
  >
    <AlertDiamond aria-hidden="true" className="size-3 shrink-0 md:size-3.5" />
    {children}
  </p>
);

export default FieldError;
