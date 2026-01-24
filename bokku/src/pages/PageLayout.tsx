type PageLayoutProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
};

const PageLayout = ({ title, description, children, className }: PageLayoutProps) => {
  return (
    <section className={`page ${className ?? ""}`.trim()}>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </section>
  );
};

export default PageLayout;
