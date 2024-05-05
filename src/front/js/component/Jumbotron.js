import React from "react";
import './../../styles/style.css';

// Definir los componentes de los jumbotrons fuera de Jumbotron
const HomePageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">CUIDAMOS SIN QUE SALGAS DE TU HOGAR</h1>
            <p className="lead">Obten una atención médica con nuestro equipo de profesionales</p>

        </div>
    );
};

const LoginPageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">LOGIN</h1>
            <p className="lead">Accede a tu perfil</p>
        </div>
    );
};
const RegisterPageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">REGISTRATE</h1>
            <p className="lead">Es el momento de cambiar tu salud a algo más positivo</p>
            <hr className="my-4" />
            <p>¡Estamos aquí para ayudarte!</p>
        </div>
    );
};

const PrivatePageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">ZONA PRIVADA</h1>
            <p className="lead">Donde encontrar tus datos personales y tus citas pendientes</p>
        </div>
    );
};

const AppointmentPageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">Pide una cita</h1>
            <p className="lead">No dudes en pedir una cita con tu medico de confianza</p>
        </div>
    );
};

const ChangePasswordPageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">CAMBIO DE CONTRASEÑA</h1>
            {/* <p className="lead">No dudes en pedir una cita con tu medico de confianza</p> */}
        </div>
    );
};



const ChangeProfilePictureJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">MI IMAGEN DE PERFIL</h1>
            {/* <p className="lead">No dudes en pedir una cita con tu medico de confianza</p> */}
        </div>
    );
};


const LoadFilesJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">MIS DOCUMENTOS</h1>
            <p className="lead">Carga los documentos necesarios</p>
        </div>
    );
};

// const SingleDoctorPageJumbotron = () => {
    
//     return (
//         <div className="jumbotron">
//             <h1 className="display-4">EQUIPO MÉDICO</h1>
//             <p className="lead">El experto</p>
//         </div>
//     );
// };


const AllDoctorPageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">EQUIPO MÉDICO</h1>
            <p className="lead">Profesionales que no dudarán de darte lo mejor</p>
            <hr className="my-4" />
            <p>¡Estamos aquí para ayudarte!</p>
        </div>
    );
};

const PricePageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">PRECIOS</h1>
            <p className="lead">Consulta nuestras tarifas</p>
        </div>
    );
};

const EditPageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">EDITAR PERFIL</h1>
            <p className="lead">Modifica los campos que necesites</p>
        </div>
    );
};

const InfoPageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">AVISOS</h1>
        </div>
    );
};

const SpecialtyPageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">NUESTRAS ESPECIALIDADES</h1>
            <p className="lead"></p>
            <hr className="my-4" />
            <p>¡Explora todas las funcionalidades que tenemos para ofrecerte!</p>
        </div>
    );
};

const RecoverpasswordPageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">RECUPERAR CONTRASEÑA</h1>
            <p className="lead"></p>
            <hr className="my-4" />
            <p>¿Has olvidado tu password?</p>
        </div>
    );
};

const NullPageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4"> </h1>
            <p className="lead"></p>

        </div>
    );
};

const ContactPageJumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4"> CONTACTANOS </h1>
            <p className="lead">Estaremos encantados de ayudarte</p>

        </div>
    );
};


// Ahora exportar Jumbotron como un componente separado
const Jumbotron = ({ page }) => {

    // Determina qué componente de Jumbotron mostrar según la página actual
    switch (page) {
        case 'home':
            return <HomePageJumbotron />;
        case 'login':
            return <LoginPageJumbotron />;
        case 'register':
            return <RegisterPageJumbotron />;
        case 'private':
            return <PrivatePageJumbotron />;
        case 'appointment':
            return <AppointmentPageJumbotron />;
        // case 'singleDoctor':
        //     return <SingleDoctorPageJumbotron />;
        case 'allDoctor':
            return <AllDoctorPageJumbotron />;
        case 'price':
            return <PricePageJumbotron />;
        case 'edit':
            return <EditPageJumbotron />;
        case 'info':
            return <InfoPageJumbotron />;
        case 'specialty':
            return <SpecialtyPageJumbotron />;
        case 'undefined':
            return <NullPageJumbotron />;
        case 'contact':
            return <ContactPageJumbotron />;
        case 'recoverpassword':
            return <RecoverpasswordPageJumbotron/>;    
        case 'changepassword':
            return <ChangePasswordPageJumbotron/>;
        case 'uploadpicture':
            return <ChangeProfilePictureJumbotron/>;
        case 'uploadfiles':
            return <LoadFilesJumbotron />;                                         
        default:
            return null;
    }
};

export default Jumbotron;