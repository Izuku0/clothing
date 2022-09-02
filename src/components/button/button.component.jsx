import './button.styles.scss';

const BUTTON_TYPE_CLASSES={
    google:'google-sign-in',
    inverted:'inverted',
}

const Button=({children,buttonTypes})=>{
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonTypes]}`}>
           {children}
        </button>
    )
}

export default Button;