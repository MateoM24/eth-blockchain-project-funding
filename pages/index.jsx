import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import Link from "next/link";

const CampaignIndex = ({ campaigns }) => {
  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <h1>This is the new campaign page!!!</h1>
        <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content={"Create Campaign"}
              icon="add circle"
              primary
            />
          </a>
        </Link>
        {renderCampaigns(campaigns)}
      </div>
    </Layout>
  );
};

const renderCampaigns = (campaigns) => {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: (
        <Link href={`/campaigns/${encodeURIComponent(address)}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    };
  });
  return <Card.Group items={items}></Card.Group>;
};

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
}

export default CampaignIndex;
