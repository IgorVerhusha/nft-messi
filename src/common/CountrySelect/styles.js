const styles = theme => ({
    inputField: {
        background: 'none',
        width: '15.625vw',
        height: '2.76vw',
        borderRadius: '0',
        border: '0.052vw solid #424241',
        padding: '0 0.911vw',
        lineHeight: '0.885vw',
        color: 'rgba(255, 255, 255, 0.4)',
        fontWeight: 500,
        fontSize: '0.729vw',
        '& .MuiOutlinedInput-input': {

            padding: '14px 14px',
        },
        ['@media (max-width: 768px)']: {
            width: '100%',
            height: '12.267vw',
            padding: '0',
            backgroundSize: '3.733vw auto',
            fontSize: '3.733vw',
            backgroundPosition: '4vw center',
            lineHeight: '01.1876em',
        }
    },

})

export default styles
