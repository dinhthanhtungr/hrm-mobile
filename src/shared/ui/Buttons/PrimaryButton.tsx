type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({
  className = "",
  type = "button",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`h-14 w-full rounded-lg bg-[#173b2c] px-5 text-base font-semibold text-white transition hover:bg-[#23543f] disabled:cursor-not-allowed disabled:bg-[#87968c] ${className}`}
      type={type}
      {...props}
    />
  );
}
