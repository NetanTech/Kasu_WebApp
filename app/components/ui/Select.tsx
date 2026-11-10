"use client";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectLabelLink {
  text: string;
  href?: string;
  onClick?: () => void;
}

interface SelectBaseProps {
  options: SelectOption[];
  /** Linked to the input, so clicking the label focuses the field. */
  id?: string;
  /** Renders hidden input(s) so the value is submitted with a form. */
  name?: string;
  label?: string;
  labelLink?: SelectLabelLink;
  placeholder?: string;
  /** `string` shows the message below the field; `true` only styles the field. */
  error?: string | boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  /** Shown when there are no options, or none match the search. */
  emptyText?: string;
  variant?: "outline" | "filled" | "ghost";
  /** Called as the user types in the search input. */
  onSearchChange?: (query: string) => void;
  chevronIcon?: ReactNode;
  checkIcon?: ReactNode;
  /** Icon for the remove button on tags (multiple only). */
  crossIcon?: ReactNode;
  containerClassName?: string;
  /** Classes for the field box. */
  className?: string;
  "aria-label"?: string;
}

interface SingleSelectProps {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  maxSelections?: never;
}

interface MultiSelectProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** Maximum number of options that can be selected. */
  maxSelections?: number;
}

export type SelectProps = SelectBaseProps & (SingleSelectProps | MultiSelectProps);

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const toArray = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v : v ? [v] : [];

const LABEL_TEXT =
  "text-sm leading-5 md:text-base md:leading-6 font-medium tracking-[-0.02em] text-grey-500";

const LINK_TEXT =
  "shrink-0 text-sm leading-5 font-semibold tracking-[-0.02em] text-blue-500";

const ERROR_TEXT =
  "text-xs leading-4 md:text-sm md:leading-5 tracking-[-0.02em] text-error-500";

const ROW_TEXT = "text-sm leading-5 md:text-base md:leading-6 font-medium tracking-[-0.02em]";

const SCROLLBAR =
  "[scrollbar-width:thin] [scrollbar-color:var(--color-blue-500)_#F0F1F3] " +
  "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#F0F1F3] " +
  "[&::-webkit-scrollbar-thumb]:bg-blue-500";

