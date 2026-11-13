import { getPasswordRuleStatus } from "@/app/lib/utils/zodAuthSchemas";

const PasswordRules = ({
  value,
  invalid = false,
}: {
  value: string;
  invalid?: boolean;
}) => {
  const rules = getPasswordRuleStatus(value);

  return (
    <ul className="flex flex-wrap gap-x-1.5 gap-y-0.5 body-small-regular text-grey-300">
      <li>Use</li>
      {rules.map((rule, index) => (
        <li
          key={rule.id}
          className={`lowercase transition-colors ${
            rule.met
              ? "text-green-500"
              : invalid
                ? "text-error-500"
                : "text-grey-300 group-focus-within/password:text-error-500"
          }`}
        >
          {rule.label}
          {index < rules.length - 1 ? "," : "."}
        </li>
      ))}
    </ul>
  );
};

export default PasswordRules;
