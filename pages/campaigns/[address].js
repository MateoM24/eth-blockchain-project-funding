import { useRouter } from "next/router";

import Layout from "../../components/Layout";

export default () => {
  const router = useRouter();
  const { address } = router.query;
  return (
    <Layout>
      <h1>Contract address: {address}</h1>
    </Layout>
  );
};