export const Select = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  const {
    options,
    id: idProp,
    name,
    label,
    labelLink,
    placeholder = "Select...",
    error,
    isDisabled = false,
    isLoading = false,
    loadingText = "Loading...",
    emptyText = "No options found",
    variant = "outline",
    onSearchChange,
    chevronIcon,
    checkIcon,
    crossIcon,
    containerClassName,
    className,
    multiple = false,
    value,
    defaultValue,
    onChange,
    maxSelections,
    "aria-label": ariaLabel,
  } = props;

  const autoId = useId();
  const id = idProp ?? autoId;
  const errorId = `${id}-error`;
  const listboxId = `${id}-listbox`;

  const inputRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const [internal, setInternal] = useState<string[]>(() => toArray(defaultValue));

  const isControlled = value !== undefined;
  const selected = isControlled ? toArray(value) : internal;
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const maxReached =
    multiple && maxSelections !== undefined && selected.length >= maxSelections;

  const isOptionDisabled = (o: SelectOption) =>
    Boolean(o.disabled) || (maxReached && !selectedSet.has(o.value));

  const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;
  const selectedLabel = !multiple && selected[0] !== undefined ? labelOf(selected[0]) : "";

  const filterOptions = (q: string) => {
    const term = q.trim().toLowerCase();
    return term ? options.filter((o) => o.label.toLowerCase().includes(term)) : options;
  };
  const filtered = useMemo(() => filterOptions(query), [options, query]); // eslint-disable-line react-hooks/exhaustive-deps

  const safeActive = open && active >= 0 && active < filtered.length ? active : -1;

  const firstEnabled = (list: SelectOption[]) => list.findIndex((o) => !isOptionDisabled(o));

  const move = (from: number, dir: 1 | -1) => {
    const n = filtered.length;
    if (!n) return -1;
    let i = from < 0 && dir === -1 ? 0 : from;
    for (let step = 0; step < n; step++) {
      i = (i + dir + n) % n;
      if (!isOptionDisabled(filtered[i])) return i;
    }
    return -1;
  };

  useEffect(() => {
    if (!open || safeActive < 0) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${safeActive}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, safeActive]);

  const emit = (next: string[]) => {
    if (!isControlled) setInternal(next);
    if (multiple) (onChange as ((v: string[]) => void) | undefined)?.(next);
    else (onChange as ((v: string) => void) | undefined)?.(next[0] ?? "");
  };

  const openMenu = () => {
    if (isDisabled || open) return;
    setOpen(true);
    const idx = filtered.findIndex((o) => selectedSet.has(o.value) && !isOptionDisabled(o));
    setActive(idx >= 0 ? idx : firstEnabled(filtered));
  };

  const closeMenu = () => {
    setOpen(false);
    if (query) {
      setQuery("");
      onSearchChange?.("");
    }
  };

  const choose = (opt: SelectOption) => {
    if (isOptionDisabled(opt)) return;
    if (multiple) {
      emit(
        selectedSet.has(opt.value)
          ? selected.filter((v) => v !== opt.value)
          : [...selected, opt.value],
      );
      if (query) {
        setQuery("");
        onSearchChange?.("");
        setActive(options.indexOf(opt));
      }
    } else {
      emit([opt.value]);
      closeMenu();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    let next = raw;
    if (!open && !multiple && selectedLabel) {
      if (raw.startsWith(selectedLabel)) next = raw.slice(selectedLabel.length);
      else if (selectedLabel.startsWith(raw)) next = "";
    }
    setQuery(next);
    onSearchChange?.(next);
    setActive(firstEnabled(filterOptions(next)));
    if (!open) setOpen(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openMenu();
        else setActive(move(safeActive, 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openMenu();
        else setActive(move(safeActive, -1));
        break;
      case "Enter":
        if (open) {
          e.preventDefault();
          const opt = filtered[safeActive];
          if (opt) choose(opt);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          closeMenu();
        }
        break;
      case "Backspace":
        if (multiple && query === "" && selected.length) emit(selected.slice(0, -1));
        break;
    }
  };

  const handleBoxMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    if (target === inputRef.current) {
      openMenu();
      return;
    }
    e.preventDefault();
    inputRef.current?.focus();
    if (open) closeMenu();
    else openMenu();
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (fieldRef.current?.contains(e.relatedTarget as Node | null)) return;
    setFocused(false);
    closeMenu();
  };

  const hasError = Boolean(error);
  const errorMessage = typeof error === "string" ? error : undefined;
  const isActive = focused || open;
  const showingSelected = !multiple && !open && Boolean(selectedLabel);

  const inputPlaceholder = multiple
    ? selected.length
      ? ""
      : placeholder
    : open && selectedLabel
      ? selectedLabel
      : placeholder;

  const triggerClasses = cn(
    "flex min-h-10 w-full items-center gap-2 rounded-lg border px-3 py-1.5",
    "transition-colors duration-150 motion-reduce:transition-none",
    isDisabled
      ? "cursor-not-allowed border-grey-50 bg-grey-50"
      : hasError
        ? "cursor-pointer border-error-100 bg-error-50"
        : isActive
          ? cn("cursor-pointer border-blue-500", variant === "filled" ? "bg-[#F9F9FC]" : "bg-white")
          : variant === "filled"
            ? "cursor-pointer border-[#E0E2E7] bg-[#F9F9FC] hover:border-blue-300"
            : variant === "ghost"
              ? "cursor-pointer border-transparent bg-white hover:bg-[#F9F9FC]"
              : "cursor-pointer border-[#E0E2E7] bg-white hover:border-blue-300",
    className,
  );

  return (
    <div className={cn("flex w-full flex-col gap-1 font-dm-sans", containerClassName)}>
      {(label || labelLink) && (
        <div className="flex items-start gap-2">
          {label ? (
            <label htmlFor={id} className={cn("flex-1 cursor-pointer", LABEL_TEXT)}>
              {label}
            </label>
          ) : (
            <span className="flex-1" />
          )}
          {labelLink &&
            (labelLink.href ? (
              <a href={labelLink.href} onClick={labelLink.onClick} className={LINK_TEXT}>
                {labelLink.text}
              </a>
            ) : (
              <button
                type="button"
                onClick={labelLink.onClick}
                className={cn(LINK_TEXT, "cursor-pointer")}
              >
                {labelLink.text}
              </button>
            ))}
        </div>
      )}

      <div
        ref={fieldRef}
        className="relative"
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
      >
        <div onMouseDown={handleBoxMouseDown} className={triggerClasses}>
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            {multiple &&
              selected.map((v) => (
                <span
                  key={v}
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded px-1.5 py-1 text-xs leading-4 md:text-sm md:leading-5 font-medium tracking-[-0.02em]",
                    isDisabled ? "bg-white text-grey-200" : "bg-blue-50 text-blue-500",
                  )}
                >
                  <span>{labelOf(v)}</span>
                  {crossIcon && (
                    <button
                      type="button"
                      aria-label={`Remove ${labelOf(v)}`}
                      disabled={isDisabled}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => emit(selected.filter((x) => x !== v))}
                      className="inline-flex size-4 shrink-0 cursor-pointer items-center justify-center disabled:cursor-not-allowed [&>svg]:size-full"
                    >
                      {crossIcon}
                    </button>
                  )}
                </span>
              ))}

            <input
              ref={inputRef}
              id={id}
              type="text"
              role="combobox"
              autoComplete="off"
              aria-label={ariaLabel}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={safeActive >= 0 ? `${id}-option-${safeActive}` : undefined}
              aria-invalid={hasError || undefined}
              aria-describedby={errorMessage ? errorId : undefined}
              disabled={isDisabled}
              value={multiple || open ? query : selectedLabel}
              placeholder={inputPlaceholder}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={cn(
                "h-7 min-w-16 flex-1 bg-transparent text-base leading-6 tracking-[-0.02em] outline-none",
                "placeholder:text-[#858D9D] disabled:cursor-not-allowed disabled:text-grey-100 disabled:placeholder:text-grey-100",
                showingSelected
                  ? "font-medium text-[#333843]"
                  : "font-normal text-grey-500",
                !multiple && open && selectedLabel
                  ? "placeholder:font-medium placeholder:text-[#333843]"
                  : "placeholder:font-normal",
              )}
            />
          </div>

          <span
            aria-hidden="true"
            className={cn(
              "inline-flex size-5 shrink-0 items-center justify-center transition-transform duration-150 motion-reduce:transition-none [&>svg]:size-full",
              open && "rotate-180",
              isDisabled ? "text-grey-100" : "text-[#858D9D]",
            )}
          >
            {chevronIcon}
          </span>
        </div>

        {open && (
          <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-lg border border-[#E0E2E7] bg-white shadow-[0_4px_30px_0_rgba(46,45,116,0.10)]">
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              tabIndex={-1}
              aria-multiselectable={multiple || undefined}
              aria-busy={isLoading || undefined}
              onFocus={() => inputRef.current?.focus()}
              className={cn("max-h-60 overflow-y-auto py-2 outline-none", SCROLLBAR)}
            >
              {isLoading ? (
                <li
                  role="presentation"
                  className={cn("animate-pulse px-3.5 py-3 text-[#858D9D]", ROW_TEXT)}
                >
                  {loadingText}
                </li>
              ) : filtered.length === 0 ? (
                <li
                  role="presentation"
                  className={cn("px-3.5 py-3 text-[#858D9D]", ROW_TEXT)}
                >
                  {emptyText}
                </li>
              ) : (
                filtered.map((opt, i) => {
                  const isSelected = selectedSet.has(opt.value);
                  const disabled = isOptionDisabled(opt);
                  const highlighted = i === safeActive && !disabled;
                  return (
                    <li
                      key={opt.value}
                      id={`${id}-option-${i}`}
                      role="option"
                      data-index={i}
                      aria-selected={isSelected}
                      aria-disabled={disabled || undefined}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseMove={() => !disabled && setActive(i)}
                      onClick={() => choose(opt)}
                      className={cn(
                        "flex items-start gap-2 px-3.5 py-3",
                        ROW_TEXT,
                        disabled
                          ? "cursor-not-allowed text-grey-100"
                          : cn(
                              "cursor-pointer",
                              isSelected || highlighted ? "text-blue-500" : "text-[#858D9D]",
                            ),
                        highlighted && "bg-[#EFEFFD]",
                      )}
                    >
                      <span className="flex-1">{opt.label}</span>
                      {isSelected && checkIcon && (
                        <span
                          aria-hidden="true"
                          className="inline-flex size-5 shrink-0 items-center justify-center [&>svg]:size-full"
                        >
                          {checkIcon}
                        </span>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>

      {name &&
        selected.map((v) => (
          <input key={v} type="hidden" name={name} value={v} disabled={isDisabled} />
        ))}

      {errorMessage && (
        <p id={errorId} role="alert" className={ERROR_TEXT}>
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;