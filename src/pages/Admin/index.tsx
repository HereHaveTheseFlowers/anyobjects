import { Button } from '../../components';
import { fetchAuth } from '../../api/fetchAuth';
import store from '../../utils/Store'
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';

export default function Admin() {
    
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate(RouterList.HOME);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!e.target) return;
        const fd: FormData = new FormData(e.target as HTMLFormElement);
        if(!fd) return;
        const output: Record<string, string> = {};
        for(const data of fd) {
          output[data[0].toString()] = data[1].toString();
        }
        if(!output.login || !output.password) return;
        fetchAuth(output.login, output.password)
            .then((output: any) => { 
                console.log(output)
                if(output && output.status && output.status == 200) {
                    console.log('Logged in as admin!')
                    store.set('auth', 'admin')
                    store.set('phpKey', output.response.message)
                    navigate(RouterList.ADMIN_EDIT);
                }
            });
    };

    return (
        <>
            <div className='admin'>
                <Button onClick={navigateHome} className='admin__gohome'>ГО НА ГЛАВНУЮ</Button>
                <form className='admin__form form' onSubmit={onSubmit}>
                    <div className="inputfield">
                        <span className="inputfield__title">ЛОГИН</span>
                        <input name='login' type='text' className='inputfield__input' />
                    </div>
                    <div className="inputfield">
                        <span className="inputfield__title">ПАРОЛЬ</span>
                        <input name='password' type='password' className='inputfield__input' />
                    </div>
                    <Button className='form__button-submit form__button-submit_state_active'>ВОЙТИ</Button>
                </form>
            </div>
        </>
    )
}
