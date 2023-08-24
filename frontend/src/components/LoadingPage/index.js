import ReactLoading from 'react-loading';

const LoadingPage = ({ type, color}) => {
    return (
        <>
            <ReactLoading type={type} color={color} height={'23vh'} width={'23vw'} />
        </>
    )
}


export default LoadingPage