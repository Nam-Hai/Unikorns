import './ActionButton.css'

function ActionButton() {

    return (
        <div className='ActionButton'>
            <a>
                <span className='ActionButton__container'>
                    Get in touch
                    <div className='icon'></div>
                </span>
                <span className='ActionButton__container ActionButton__container__black'>
                    Get in touch
                    <div className='icon' id='icon__black'></div>
                </span>
            </a>
        </div >
    )
}
export default ActionButton