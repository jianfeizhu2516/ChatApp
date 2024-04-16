import { onAuthStateChanged } from "firebase/auth";
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification";
import {useUserStore} from "./lib/userStore";
import { useChatStore } from "./lib/chatStore"
import { useEffect } from "react";
import {auth} from "./lib/firebase"
const App = () => {
  const {currentUser,isLoading,fetchUserInfo} = useUserStore();
  const { chatId } = useChatStore();
  //listen to authentication
  useEffect(()=>{
    const unSub = onAuthStateChanged(auth,(user)=>{
    fetchUserInfo(user?.uid)
    })
    return ()=>{
      unSub();
    }
  },[fetchUserInfo])

  console.log('currentUser',currentUser)
  if(isLoading) return <div className="loading">is loading.....</div>

  return (
    <div className='container'>
      {
        currentUser ?
          <>
          <List />
          {chatId&&<Chat />}
          {chatId&&<Detail/>}
          </>
          :
          <Login />
      }
      <Notification/>
    </div>
  )
}

export default App