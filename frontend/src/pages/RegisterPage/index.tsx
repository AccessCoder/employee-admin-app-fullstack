import {ChangeEvent, FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){



    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const nav = useNavigate();

    function onChangeUsername(event:ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value)
    }

    function onChangePassword(event:ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }

    function register(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        axios.post("/api/user/register", {username, password})
            .then(() => nav("/"))
            .catch((error) => console.log(error))
    }

    return(
        <div>
            <h1>REGISTER</h1>
            <form onSubmit={register}>
            <input type={"text"} placeholder={"please insert your username"} required={true}
                onChange={onChangeUsername}/>
            <input type={"password"} placeholder={"please insert your password"} required={true}
                   onChange={onChangePassword}/>
                <button>Register to the Website</button>
            </form>
            <Link to={"/"}>Already registered? - Here´s the Login</Link>
        </div>
    )

}