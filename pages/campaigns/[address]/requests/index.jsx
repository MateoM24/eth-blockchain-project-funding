import Layout from "../../../../components/Layout";
import { Button } from "semantic-ui-react";
import Link from "next/link";

export default (props) => {
  return (
    <Layout>
      <h3>Request List</h3>
      <Link href={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary>Add Requests</Button>
        </a>
      </Link>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      address: context.query.address,
    },
  };
}
