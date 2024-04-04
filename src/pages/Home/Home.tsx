import { useCustomSelector } from '../../hooks/redux';

const Home = () => {
  
   const auth = useCustomSelector((state) => state.auth);

  console.log(auth.token);

  // const { loginAction } = useLoginActions();

  
  return (
    <>
      <h1>{ auth.token }</h1>
      {/* <button onClick={ loginAction }>Login</button> */}
    </>
  );
}

export default Home;