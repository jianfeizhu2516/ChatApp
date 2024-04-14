import "./detail.css"
import {auth} from './../../lib/firebase' 
import { onAuthStateChanged } from 'firebase/auth';
const Detail = () => {
    return (
        <div className="detail">Detail
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2>Jane Doe</h2>
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
                <button>Block User</button>
                {/* WHEN SIGN OUT trigger app.jsx onAuthStateChanged */}
                <button className="logout" onClick={()=>auth.signOut()}>Log out</button>
            </div>
        </div>
    );
}

export default Detail;