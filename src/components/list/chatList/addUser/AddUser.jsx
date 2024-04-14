import './addUser.css'
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useState } from 'react';
import useUserStore from '../../../../lib/userStore';
const AddUser = () => {

  const { currentUser } = useUserStore()
  const [user, setUser] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username')
    try {
      const userRef = collection(db, "users");
      // Create a query against the collection.
      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data())
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddChat = async () => {
    //fetch data
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats")
    try {
      const newChatRef = doc(chatRef)
      console.log('newChatRef is', newChatRef)
      // automatically generated new one so that you can update userChat
      //add data
      await setDoc(newChatRef, {
        // the time for the message creation time is the server time stamp
        createdAt: serverTimestamp(),
        // when you add a new user, no chat messgae will be added
        messages: [],
      });
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        })
      })

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          receiverId: user.id,
          updatedAt: Date.now(),
        })
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='addUser'>
      <form action="" onSubmit={handleSearch}>
        <input type="text" placeholder='Username' name='username' />
        <button>Search</button>
      </form>
      {user && <div className="user">
        <div className="detail">
          <img src={user.avatar || "./avatar.png"} alt="" />
          <span>{user.username}</span>
        </div>
        <button onClick={handleAddChat}>Add User</button>
      </div>}
    </div>
  )
}
export default AddUser
