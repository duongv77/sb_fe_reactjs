import LoadingOverlay from 'react-loading-overlay';

function Loading({loading}) {
    return (
        <LoadingOverlay
            active={loading}
            spinner
            styles={{
                overlay: (base) => ({
                    ...base,
                    height: '100vh',
                    position:'fixed'
                })
            }}
        >
        </LoadingOverlay>
    )
}

export default Loading;