type CountUpProps = {
  end: number;
  suffix?: string;
  decimals?: number;
};

export function CountUp({ end, suffix = "", decimals = 0 }: CountUpProps) {
  const initialValue = `${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(end)}${suffix}`;

  return <span data-count-up data-end={end} data-suffix={suffix} data-decimals={decimals}>{initialValue}</span>;
}
