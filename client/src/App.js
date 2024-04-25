import { useQuery } from '@tanstack/react-query'
import './App.css'
import Form from './components/Form'
import ReactQueryEx2 from './ReactQueryEx2'
import { ReactQueryEx3 } from './ReactQueryEx3'

function App() {
  // useQuery takes 2 parameters - first is dependencies, second is callback function where we impelement our api calls
  // const { data, status, isFetching } = useQuery(
  //   ['todo'],
  //   async () => await (await fetch('http://localhost:8000/todo')).json()
  // )

  // console.log('Data', data)

  // if (isFetching) {
  //   return <h1>Loading...</h1>
  // }

  return (
    <div className="App">
      {/* <Form />
      <p>Status: {status}</p>
      {data && data.data && data.data.map((todo) => <li>{todo.title}</li>)} */}

      {/* <ReactQueryEx2 /> */}
      <ReactQueryEx3 />
    </div>
  )
}

export default App
