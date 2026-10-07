import { useId, useState } from "react";
import { icons, logoMark } from "../assets";
import { Avatar, Badge, IconButton, StatusDot, Switch, Toggle } from "./atoms";

/* ---------- Logo ---------- */
export function Logo() {
  return (
    <div className="logo">
      <div className="logo__mark">
        <img src={logoMark} alt="" />
      </div>
      <div className="logo__wordmark">
        <p>Matrix</p>
        <p>SATATYA</p>
      </div>
    </div>
  );
}

/* ---------- DateTime ---------- */
export function DateTime({ time, date }: { time: string; date: string }) {
  return (
    <div className="date-time">
      <p className="date-time__time t-label-md">{time}</p>
      <p className="date-time__date t-label-xs">{date}</p>
    </div>
  );
}

/* ---------- DeviceSwitcher ---------- */
export function DeviceSwitcher({ deviceName, status }: { deviceName: string; status: "Connected" }) {
  const [open, setOpen] = useState(false);
  return (
    <button type="button" className="device-switcher" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
      <img className="icon" src={icons.server} alt="" />
      <span className="device-switcher__name t-label-lg truncate">{deviceName}</span>
      <Badge label={status} variant="positive" hasDot />
      <img className="icon" src={icons.chevronsUpDown} alt="" />
    </button>
  );
}

/* ---------- SpeakToDevice (idle ⇄ speaking) ---------- */
export function SpeakToDevice({ deviceName }: { deviceName: string }) {
  const [speaking, setSpeaking] = useState(false);
  return (
    <div className="speak-to-device">
      <Toggle pressed={speaking} onPressedChange={setSpeaking} icon={icons.mic} label="Speak" />
      <span className="sr-only" role="status" aria-live="polite">
        {speaking ? `Speaking to ${deviceName}` : "Stopped speaking"}
      </span>
    </div>
  );
}

/* ---------- NotificationTrigger ---------- */
export function NotificationTrigger({ count, status }: { count: number; status: "unread" | "critical" }) {
  return (
    <div className="notification-trigger">
      <IconButton icon={icons.bellRing} size="default" label={`Events, ${count} ${status === "critical" ? "critical" : "unread"}`} />
      <span className={`notification-trigger__count notification-trigger__count--${status} t-label-xs`}>{count > 99 ? "99+" : count}</span>
    </div>
  );
}

/* ---------- AccountTrigger ---------- */
export function AccountTrigger({ name, initials }: { name: string; initials: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button type="button" className="account-trigger" aria-label={`Account, ${name}`} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
      <Avatar initials={initials} />
      <img className="icon icon--sm" src={icons.accountChevron} alt="" />
    </button>
  );
}

/* ---------- SwitchField ---------- */
export function SwitchField({ label, checked, onCheckedChange }: { label: string; checked: boolean; onCheckedChange: (v: boolean) => void }) {
  const id = useId();
  return (
    <div className="switch-field" onClick={() => onCheckedChange(!checked)}>
      <label htmlFor={id} className="switch-field__label t-label-md" onClick={(e) => e.stopPropagation()}>
        {label}
      </label>
      <div className="switch-field__control" onClick={(e) => e.stopPropagation()}>
        <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    </div>
  );
}

/* ---------- AccordionTrigger ---------- */
type AccordionTriggerProps = {
  label: string;
  count: string;
  status: "positive" | "negative";
  isOpen: boolean;
  onToggle: () => void;
  controls: string;
};

export function AccordionTrigger({ label, count, status, isOpen, onToggle, controls }: AccordionTriggerProps) {
  return (
    <button type="button" className="accordion-trigger" aria-expanded={isOpen} aria-controls={controls} data-state={isOpen ? "open" : "closed"} onClick={onToggle}>
      <img className="icon" src={isOpen ? icons.chevronDown : icons.chevronRightMuted} alt="" />
      <StatusDot variant={status} label={status === "positive" ? "Device connected" : "Device disconnected"} />
      <span className="accordion-trigger__label t-label-md truncate">{label}</span>
      <span className="accordion-trigger__count t-label-xs">{count}</span>
    </button>
  );
}

/* ---------- CameraListItem ---------- */
type CameraListItemProps = {
  channel: string;
  name: string;
  isOnline: boolean;
  selected: boolean;
  statusText?: string;
  onSelect: () => void;
};

export function CameraListItem({ channel, name, isOnline, selected, statusText, onSelect }: CameraListItemProps) {
  return (
    <button type="button" className="camera-list-item" data-state={selected ? "selected" : "default"} aria-current={selected ? "true" : undefined} title={name} onClick={onSelect} onDoubleClick={onSelect}>
      <span className="camera-list-item__channel t-label-xs">{channel}</span>
      {isOnline && <StatusDot variant="positive" label="Online" />}
      <span className="camera-list-item__name t-body-md truncate">{name}</span>
      {statusText && <Badge label={statusText} variant="negative" />}
    </button>
  );
}

/* ---------- PageNavigator ---------- */
export function PageNavigator({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  if (pages <= 1) return null;
  return (
    <div className="page-navigator" aria-label={`Page ${page} of ${pages}`}>
      <IconButton icon={icons.chevronLeft} label="Previous page" disabled={page === 1} onClick={() => onChange(page - 1)} />
      <span className="page-navigator__label t-label-sm">
        {page} / {pages}
      </span>
      <IconButton icon={icons.chevronRight} label="Next page" disabled={page === pages} onClick={() => onChange(page + 1)} />
    </div>
  );
}
