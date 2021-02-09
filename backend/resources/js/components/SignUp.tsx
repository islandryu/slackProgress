import { FC,useState } from "react";

const SignUp:FC = () =>{
    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    return(
        <div>
            <h2>サインアップ</h2>
            <input type="text" onChange={e=>setName(e.target.value)} value={name}/>
            <input type="text" onChange={e=>setEmail(e.target.value)} value={email}/>
            <input type="password" onChange={e=>setPassword(e.target.value)} value={password}/>
            <div className="button">サインアップ</div>
        </div>
    )
}

export default SignUp;
