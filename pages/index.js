import { gql, useQuery } from "urql";
import Link from "next/link";
import { withUrqlClient } from "next-urql";

const query = gql`
  query GetAllEpisodes {
    episodes {
      id
      title
    }
  }
`;

const IndexPage = () => {
  const [result] = useQuery({
    query,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading episodes</p>;
  if (error) return <p>{error.message.replace("[GraphQL] ", "")}</p>;

  return (
    <>
      <h1>Episodes from /api</h1>

      <ul>
        {data.episodes.map((episode) => (
          <li key={episode.id}>
            <Link href={`/episodes/${episode.id}`}>
              <a>
                {episode.id}. {episode.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default withUrqlClient(() => ({
  url: "/api",
}))(IndexPage);
