import { useState }             from 'react';
import { httpRequest }          from '../../helpers/httpRequest';
import { useForm }              from '../../hooks/useForm';


export const Authentication = () => {

    const ValidatePassword = async(passwordUser) => {
        if (typeof window !== 'undefined') {
            const authLocal = localStorage.getItem("authUser");

            if(authLocal === null){
                localStorage.setItem("authUser", JSON.stringify({
                    authenticated: false,
                    role: 'admin'
                }));
            } 

            const [ resp ] = await Promise.all([
                httpRequest().get(`${process.env.URL}auth/login/${passwordUser}`),
            ]);

            const { status, message } = resp;

            if(status){
                localStorage.setItem("authUser", JSON.stringify({
                    authenticated: true,
                    role: 'admin'
                }));
            }

            // Manejar las excepciones if resp.status
            return { status, message };
        }
    }
    
    const validateToken = () => {
        if (typeof window !== 'undefined') {
            let authLocal = JSON.parse(localStorage.getItem("authUser"));
            
            if(authLocal === null){
                localStorage.setItem("authUser", JSON.stringify({
                    authenticated: false,
                    role: 'admin'
                }));
                authLocal = JSON.parse(localStorage.getItem("authUser"));
            }
            return authLocal.authenticated;
        }
        
    }

    return { ValidatePassword, validateToken };
}

export const Auth = ({ onShowModal }) => {

    const [error, setError] = useState('');

    const [form, inputChange] = useForm({
        accessPassword: ''
    });

    const accessUserHandler = async(e) => {
        e.preventDefault();

        if(!isNaN(form.accessPassword)){

            const { status, message } = 
                await Authentication().ValidatePassword(form.accessPassword);

            if(!status){
                return setError(message || 'Hubo un error al autenticarte, contacta al Administrador.');
            }
            onShowModal(false);
            
        } else {
            return setError('La contrase??a solo debe contener numeros');
        }
    }

    return (
        <div className='authentication'>
            <form onSubmit={accessUserHandler}>
                <p>Introduce la contrase??a de acceso</p>
                <h1>{error !== '' && form.accessPassword != '' && error}</h1>
                <input 
                    name='accessPassword'
                    onChange={inputChange}
                    type='password' 
                />
            </form>
        </div>
    )
}