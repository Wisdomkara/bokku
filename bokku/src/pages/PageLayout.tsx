type PageLayoutProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const PageLayout = ({ title, description, children }: PageLayoutProps) => {
  return (
    <section className="page">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </section>
  );
};

export default PageLayout;
