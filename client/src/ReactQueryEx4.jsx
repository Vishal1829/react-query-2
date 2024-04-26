import React, { useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const ReactQueryEx4 = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginApi = async () => {
		const response = await axios.post("https://jsonplaceholder.typicode.com/posts",
			{
				emailId,
        password
			}
		)
		
		return response.data;
	}

	const handleLoginSuccess = (data) => {
		// console.log("React Query Response: ", data.data, data.status);
		// do something
	}

	const handleLoginError = (error) => {
		console.error("error - ", error);
	}

  // https://stackoverflow.com/questions/76543101/rejected-react-query-mutation-causing-uncaught-in-promise-error

	const { mutate: handleLogin } = useMutation({
		
		mutationFn: handleLoginApi,

		onSuccess: handleLoginSuccess,

		onError: handleLoginError,
	});

  return (
    <div>
      
    </div>
  )
}

export default ReactQueryEx4

/*
you can use mutate instead of mutateAsync if you don't need access to the returned Promise. It will catch errors internally.
*/