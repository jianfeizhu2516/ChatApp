import { useState, useEffect, useRef } from "react";
import "./chat.css"
import EmojiPicker from "emoji-picker-react";
import { onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore"
import useChatStore from "./../../lib/chatStore";
import { useUserStore } from "./../../lib/userStore";
import { db } from "./../../lib/firebase";
import upload from "./../../lib/upload"
const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [chat, setChat] = useState("");
    const [img, setImg] = useState({
        file: null,
        url: "",
    });
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
    const { currentUser } = useUserStore();
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat.messages])

    const handleEmojiClick = e => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    }

    const handleImg = e => {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleSend = async () => {
        if (text == "") return;
        let imgUrl = null;
        try {
            if (img.file) {
                imgUrl = await upload(img.file);
            }
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    sendId: currentUser.id,
                    text,
                    createdAt: new Date(),
                    ... (imgUrl && { img: imgUrl })
                })
            })

            const userIds = [currentUser.id, user.id];

            //update your own chat and receiver's chat

            userIds.forEach(async (id) => {
                const userChatsRef = doc(db, 'userchats', id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);
                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats,
                    })
                }

            })

        } catch (err) {
            console.log(err)

        }
        setImg({
            fileL: null,
            url: ""
        });
        setText("");
    }

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, "chats", chatId),
            (res) => {
                setChat(res.data());
            }
        );
        return () => {
            unSub();
        }
    }, [chatId])
    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={user?.avatar || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{user?.username}</span>
                        <p>Lorem ipsum , ist ma</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                {chat?.messages?.map((message) => (
                    <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createAt}>
                        <div className="texts">
                            {message.image && <img src={message.image} alt="" />}
                            <p>
                                {message.text}
                            </p>
                            <span> 1 min ago</span>
                        </div>
                    </div>
                ))
                }

                {img.url && <div className="message own">
                    <div className="texts">
                        <img src={img.file.url} alt="" />
                    </div>
                </div>}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src="./img.png" alt="" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleImg} />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text"
                    value={text}
                    placeholder={isCurrentUserBlocked || isReceiverBlocked 
                    ? "You can not send any message" :"Type your message..."} 
                    onChange={e => { setText(e.target.value) }}
                    disabled = {isCurrentUserBlocked || isReceiverBlocked} />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmojiClick} />
                    </div>
                </div>
                <button className="sendButton"
                    onClick={handleSend}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}>Send </button>
            </div>
        </div>
    );
}

export default Chat;