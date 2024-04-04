import { Navigate } from "react-router-dom";
import { useCustomSelector } from "../hooks/redux"


export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const auth = useCustomSelector((state) => state.auth);
    return (!auth.token) ? children : <Navigate to="/home"/>
}
