import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";

const CampaignIndex = ({ campaigns }) => {
  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <h1>This is the new campaign page!!!</h1>
        <Button
          floated="right"
          content={"Create Campaign"}
          icon="add circle"
          primary
        />
        {renderCampaigns(campaigns)}
      </div>
    </Layout>
  );
};

const renderCampaigns = (campaigns) => {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: <a>View Campaign</a>,
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
