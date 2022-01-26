const baseURL = 'https://erika-backend.herokuapp.com/api/v1'

const getProductsAPI = (pathname, search) => {

    const Arr = [];
    search = new URLSearchParams(search);
    const gender = pathname[0]
    const category = pathname[1]
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
    const orderArr = ['price_desc', 'price_asc', 'sold_desc', 'sold_asc']

    if(gender){
        Arr.push(['gender', genderObj[gender]])
    }
    if(category){
        Arr.push(['category', categoryObj[category]])
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

    if(search.has('is_on')){
        const is_on = search.get('is_on')
        Arr.push(['_is_on', is_on])
    }

    if(search.has('is_sale')){
        const is_sale = search.get('is_sale')
        Arr.push(['_is_sale', is_sale])
    }

    const query = new URLSearchParams(Arr);

    return fetch(`${baseURL}/products?${query}`)
    .then(res => {
        console.log(`${query}`)
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

const addProductAPI = product => {
    return fetch(`${baseURL}/products`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(res => {
        let msg = null;
        if (res.status === 400) {
            msg = "商品名稱重複";
        } else if (res.status === 200){
            msg = "新增商品成功";
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

const updateProductAPI = (id, product) => {
    return fetch(`${baseURL}/products/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(res => {
        let msg = null;
        switch (res.status) {
            case 200: {
                msg = "更新商品成功";
                break
            }
            case 403: {
                msg = "商品名稱重複";
                break
            }
            case 404: {
                msg = "無此id對應的商品";
                break
            }
            default: throw new Error(`${res.status} (${res.statusText})`)
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

const updatePatternAPI = (id, pattern) => {
    return fetch(`${baseURL}/product/patterns/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(pattern)
    })
    .then(res => {
        let msg = null;
        switch (res.status) {
            case 200: {
                msg = "更新存貨數量成功";
                break
            }
            case 403: {
                msg = "存貨數量不可為負";
                break
            }
            case 404: {
                msg = "無此id對應的存貨";
                break
            }
            default: throw new Error(`${res.status} (${res.statusText})`)
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

const deleteProductAPI = id => {
    return fetch(`${baseURL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(res => {
        let msg = null;
        switch (res.status) {
            case 200: {
                msg = "刪除商品成功";
                break
            }
            case 404: {
                msg = "無此id對應的商品";
                break
            }
            default: throw new Error(`${res.status} (${res.statusText})`)
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
            'Authorization': `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
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
                'Authorization': `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
            },
        })
        .then(res => res.json())
    })
}

const searchProductAPI = arr => {

    const query = new URLSearchParams(arr);

    return fetch(baseURL + `/product/search?${query}`)
    .then(res => {
        let msg = null;
        if (res.status === 400) {
            msg = "目前暫無商品";
        } else if (res.status === 200){
            msg = "搜尋商品成功";
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

export { getFeedImages, getProductsAPI, getProductAPI, addProductAPI, updateProductAPI, updatePatternAPI, deleteProductAPI, getTrendingProductsAPI, searchProductAPI };