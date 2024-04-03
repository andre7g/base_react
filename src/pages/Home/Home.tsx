import { useCustomSelector } from '../../hooks/redux';
import { useLoginActions } from '../../hooks/login/useLoginActions';

const Home = () => {
  
   const auth = useCustomSelector((state) => state.auth);

  console.log(auth.token);

  const { loginAction } = useLoginActions();

  
  return (
    <>
      <h1>{ auth.token }</h1>
      <button onClick={ loginAction }>Login</button>
    </>
  );
}

export default Home;