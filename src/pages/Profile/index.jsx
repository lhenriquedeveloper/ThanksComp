import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header"
import "./profile.sass";

export default function Profile() {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <>
            <Header />
            <div className="profile_box">
                <div className="profile_content">
                    <label htmlFor="email">Email:</label> <br />
                    <input
                        type="text"
                        value={user.email}
                        disabled
                    />

                    <label htmlFor="fullname">Nome Completo:</label><br />
                    <input
                        type="text"
                        value={user.displayName}
                    />

                    <label htmlFor="phoneNumber">Contato:</label> <br />
                    <input
                        type="text"
                        value={user.phoneNumber}
                    />

                    <label htmlFor="city">Cidade:</label> <br />
                    <input
                        type="text"
                        value={user.phoneNumber}
                    />
                </div>
            </div>
        </>


    )
}