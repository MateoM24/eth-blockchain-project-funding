import factory from "../ethereum/factory";

const CampaignIndex = ({ campaigns }) => {
  console.log(campaigns);
  return (
    <div>
      <h1>This is the new campaign page!!!</h1>
      <div>
        {campaigns.map((c) => (
          <div>{c}</div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
}

export default CampaignIndex;
