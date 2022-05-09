import Layout from "../../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import Campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

export default (props) => {
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRows = () => {
    return props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          request={request}
          id={index}
          address={props.address}
          approversCount={props.approversCount}
        ></RequestRow>
      );
    });
  };

  return (
    <Layout>
      <h3>Request List</h3>
      <Link href={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Requests
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <div>{`Found ${props.requestCount} requests`}</div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const campaign = Campaign(context.query.address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

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
      approversCount: approversCount,
    },
  };
}
