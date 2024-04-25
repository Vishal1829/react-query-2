import React from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const ReactQueryEx2 = () => {

  const queryClient = useQueryClient();

  const getPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const json = await response.json();
    return json;
  } 

  const { data, isError, isLoading } = useQuery({
    queryKey: ['posts'],
    // queryFn: async () => {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    //   const json = await response.json()
    //   return json
    // },
    queryFn: getPosts,
    // staleTime: 4000,
    // refetchInterval: 4000,
    retry: 5,
  })

  // mutate is a function
  const { mutate, isLoading: loading, isError: error, isSuccess } = useMutation({
    mutationFn: (newPost) => {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newPost),
      }).then((res) => res.json())
    },
    //what it does is refetch the post data once the mutation is successful
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts']
      })
    }
    //second way is instead of refetching the data just update the old data with adding the new one
    //need more rearch on this way of doing
    // onSuccess: (newPost) => {
    //   queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost]);
    // },
  })

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError || error) {
    return <h1>Error fetching data</h1>
  }

  return (
    <div>
      {/* this is for mutating the data that is we dont know how much time it takes to add the data using api */}
      {loading && <p>Data is being added.....</p>}
      <button
        onClick={() => {
          mutate({
            userId: 101,
            id: 101,
            title: 'React Query for beginners',
            body: 'learning react query',
          })
        }}
      >
        Add Post
      </button>

      {data &&
        data.map((todo) => (
          <div key={todo.id}>
            <h4>Id: {todo.id} </h4>
            <h4>Title: {todo.title} </h4>
            <p>Body: {todo.body} </p>
          </div>
        ))}
    </div>
  )
}

export default ReactQueryEx2

/*
we alter the data which is called mutation and we do it using useMutation hook in react-query.
*/
