import "./detail.css"
import {auth,db} from './../../lib/firebase' 
import {useUserStore} from "./../../lib/userStore";
import { useChatStore } from "./../../lib/chatStore"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
const Detail = () => {

    const { chatId, user, isCurrentUserBlocked, 
        isReceiverBlocked, changeBlockStatus, resetChat } = useChatStore();
    
    const { currentUser } = useUserStore();
    const handleBlock = async ()=>{
        if(!user) return;
            
        const userDocRef = doc(db,"users",currentUser.id)
        
        try{
            await updateDoc(userDocRef,{
                //if a user is blocked, by invoving handleBlock, you unblock him/her
                blocked:isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
            })
            changeBlockStatus()
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="detail">Detail
            <div className="user">
                <img src={user?.avatar||"./avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>Lorem ipsum ......</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="" alt="" />
                                <span>photo_2024_2.PNG</span>
                            </div>
                            <img src="./download.png" alt="" className="icon" />
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="" alt="" />
                                <span>photo_2024_2.PNG</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="" alt="" />
                                <span>photo_2024_2.PNG</span>
                            </div>
                            <img src="./download.png" alt=""className="icon" />
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="" alt="" />
                                <span>photo_2024_2.PNG</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>
                {isCurrentUserBlocked 
                ? "You are blocked !" 
                : isReceiverBlocked 
                ? "User blocked" : 
                 "Block user" }
                </button>
                {/* WHEN SIGN OUT trigger app.jsx onAuthStateChanged */}
                <button className="logout" onClick={()=>auth.signOut()}>Log out</button>
            </div>
        </div>
    );
}

export default Detail;