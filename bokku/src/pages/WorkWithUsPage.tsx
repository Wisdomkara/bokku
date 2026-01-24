import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

const WorkWithUsPage = () => {
  return (
    <PageLayout
      title="Work With Us"
      description="This is the Work With Us page. Choose a partner path below."
    >
      <div className="inline-links">
        <Link to="/work-with-us/supplier">Supplier</Link>
        <Link to="/work-with-us/landlord-agencies">Landlord Agencies</Link>
      </div>
    </PageLayout>
  );
};

export default WorkWithUsPage;
