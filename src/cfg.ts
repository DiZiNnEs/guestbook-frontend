const buildType =
    window.location.hostname === 'localhost'
        ? 'LOCAL'
        : 'PRODUCTION'

const apiEndpoint = buildType === 'LOCAL' ? 'http://localhost:8000' : 'http://213.108.4.26:8000'

export {buildType, apiEndpoint}