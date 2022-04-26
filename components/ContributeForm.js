import { Button, Form, Input, Message } from "semantic-ui-react";
import { useState } from "react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";

const ContributeForm = ({ campaignAddress }) => {
  const [contribution, setContribution] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(campaignAddress);
    const campaign = Campaign(campaignAddress);
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, "ether"),
      });
      console.log("done");
      router.replace(`/campaigns/${campaignAddress}`);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
      setContribution("");
    }
  };
  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={contribution}
          onChange={(event) => setContribution(event.target.value)}
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
