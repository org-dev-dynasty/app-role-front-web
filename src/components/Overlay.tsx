export function Overlay({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="fixed inset-0 w-screen h-[vh100] z-15 bg-[rgba(29,29,29,0.4)] bg-opacity-50"
      onClick={onClick}
    />
  );
}