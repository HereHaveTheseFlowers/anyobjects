import { Button } from '../../components';
import { fetchAuth } from '../../api/fetchAuth';
import store from '../../utils/Store'
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';

export default function Admin() {

    const sendAuth = async (login: string, password: string) => {
        console.log(123)
    }

    
    const navigate = useNavigate();

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
            .then((data: any) => { 
                if(data && data.message && data.message === 'Access provided') {
                    console.log('Logged in as admin!')
                    store.set('auth', 'admin')
                    navigate(RouterList.ADMIN_EDIT);
                }
            });
    };

    return (
        <>
            <div className='admin'>
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
