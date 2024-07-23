import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import {Header,Footer} from "./components/index"

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getUser()
      .then(
        (userData) => {
          if (userData) dispatch(login({ userData }));
          else dispatch(logout())
        }
      )
      .catch((e) => { console.log(e) })
      .finally(() => { setLoading(false) })


  }, [])
  

  return (!loading) ? (
    <div>
      <Header/>
      <main>

      </main>
      <Footer/>
    </div>
  ) : (
    <div>g</div>
  ) 

}

export default App
