import Layout from "../../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import Campaign from "../../../../ethereum/campaign";
import Header from "../../../../components/Header";

export default (props) => {
  const { Header, Row, HeaderCell, Body } = Table;
  return (
    <Layout>
      <h3>Request List</h3>
      <Link href={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary>Add Requests</Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approval</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
      </Table>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const campaign = Campaign(context.query.address);
  const requestCount = await campaign.methods.getRequestsCount().call();

  let requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  const mappedRequests = requests.map((r) => {
    return {
      description: r.description,
      value: r.value,
      recipient: r.recipient,
      complete: r.complete,
      approvalCount: r.approvalCount,
    };
  });

  return {
    props: {
      address: context.query.address,
      requests: mappedRequests,
      requestCount: requestCount,
    },
  };
}
