const githubURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_clientId}&redirect_uri=${process.env.REACT_APP_GITHUB_redirectUrl}`;

export const githubLogin = () => {
    window.location.href = githubURL;
};

export const getAccessToken = async (code) => {
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.REACT_APP_GITHUB_clientId,
            client_secret: process.env.REACT_APP_GITHUB_client_secret,
            code: code,
        }),
    });

    const data = await response.json();
    return data.access_token; // 액세스 토큰 반환
};

export const getUserInfo = () => {
    const code = getQueryParam();
    if (code === null) return;
    
    getAccessToken(code).then(async (accessToken) => {
        const response = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });
        const userInfo = await response.json();
        return userInfo; // 사용자 정보 반환
    });
};

export const getQueryParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
};