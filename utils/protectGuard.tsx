import {useState} from "react";
import {Navigate} from "react-router";

export default function ProtectGuard ({components}) {

    const [access , setAccess] = useState<boolean>(false)

    return access ? components : <Navigate to={"/auth"}/>
}
