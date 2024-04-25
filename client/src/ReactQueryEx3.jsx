import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTodo, fetchTodoById, fetchTodos } from './Todos';

export const ReactQueryEx3 = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const { data: todos, isLoading } = useQuery({
    queryFn: () => fetchTodos(),
    queryKey: ['myTodo'],
    //this property will tell react query that it should never its data stale which means that data is still valid and so
    //and by providing this react query will not fetch the data even in the background
    staleTime: Infinity,
    //This will tell react query that it should never cache the data at all and it should always make the fetch request
    //no matter what
    cacheTime: 0,
  });

  const { data: filterData, isLoading: filterLoading } = useQuery({
    queryFn: () => fetchTodoById(search),
    queryKey: ['searchTodo'],
    enabled: !!search, // Enable the query when searchTerm is truthy
  });


  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: (title) => addTodo(title), // Pass title as a string to addTodo
    onSuccess: () => {
      queryClient.invalidateQueries('myTodo');
    },
  });

  const handleAddTodo = async () => {
    try {
      await addTodoMutation(title); // Pass title as a string
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <div>
      <div>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      {todos?.map((todo, key) => (
        <div key={key}>
          <h5>id: {todo.id}</h5>
          <p>title: {todo.title}</p>
        </div>
      ))}

      <br />
      <br />
      <br />
      <br />

      <div>
      <input type="number" value={search} onChange={(e) => setSearch(e.target.value)} />
      {filterLoading ? (
        <div>FiletLoading...</div>
      ) : (
        <div>
          {filterData.map((item, key) => {
            return <h2 key={key}>{item.id} {item.title}</h2>
          })}
        </div>
      )}
    </div>
    </div>
  );
};
