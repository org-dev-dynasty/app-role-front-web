export function Overlay({ onClick, animationClass }: { onClick: () => void, animationClass: string }) {
  return (
    <div
      className={`${animationClass} fixed inset-0 w-screen h-[vh100] z-15 bg-transparent bg-opacity-50`}
      onClick={onClick}
    />
  );
}