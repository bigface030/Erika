const baseURL = 'http://localhost:4000/api/v1'

const getProductsAPI = (pathname, search) => {

    const Arr = [];
    search = new URLSearchParams(search);
    const gender = pathname.split('/')[2]
    const category = pathname.split('/')[3]
    const genderObj = {
        men: 'M',
        women: 'F',
    }
    const categoryObj = {
        tops: 101,
        shirts: 102,
        knit: 104,
        one_piece: 105,
        outer: 106,
        bottoms: 201,
        skirts: 301,
        general: 401
    }
    const orderArr = ['sold_desc', 'price_desc', 'price_asc']

    if(gender){
        Arr.push(['gender', genderObj[gender]])
        if(category){
            Arr.push(['category', categoryObj[category]])
        }
    }

    if(search.has('size')){
        const sizes = search.get('size').split(' ').map(size => (
            ['_size[]', size]
        ))
        Arr.push(...sizes)
    }

    if(search.has('color')){
        const colors = search.get('color').split(' ').map(size => (
            ['_color[]', size]
        ))
        Arr.push(...colors)
    }

    if(search.has('price')){
        const prices = search.get('price').split('-')
        Arr.push(['_min', prices[0]], ['_max', prices[1]])
    }

    if(search.has('order')){
        const order = search.get('order')
        Arr.push(['_order', orderArr.indexOf(order)+1])
    }

    if(search.has('page')){
        const page = search.get('page')
        Arr.push(['_page', page])
    }

    const query = new URLSearchParams(Arr);

    return fetch(`${baseURL}/products?${query}`)
    .then(res => {
        // console.log(`${query}`)
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

const getProductAPI = id => {
    return fetch(baseURL + `/products/${id}`)
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

const getTrendingProductsAPI = () => {
    return fetch(baseURL + `/product/trending`)
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

export { getFeedImages, getProductsAPI, getProductAPI, getTrendingProductsAPI };