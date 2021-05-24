import "./App.css";
import styled from "styled-components";

import { useQuery, gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
const List = gql`
  query Users {
    Users {
      name
      todaysCount
      today
    }
  }
`;
const sendData = gql`
  mutation UpdateUser($id: ID, $pushups: Int) {
    updateUser(id: $id, pushups: $pushups) {
      pushups
    }
  }
`;

const Home = styled.div`
  background: url("./background/gpak.jpg");
  @media (min-width: 1000px) {
    background: url("./background/grp.png");
  }

  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  padding-top: 1px;
`;
const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 70px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
`;
const Header = styled.div`
  h1 {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 75px;
    /* identical to box height */
    letter-spacing: -0.02em;
    color: #000000;
  }
`;

const InteractionBox = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  padding-right: 5px;
  display: flex;
  p {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */
    letter-spacing: -0.02em;
    padding-right: 5px;

    color: #000000;
  }
  input {
    border: none;
    background: transparent;
    border-bottom: 1px solid black;
    width: 77px;
    &:focus {
      outline: none;
    }
  }
`;
const Button = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height */
  letter-spacing: -0.02em;
  margin-left: 15px;

  color: #ecf1f4;
  padding: 10px 30px;
  background: #59c44d;
  border-radius: 5px;
`;

const DataTable = styled.div`
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
  display: grid;
  grid-template-areas:
    "head head head"
    "data data data";
`;
const Head = styled.div`
  margin-left: 44%;
  margin-bottom: 10px;

  grid-area: head;
  display: flex;
  justify-content: space-between;
  p {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */
    letter-spacing: -0.02em;

    color: #000000;
    text-transform: capitalize;
  }
`;
const Data = styled.div`
  grid-area: data;

  display: grid;

  grid-template-columns: 1fr;
`;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  p {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */
    letter-spacing: -0.02em;

    color: #000000;
  }
`;
const Name = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height */
  letter-spacing: -0.02em;

  color: #000000;
  border: 1px solid #59c44d;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px;
`;

function App() {
  const [amount, setAmount] = useState("");
  const [id, setId] = useState("");
  const { loading, error, data: data1, refetch } = useQuery(List, {
    pollInterval: 500,
  });
  const [updateUser, { data }] = useMutation(sendData);

  useEffect(() => {
    console.log(amount);
  }, [amount]);

  const onButtonClick = () => {
    updateUser({ variables: { id: id, pushups: parseInt(amount) } });
    refetch();
    setId("");
    setAmount("");
  };

  console.log(data);
  return (
    <div className='App'>
      <Home>
        <Container>
          <Header>
            <h1>Track Your Pushups</h1>
          </Header>
          <InteractionBox>
            <InputBox>
              <p>Amount:</p>

              <input
                type='text'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </InputBox>
            <InputBox>
              <p>Id:</p>
              <input
                type='text'
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </InputBox>
            <Button onClick={onButtonClick}>Add</Button>
          </InteractionBox>
          <DataTable>
            <Head>
              <p>today</p>
              <p>total</p>
            </Head>

            <Data>
              {loading ? (
                <div>loading</div>
              ) : error ? (
                <div>`${error.message}`</div>
              ) : (
                data1.Users.map((item) => (
                  <Item key={item.name}>
                    <Name>{item.name}</Name>
                    <p>-{item.today}</p>
                    <p>-{item.totalCount}</p>
                  </Item>
                ))
              )}
            </Data>
          </DataTable>
        </Container>
      </Home>
    </div>
  );
}

export default App;
