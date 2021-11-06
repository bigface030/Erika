const baseURL = 'http://localhost:4000/api/v1'

const getTrendingProductsAPI = gender => {
    return fetch(baseURL + `/products/trending?gender=${gender}`)
    .then(res => res.json())
}

const getFeedImages = () => {
    return fetch('https://api.unsplash.com/topics/fashion', {
        method: 'GET',
        headers: {
            'Accept-Version': 'v1',
            'Authorization': 'Client-ID CtXu1O6qrBiFAMp1FcW2cy7KFvKKej8TGHZHPnV8DPo',
        },
    })
    .then(res => res.json())
    .then(data => {
        const query = new URLSearchParams({
            topics: data.id,
            orientation: 'squarish',
            count: 6,
        }).toString()
        return fetch('https://api.unsplash.com/photos/random?' + query, {
            method: 'GET',
            headers: {
                'Accept-Version': 'v1',
                'Authorization': 'Client-ID CtXu1O6qrBiFAMp1FcW2cy7KFvKKej8TGHZHPnV8DPo',
            },
        })
        .then(res => res.json())
    })
};

export { getFeedImages, getTrendingProductsAPI };