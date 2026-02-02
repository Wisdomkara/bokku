type PageLayoutProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
};

const PageLayout = ({ title, description, children, className }: PageLayoutProps) => {
  return (
    <div className={`mx-auto max-w-7xl px-4 py-12 md:px-8 ${className ?? ""}`.trim()}>
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl font-display">
          {title}
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
};

export default PageLayout;
