import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { FiUpload } from "react-icons/fi";
import LargeButton from "../../components/LargeButton";
import Header from "../../components/Header";
import "./profile.sass";

export default function Profile() {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <>
            <Header />
            <form action="">
                <div className="profile_box">
                    <div className="profile_content">
                        <label htmlFor="email">Foto de Perfil:</label> <br />
                        <input className='upload' type="file" accept='image/*' />
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
                            value={"#"}
                        />

                        <label htmlFor="uf">UF:</label> <br />
                        <input
                            type="text"
                            value={"#"}
                        />
                        <LargeButton name={"Atualize seus dados"} />
                    </div>
                </div>
            </form>
        </>


    )
}