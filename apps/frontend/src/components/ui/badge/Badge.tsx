interface BadgeProps {
  children: React.ReactNode;
}

export const Badge = ({ children }: BadgeProps) => {
  return <div className="badge badge-error badge-xs sm:badge-sm md:badge-md lg:badge-lg">{children}</div>;
};
