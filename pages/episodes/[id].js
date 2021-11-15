import { gql, useQuery } from "urql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

const query = gql`
  query GetEpisodeById($id: ID!) {
    episode(id: $id) {
      id
      title
    }
  }
`;

const EpisodePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [result] = useQuery({
    query,
    variables: {
      id,
    },
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading episode</p>;
  if (error) return <p>{error.message.replace("[GraphQL] ", "")}</p>;

  return (
    <>
      <h1>
        {data.episode.id}. {data.episode.title}
      </h1>

      <p>Fetched from /api</p>
    </>
  );
};

export default withUrqlClient(() => ({
  url: "/api",
}))(EpisodePage);
