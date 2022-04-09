import { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";

import Layout from "../../components/Layout";

export default () => {
  const [minContribution, setMinContribution] = useState("");
  return (
    <Layout>
      <h1>Create a Campaign</h1>

      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minContribution}
            onChange={(event) => setMinContribution(event.target.value)}
          />
        </Form.Field>
        <Button primary>Create!</Button>
      </Form>
    </Layout>
  );
};
