import { FC,useState } from "react";

const Login:FC = () => {
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    return(
            <div>
            <input type="text" onChange={e=>setEmail(e.target.value)} value={email}/>
            <input type="password" onChange={e=>setPassword(e.target.value)} value={password}/>
        </div>
    )
}

export default Login;
