import ReactLoading from 'react-loading';

const LoadingPage = ({ type, color, height, width}) => {
    return (
        <>
            <ReactLoading type={type} color={color} height={height} width={width} />
        </>
    )
}


export default LoadingPage