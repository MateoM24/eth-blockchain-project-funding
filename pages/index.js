import { Card, Button } from "semantic-ui-react";

import factory from "../ethereum/factory";

const CampaignIndex = ({ campaigns }) => {
  return (
    <div>
      <link
        async
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      <h3>Open Campaigns</h3>
      <h1>This is the new campaign page!!!</h1>
      {renderCampaigns(campaigns)}
      <Button content={"Create Campaign"} icon="add circle" primary />
    </div>
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
