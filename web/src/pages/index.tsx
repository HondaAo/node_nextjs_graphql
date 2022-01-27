import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useDeletePostMutation, useMeQuery, usePostsQuery } from "../generated/graphql";
import Layouts from "../components/Layouts";
import {
  Link,
  Stack,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Icon,
  IconButton,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { useState } from "react";
import { UpdootSection } from "../components/UpdootSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  const [{data: meData}] = useMeQuery()
  const [, deletePost] = useDeletePostMutation()

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layouts>
      <Flex align="center">
        <Heading>LiReddit</Heading>
        <NextLink href="/create-post">
          <Button as={Link} ml={"auto"}>
          <Link  ml="auto">create post</Link>
          </Button>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => 
          !p ? null : (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              <UpdootSection post={p} />
              <Box flex={1}>
                <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                 <Link>
                 <Heading fontSize="xl">{p.title}</Heading>
                 </Link>
                </NextLink>
                <Text>posted by {p.creator.username}</Text>
                <Flex >
                <Text flex={1} mt={4}>{p.textSnippet}</Text>
                {meData?.me?.id === p.creator.id ? (
                <>
                <Box ml={"auto"}>
                  <NextLink href="/post/edit/[id]" as={`/post/edit/${p.id}`}>
                    <IconButton
                     as={Link}
                     mr={4}
                     icon={"edit"}
                     aria-label="Edit Post"
                    />
                  </NextLink>
                </Box>
                <IconButton icon='delete' aria-label='Delete Post' variantColor='red' onClick={() => {
                  deletePost({id: p.id})
                }}  />
                </>)
                 : null}
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layouts>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);