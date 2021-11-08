const baseURL = 'http://localhost:4000/api/v1'

const getTrendingProductsAPI = gender => {
    return fetch(baseURL + `/products/trending?gender=${gender}`)
    .then(res => {
        let msg = null;
        if (res.status === 400) {
            msg = "目前暫無商品";
        } else if (res.status === 200){
            msg = "取得商品成功";
        } else {
            throw new Error(`${res.status} (${res.statusText})`)
        }
        console.log(`${res.status} (${msg})`)
        return res.json().then(data => (
            {ok: res.ok, message: msg, data: data}
        ))
    })
    .catch(e => {
        console.log(e.message)
        return {ok: 0, message: e.message}
    })
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