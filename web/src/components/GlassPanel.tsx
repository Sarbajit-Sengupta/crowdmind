type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GlassPanel({ children, className = "" }: Props) {
  return (
    <section
      className={`rounded-3xl border border-cyan-500/20 bg-slate-900/75 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}