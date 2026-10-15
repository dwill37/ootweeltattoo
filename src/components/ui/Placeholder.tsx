/** Renders a visible [PLACEHOLDER: ...] marker for facts the studio still has to confirm. */
export function Ph({ children }: { children: React.ReactNode }) {
  return <span className="ph">[PLACEHOLDER: {children}]</span>;
}
