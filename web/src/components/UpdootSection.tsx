import { Flex,  IconButton } from '@chakra-ui/core';
import React, { useState } from 'react' 
import { PostSnippetFragment, PostsQuery, useVoteMutation, VoteMutationVariables } from '../generated/graphql';

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({post}) =>{
    const [ { fetching, operation }, vote] = useVoteMutation();
    return (
        <Flex direction="column" justifyContent="center" alignItems={"center"} mr={4}>
         <IconButton icon="chevron-up" onClick={async() => {
             await vote({
                 postId: post.id,
                 value: 1
             })
         }}
         variantColor={post.voteStatus === 1 ? "green" : undefined}
          aria-label="updoot post"
          isLoading={
            fetching &&
            (operation?.variables as VoteMutationVariables)?.value === 1
          }
         />
         {post.points}
         <IconButton icon="chevron-down" onClick={async() => {
             await vote({
                 postId: post.id,
                 value: -1
             })
         }} 
         variantColor={post.voteStatus === -1 ? "red" : undefined}
         isLoading={
            fetching &&
            (operation?.variables as VoteMutationVariables)?.value === -1 
          }
         aria-label="downdoot post"/>
        </Flex>
    );
}