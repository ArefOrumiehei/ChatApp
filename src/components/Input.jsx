//Icons
import { IconPaperclip, IconPhoto, IconSend } from "@tabler/icons-react";

const Input = () => {
    return (
        <div className="input">
            <input type="text" placeholder="Type something..." />
            <div className="send">
                <IconPaperclip/>
                <label htmlFor="file">
                    <input type="file" id="file" style={{display:'none'}} />
                    <IconPhoto/>
                </label>
                <button className="sendBtn"><IconSend/></button>
            </div>
        </div>
    );
};

export default Input;