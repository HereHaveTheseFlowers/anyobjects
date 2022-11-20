import classnames from 'classnames';
import { Button, ButtonProps } from '../Button';
import { validateForm } from '../../utils/validate';

type Props = React.HTMLAttributes<HTMLElement> & {
  active: boolean;
  mode?: string | null;
  setActive: (isActive: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
};

export function FormModal(props: Props) {
  const { active, children, setActive, onSubmit, mode } = props;

  const handleActive = () => setActive(false);

  return (
    <div className={classnames('modal', { active })}>
      <div className='modal__bg' onClick={handleActive} />
      <form className={`form ${mode ? 'form__admin' : ''}`} onSubmit={onSubmit}>
        {children}
        <button className='form__button-close' type='button' onClick={handleActive} aria-label="Иконка крестик закрыть">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 13.63 5.63 8 0 2.37 2.37 0 8 5.63 13.63 0l2.34 2.37-5.6 5.6L16 13.63 13.63 16 8 10.34l-5.63 5.63Z"/></svg>
        </button>
      </form>
    </div>
  );
}

FormModal.ButtonSubmit = function FormButtonSubmit(props: ButtonProps) {
  return <Button {...props} className='form__button-submit'>{props.children}</Button>;
};

type InputFieldProps = {
  fieldtitle: string;
} & React.InputHTMLAttributes<HTMLInputElement>

FormModal.InputField = function FormInputField(props: InputFieldProps) {
  const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const InputElement = e.target;
    if(!InputElement) return;
    if(InputElement.type==='file') {
      let inputImage = InputElement.files[0];
      if(inputImage) {
        InputElement.style.background = 'black'
      } else {
        InputElement.style.background = 'white'
      }
    }
    const formElement = InputElement.closest('form');
    if(!formElement) return;
    const fd = new FormData(formElement);
    if(fd && validateForm(fd)) {
      const buttonSubmit = document.querySelector('.form__button-submit');
      if(buttonSubmit) buttonSubmit.classList.add('form__button-submit_state_active');
    } else {
      const buttonSubmit = document.querySelector('.form__button-submit');
      if(buttonSubmit) buttonSubmit.classList.remove('form__button-submit_state_active');
    }
  };

  return (
    <div className="inputfield">
      <label htmlFor={props.name} className="inputfield__title">{props.fieldtitle}</label>
      <input {...props} id={props.name} className='inputfield__input' onChange={handleChange} />
    </div>
  )
};