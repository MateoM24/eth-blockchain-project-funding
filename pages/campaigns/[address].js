import { useRouter } from "next/router";
import { Card } from "semantic-ui-react";
import web3 from "../../ethereum/web3";

import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";

export default (props) => {
  const router = useRouter();
  const { address } = router.query;

  const renderCards = ({
    minimumContribution,
    balance,
    requestCount,
    approversCount,
    manager,
  }) => {
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
        style: { overflowWrap: "break-word" },
      },
      {
        header: requestCount,
        meta: "Number of Requests",
        description:
          "A equest tries to withrar money from the contract. Requests must be approved by approvers",
        style: { overflowWrap: "break-word" },
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people that have already donated to this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "Balance is how much money this campaign has left to spend",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={items} />;
  };
  return (
    <Layout>
      <h1>Contract address: {address}</h1>
      {renderCards(props)}
    </Layout>
  );
};

export async function getServerSideProps(props) {
  console.log(props.query.address);
  // const campaigns = await factory.methods.getDeployedCampaigns().call();
  // return { props: { campaigns } };
  const campaign = Campaign(props.query.address);
  const summary = await campaign.methods.getSummary().call();
  console.log(summary);
  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
}
