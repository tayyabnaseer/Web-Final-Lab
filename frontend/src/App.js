import { useEffect, useState } from 'react';
import styled from 'styled-components';
function App() {
  const [data, setData] = useState([
    
  ]);
  const [title, setTitle] = useState();
  const [edit, setEdit] = useState(false);	

  const postData = async (title) => {
    const res = await fetch("http://localhost:3001/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    const data = await res.json();
    console.log(data)
    setData((prev) => {
      return [
        ...prev,
        data
      ]
    });
  }

  const updateData = async (title, id) => {
    const res = await fetch("http://localhost:3001/api/data/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    const result = await res.json();
    const newData = data.map((item) => item._id == id ? {...item, title: result.title }: item);
    console.log(newData)
    setData(newData);
  }

  const deletedData = async (id) => {
    const res = await fetch("http://localhost:3001/api/data/"+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const result = await res.json();
    const newData = data.filter((item) => item._id !== id);
    setData(newData);
  }

  const getData = async () => {
    const res = await fetch("http://localhost:3001/api/data")
    const data = await res.json();
    console.log(data)
    setData(data);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <Container>
      <InputContainer>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter your name" />
        <Button onClick={() => {
         postData(title)
        }}>Submit</Button>
      </InputContainer>
      {
        data.map((item, i) => (
          <DataContainer key={
            i
          }>
            <DataField>
              <Data>{item.title}</Data>
              <Button onClick={() => {
                // alert("Are you sure you want to delete this item?")
                deletedData(item._id)
              }}>Delete</Button>
              <Button onClick={() => setEdit(item)}>Edit</Button>
            </DataField>
          </DataContainer>
        ))
      }
      <InputContainer>
        <Input value={edit?.title} onChange={e => setEdit((prev) => {
          return {
            ...prev,
            title: e.target.value
          }
        })} type="text" placeholder="Enter your name" />
        <Button onClick={() => updateData(edit.title, edit._id)}>Submit</Button>
      </InputContainer>
    </Container>
  );
}

export default App;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  border: 1px solid red;
  padding: 1rem;
  border-radius: 1.5rem;
`

const Button = styled.button`
  padding-inline: 2rem;
  padding-block: 1rem;
  border-radius: 2rem;
  margin-left: 1rem;
  border: 1px solid red;
`

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DataField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

const Data = styled.p`
  font-size: 1.5rem;
  margin-right: 1rem;
`