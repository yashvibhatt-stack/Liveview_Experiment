import type { ButtonHTMLAttributes, ReactNode } from "react";
import { icons } from "../assets";

/* ---------- Badge ---------- */
type BadgeProps = {
  label: string;
  variant?: "neutral" | "positive" | "negative";
  appearance?: "subtle" | "solid";
  hasDot?: boolean;
};

const badgeDot = {
  "solid": icons.badgeDotSolid,
  "negative-subtle": icons.badgeDotNegative,
  "positive-subtle": icons.badgeDotPositive,
};

export function Badge({ label, variant = "neutral", appearance = "subtle", hasDot = false }: BadgeProps) {
  const dot =
    appearance === "solid"
      ? badgeDot.solid
      : variant === "negative"
        ? badgeDot["negative-subtle"]
        : variant === "positive"
          ? badgeDot["positive-subtle"]
          : undefined;
  return (
    <span className={`badge badge--${variant} badge--${appearance}`}>
      {hasDot && dot && <img className="badge__dot" src={dot} alt="" />}
      <span className="badge__label">{label}</span>
    </span>
  );
}

/* ---------- Separator ---------- */
export function Separator() {
  return <div className="separator separator--vertical" role="separator" aria-orientation="vertical" />;
}

/* ---------- StatusDot ---------- */
export function StatusDot({ variant = "positive", label }: { variant?: "positive" | "negative"; label?: string }) {
  return <span className={`status-dot status-dot--${variant}`} role={label ? "img" : undefined} aria-label={label} />;
}

/* ---------- Avatar ---------- */
export function Avatar({ initials }: { initials: string }) {
  return (
    <span className="avatar avatar--sm" aria-hidden="true">
      <span className="t-label-xs">{initials}</span>
    </span>
  );
}

/* ---------- IconButton (ghost) ---------- */
type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: string;
  label: string; // aria-label + tooltip (required by the design system)
  size?: "sm" | "default";
};

export function IconButton({ icon, label, size = "sm", className = "", ...rest }: IconButtonProps) {
  return (
    <button type="button" className={`icon-button icon-button--${size} ${className}`} aria-label={label} title={label} {...rest}>
      <img className="icon" src={icon} alt="" />
    </button>
  );
}

/* ---------- Button ---------- */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost";
  children: ReactNode;
};

export function Button({ variant = "default", className = "", children, ...rest }: ButtonProps) {
  return (
    <button type="button" className={`button button--sm button--${variant} ${className}`} {...rest}>
      {children}
    </button>
  );
}

/* ---------- Toggle ---------- */
type ToggleProps = {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  icon: string;
  label?: string;
  ariaLabel?: string;
};

export function Toggle({ pressed, onPressedChange, icon, label, ariaLabel }: ToggleProps) {
  return (
    <button
      type="button"
      className="toggle"
      aria-pressed={pressed}
      aria-label={label ? undefined : ariaLabel}
      title={label ?? ariaLabel}
      data-state={pressed ? "on" : "off"}
      onClick={() => onPressedChange(!pressed)}
    >
      <img className="icon" src={icon} alt="" />
      {label && <span className="t-label-md">{label}</span>}
    </button>
  );
}

/* ---------- Switch (sm 28×16) ---------- */
export function Switch({ checked, onCheckedChange, id, ariaLabel }: { checked: boolean; onCheckedChange: (v: boolean) => void; id?: string; ariaLabel?: string }) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      className="switch switch--sm"
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => onCheckedChange(!checked)}
    >
      <span className="switch__thumb" />
    </button>
  );
}

/* ---------- Input (sm 28 | default 32) ---------- */
type InputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  iconLeft?: string;
  ariaLabel: string;
};

export function Input({ value, onChange, placeholder, iconLeft, ariaLabel }: InputProps) {
  return (
    <label className="input">
      {iconLeft && <img className="icon" src={iconLeft} alt="" />}
      <input
        className="input__field t-body-md"
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

/* ---------- SelectTrigger (sm 28) ---------- */
export function SelectTrigger({ value, width = 180, ariaLabel }: { value: string; width?: number; ariaLabel: string }) {
  return (
    <button type="button" className="select-trigger" style={{ width }} aria-haspopup="listbox" aria-label={ariaLabel}>
      <span className="select-trigger__value t-body-sm truncate">{value}</span>
      <img className="icon" src={icons.chevronDown} alt="" />
    </button>
  );
}

/* ---------- Tabs ---------- */
type TabsProps<T extends string> = {
  tabs: { id: T; label: string }[];
  value: T;
  onValueChange: (v: T) => void;
  ariaLabel: string;
  fill?: boolean;
};

export function Tabs<T extends string>({ tabs, value, onValueChange, ariaLabel, fill = false }: TabsProps<T>) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.id === value);
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    onValueChange(tabs[(next + tabs.length) % tabs.length].id);
  };
  return (
    <div className={`tabs ${fill ? "tabs--fill" : ""}`} role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown}>
      {tabs.map((t) => {
        const selected = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            data-state={selected ? "active" : "inactive"}
            className="tabs__trigger"
            onClick={() => onValueChange(t.id)}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
