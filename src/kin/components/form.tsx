"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

import { COUNTRY_CODES } from "@/kin/lib/validation";

export const inputClass =
	"h-12 w-full bg-white/[0.04] px-3.5 text-[16px] text-kin-fg placeholder:text-kin-fg-3 shadow-[inset_0_0_0_1px_var(--kin-line-strong)] transition-shadow duration-150 focus:outline-none focus:shadow-[inset_0_0_0_1.5px_var(--kin-accent)] aria-[invalid=true]:shadow-[inset_0_0_0_1.5px_#ff6b5e]";

export const FieldShell = ({
	id,
	label,
	optional,
	error,
	hint,
	children,
}: {
	id: string;
	label: string;
	optional?: boolean;
	error?: string;
	hint?: string;
	children: ReactNode;
}) => (
	<div className="space-y-1.5">
		<label htmlFor={id} className="flex items-baseline justify-between text-[13px] text-kin-fg-2">
			<span>{label}</span>
			{optional && <span className="kin-label !text-[10px] text-kin-fg-3">optional</span>}
		</label>
		{children}
		{error ? (
			<p id={`${id}-error`} className="text-[13px] text-[#ff8a80]" role="alert">
				{error}
			</p>
		) : hint ? (
			<p id={`${id}-hint`} className="text-[12px] text-kin-fg-3">
				{hint}
			</p>
		) : null}
	</div>
);

export const TextField = ({
	id,
	label,
	optional,
	error,
	hint,
	...input
}: {
	id: string;
	label: string;
	optional?: boolean;
	error?: string;
	hint?: string;
} & InputHTMLAttributes<HTMLInputElement>) => (
	<FieldShell id={id} label={label} optional={optional} error={error} hint={hint}>
		<input
			id={id}
			name={id}
			aria-invalid={!!error}
			aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
			className={inputClass}
			{...input}
		/>
	</FieldShell>
);

export const PhoneField = ({
	id,
	label,
	cc,
	onCc,
	value,
	onValue,
	error,
	hint,
	onBlur,
}: {
	id: string;
	label: string;
	cc: string;
	onCc: (v: string) => void;
	value: string;
	onValue: (v: string) => void;
	error?: string;
	hint?: string;
	onBlur?: () => void;
}) => (
	<FieldShell id={id} label={label} error={error} hint={hint}>
		<div className="flex gap-2">
			<select
				aria-label="Country code"
				value={cc}
				onChange={e => onCc(e.target.value)}
				className={`${inputClass} !w-[96px] shrink-0 appearance-none bg-[length:10px] pr-6`}
			>
				{COUNTRY_CODES.map(c => (
					<option key={c.code} value={c.code} className="bg-kin-surface">
						{c.label}
					</option>
				))}
			</select>
			<input
				id={id}
				name={id}
				type="tel"
				inputMode="tel"
				autoComplete="tel-national"
				placeholder={cc === "+91" ? "98765 43210" : ""}
				value={value}
				onChange={e => onValue(e.target.value)}
				onBlur={onBlur}
				aria-invalid={!!error}
				aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
				className={inputClass}
			/>
		</div>
	</FieldShell>
);

export const Checkbox = ({
	id,
	checked,
	onChange,
	children,
	error,
}: {
	id: string;
	checked: boolean;
	onChange: (v: boolean) => void;
	children: ReactNode;
	error?: string;
}) => (
	<div>
		<label htmlFor={id} className="flex items-start gap-3 cursor-pointer text-[14px] leading-snug text-kin-fg-2">
			<input
				id={id}
				type="checkbox"
				checked={checked}
				onChange={e => onChange(e.target.checked)}
				aria-invalid={!!error}
				className="peer sr-only"
			/>
			<span
				aria-hidden
				className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center shadow-[inset_0_0_0_1px_var(--kin-line-strong)] peer-checked:bg-kin-accent peer-checked:shadow-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-kin-accent text-kin-accent-ink"
			>
				{checked && (
					<svg viewBox="0 0 16 16" width="12" height="12" fill="none">
						<path d="m3 8.5 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
					</svg>
				)}
			</span>
			<span>{children}</span>
		</label>
		{error && (
			<p className="mt-1 ml-[30px] text-[13px] text-[#ff8a80]" role="alert">
				{error}
			</p>
		)}
	</div>
);

/** Segmented choice (radio group), keyboard operable. */
export const Segmented = <T extends string>({
	name,
	label,
	options,
	value,
	onChange,
	error,
}: {
	name: string;
	label: string;
	options: { value: T; label: string }[];
	value: T | "";
	onChange: (v: T) => void;
	error?: string;
}) => (
	<fieldset className="space-y-1.5">
		<legend className="text-[13px] text-kin-fg-2 mb-1.5">{label}</legend>
		<div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
			{options.map(o => (
				<label key={o.value} className="relative cursor-pointer">
					<input
						type="radio"
						name={name}
						value={o.value}
						checked={value === o.value}
						onChange={() => onChange(o.value)}
						className="peer sr-only"
					/>
					<span className="flex h-12 items-center justify-center text-[15px] text-kin-fg-2 shadow-[inset_0_0_0_1px_var(--kin-line-strong)] transition-colors duration-150 peer-checked:text-kin-accent-ink peer-checked:bg-kin-accent peer-checked:shadow-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-kin-accent">
						{o.label}
					</span>
				</label>
			))}
		</div>
		{error && (
			<p className="text-[13px] text-[#ff8a80]" role="alert">
				{error}
			</p>
		)}
	</fieldset>
);

/** Hidden honeypot field: bots fill it, humans never see it. */
export const Honeypot = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
	<div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
		<label>
			Website
			<input tabIndex={-1} autoComplete="off" value={value} onChange={e => onChange(e.target.value)} />
		</label>
	</div>
);

export const Spinner = () => (
	<span
		aria-hidden
		className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
	/>
);
