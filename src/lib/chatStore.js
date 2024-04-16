import { create } from 'zustand'
import { db } from "./firebase"
import { doc, getDoc } from "firebase/firestore"
import { useUserStore } from "./userStore";
export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlock: false,
    isReceiverBlocked: false,
    changeChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser
        //check current user(user that's logged in) is blocked
        if (user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlock: true,
                isReceiverBlocked: false,
            })
        }
        //check if receiver is blocked

        else if (currentUser.blocked.includes(user.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlock: false,
                isReceiverBlocked: true,
            })
        }
        else{
           return set({
                chatId,
                user,
                isCurrentUserBlock: false,
                isReceiverBlocked: false,
            })
        }
    },
    changeBlock: () => {
        set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
      },
}))
export default useChatStore