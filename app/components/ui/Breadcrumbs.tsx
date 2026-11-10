"use client";
import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

type SeparatorProps =
  | { separator: "slash"; chevronIcon?: never }
  | { separator: "chevron"; chevronIcon: ReactNode };

export type BreadcrumbsProps = Omit<HTMLAttributes<HTMLElement>, "children"> &
  SeparatorProps & {
    /** The last item is treated as the current page. */
    items: BreadcrumbItem[];
    /** Collapse the trail when there are more items than this. */
    maxItems?: number;
    /** Items kept at the start when collapsed. Defaults to 1. */
    itemsBeforeCollapse?: number;
    /** Items kept at the end when collapsed (includes the current page). Defaults to 2. */
    itemsAfterCollapse?: number;
    /** Accessible label for the "…" button. */
    expandLabel?: string;
  };

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const LINK =
  "cursor-pointer rounded-sm font-medium text-blue-500 underline-offset-2 " +
  "transition-colors duration-150 motion-reduce:transition-none " +
  "hover:text-blue-400 hover:underline " +
  "focus-visible:text-blue-700 focus-visible:underline " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

const CHEVRON_BOX =
  "inline-flex size-4 md:size-[18px] shrink-0 items-center justify-center text-grey-200 [&>svg]:size-full";

const SLASH = "text-sm font-medium leading-[1.4] text-grey-200";

export const Breadcrumbs = ({
  items,
  separator,
  chevronIcon,
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 2,
  expandLabel = "Show full path",
  className,
  ...rest
}: BreadcrumbsProps) => {
  const [expanded, setExpanded] = useState(false);
  const revealedRef = useRef<HTMLElement | null>(null);

  const before = Math.max(0, itemsBeforeCollapse);
  const after = Math.max(1, itemsAfterCollapse);
  const canCollapse =
    maxItems !== undefined &&
    items.length > maxItems &&
    before + after < items.length;
  const collapsed = canCollapse && !expanded;

  useEffect(() => {
    if (expanded) revealedRef.current?.focus();
  }, [expanded]);

  const sep =
    separator === "chevron" ? (
      <span aria-hidden="true" className={CHEVRON_BOX}>
        {chevronIcon}
      </span>
    ) : (
      <span aria-hidden="true" className={SLASH}>
        /
      </span>
    );

  const renderItem = (item: BreadcrumbItem, index: number) => {
    const isLast = index === items.length - 1;
    const setRef = (el: HTMLElement | null) => {
      if (index === before) revealedRef.current = el;
    };

    let content: ReactNode;
    if (isLast) {
      content = (
        <span
          ref={setRef}
          tabIndex={-1}
          aria-current="page"
          className="font-normal text-grey-200"
        >
          {item.label}
        </span>
      );
    } else if (item.href) {
      content = (
        <a ref={setRef} href={item.href} onClick={item.onClick} className={LINK}>
          {item.label}
        </a>
      );
    } else if (item.onClick) {
      content = (
        <button
          ref={setRef}
          type="button"
          onClick={item.onClick}
          className={cn(LINK, "bg-transparent p-0")}
        >
          {item.label}
        </button>
      );
    } else {
      content = (
        <span ref={setRef} tabIndex={-1} className="font-medium text-blue-500">
          {item.label}
        </span>
      );
    }

    return (
      <li key={index} className="inline-flex items-center gap-2">
        {content}
        {!isLast && sep}
      </li>
    );
  };

  const hiddenCount = items.length - before - after;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "font-dm-sans text-sm leading-5 tracking-[-0.02em] md:text-base md:leading-6",
        className,
      )}
      {...rest}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {collapsed ? (
          <>
            {items.slice(0, before).map((item, i) => renderItem(item, i))}
            <li className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                aria-label={`${expandLabel} (${hiddenCount} more)`}
                aria-expanded={false}
                className={cn(LINK, "bg-transparent p-0")}
              >
                …
              </button>
              {sep}
            </li>
            {items
              .slice(items.length - after)
              .map((item, i) => renderItem(item, items.length - after + i))}
          </>
        ) : (
          items.map((item, i) => renderItem(item, i))
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;