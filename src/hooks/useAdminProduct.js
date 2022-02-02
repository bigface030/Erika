import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { sizeMap } from "../constants/mapping";
import { setErrorMessage } from "../features/general/generalSlice";
import { addProductAPI, searchProductAPI, updateProductAPI } from "../webAPI/productAPI"


export default function useAdminProduct ({step, setStep, productToAdd, setProductToAdd, top}) {

    const history = useHistory();

    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [category, setCategory] = useState('')
    const [desc, setDesc] = useState('')
    const [material, setMaterial] = useState('')
    const [washing, setWashing] = useState('')
    const [images, setImages] = useState(Array(4).fill({src: ''}))

    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    
    const [patterns, setPatterns] = useState([])
    const [isOn, setIsOn] = useState(false)
    const [isSale, setIsSale] = useState(false)
    const [priceStandard, setPriceStandard] = useState(0)
    const [priceSale, setPriceSale] = useState(0)

    const product = useSelector(state => state.product.product)
    const errorMessage = useSelector(state => state.general.errorMessage)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!product) return
        setName(product.product.name)
        setGender(product.product.gender)
        setCategory(product.product.Category.name)
        setDesc(product.product.desc)
        setMaterial(product.product.material)
        setWashing(product.product.washing)
        setImages(Array(4).fill({src: ''}).map((image, i) => product.product.Images[i] ? {...image, id: product.product.Images[i].id, src: product.product.Images[i].src} : image))
        setSizes(product.product[product.product.Category.group].map(size => size.waist ? {...size, waist: size.waist.split('~')} : size))
        setColors(product.product.Colors)
    }, [product])


    const handleInputChange = e => {
        switch (e.target.name) {
            case 'name': {
                if(errorMessage) dispatch(setErrorMessage(''))
                return setName(e.target.value)
            }
            case 'gender': {
                if(e.target.id === 'male') return setGender('M')
                if(e.target.id === 'female') return setGender('F')
                break
            }
            case 'category': return setCategory(e.target.value)
            case 'desc': return setDesc(e.target.value)
            case 'material': return setMaterial(e.target.value)
            case 'washing': return setWashing(e.target.value)
            case 'image': {
                return setImages(images.map((image, index) => index === parseInt(e.target.id.slice(-1)) ? {...image, src: e.target.value} : image))
            }
            case 'size': {
                if(e.target.id.includes('size') && errorMessage === '尺碼不可重複') dispatch(setErrorMessage(''))
                if(e.target.id.includes('waist')){
                    return setSizes(sizes.map((size, i) => i === parseInt(e.target.id.slice(-1)) ? {...size, waist: size.waist.map((a, i) => i === parseInt(e.target.id.split('_')[1]) ? e.target.value : a)} : size))
                }
                return setSizes(sizes.map((size, i) => i === parseInt(e.target.id.slice(-1)) ? {...size, [e.target.id.slice(0, -2)]: e.target.value.toUpperCase()} : size))
            }
            case 'color': {
                if(e.target.id.includes('name') && errorMessage === '名稱不可重複') dispatch(setErrorMessage(''))
                return setColors(colors.map((color, i) => i === parseInt(e.target.id.slice(-1)) ? {...color, [e.target.id.split('_')[0]]: e.target.value.toLowerCase()} : color))
            }
            case 'pattern': {
                return setPatterns(patterns.map((pattern, i) => i === parseInt(e.target.id.slice(-1)) ? {...pattern, [e.target.id.split('_')[0]]: e.target.value} : pattern))
            }
            case 'is_on': return setIsOn(e.target.checked)
            case 'is_sale': return setIsSale(e.target.checked)
            case 'price_standard': return setPriceStandard(e.target.value)
            case 'price_sale': return setPriceSale(e.target.value)
            default: break
        }
    }

    const handleSetStep = e => {
        switch (step) {
            case 1: {
                window.scrollTo(0, 0)
                if(!name || !gender || !category || !images[0].src) return; 
                return searchProductAPI([['name', name]]).then(result => {
                    if(result.ok) return dispatch(setErrorMessage('商品名稱重複'))
                    saveProduct()
                    setStep(step+1)
                })
            }
            case 2: {
                if(e.target.name === 'next'){
                    if(saveProduct()){
                        setStep(step+1)
                        window.scrollTo(0, 400)
                    }else{
                        window.scrollTo(0, 0)
                    }
                }
                if(e.target.name === 'back') {
                    setProductToAdd('')
                    setStep(step-1)
                    window.scrollTo(0, 0)
                    setSizes([])
                }
                break
            }
            case 3: {
                const lastProduct = {...productToAdd}
                delete lastProduct.sizes
                delete lastProduct.colors
                setProductToAdd(lastProduct)
                setStep(step-1)
                return window.scrollTo(0, 0)
            }
            default: break
        }
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        const [type, stepName] = e.target.name.split('_')
        switch (type) {
            case 'edit': {
                return checkForm() ? (
                    updateProductAPI(product.product.id, {
                        name, 
                        gender, 
                        category, 
                        desc, 
                        material, 
                        washing, 
                        images, 
                        sizes, 
                        colors, 
                    }).then(result => {
                        if (!result.ok) {
                            dispatch(setErrorMessage(result.message))
                            return top.current.scrollIntoView();
                        }
                        dispatch(setErrorMessage(''))
                        alert('更新成功!')
                        history.go()
                    })
                ) : (
                    top.current.scrollIntoView()
                )
            }
            case 'add': {
                if (stepName === 'first') saveProduct()
                return addProductAPI(productToAdd)
                .then(result => {
                    if (!result.ok) {
                        let lastProduct = {...productToAdd}
                        switch (stepName) {
                            case 'first': {
                                lastProduct = ''
                                break
                            }
                            case 'second': {
                                delete lastProduct.sizes
                                delete lastProduct.colors
                                break
                            }
                            case 'third': {
                                delete lastProduct.patterns
                                delete lastProduct.is_on
                                delete lastProduct.is_sale
                                delete lastProduct.price_standard
                                delete lastProduct.price_sale
                                break
                            }
                            default: break
                        }
                        setProductToAdd(lastProduct)
                        alert(result.message)
                        return window.scrollTo(0, 0)
                    }
                    setProductToAdd('')
                    dispatch(setErrorMessage(''))
                    alert('新增成功!')
                    history.push('/admin/product/information')
                })
            }
            default: break
        }
    }

    function checkForm () {
        if(!sizes.every(size => size.size) || !colors.every(color => color.name)) return false
        if(new Set(sizes.map(size => size.size)).size !== sizes.length){
            dispatch(setErrorMessage('尺碼不可重複'))
            return false
        }
        if(new Set(colors.map(color => color.name)).size !== colors.length){
            dispatch(setErrorMessage('名稱不可重複'))
            return false
        }
        return true
    }

    function saveProduct () {
        switch (step) {
            case 1: {
                return setProductToAdd({
                    ...productToAdd,
                    name, gender, category, desc, material, washing, 
                    images: images
                        .filter(image => image.src)
                        .map((image, index) => image.src && ({
                            src: image.src,
                            alt: `${name}_0${index+1}`
                        }))
                })
            }
            case 2: {
                if (checkForm()) {
                    setProductToAdd({
                        ...productToAdd,
                        sizes, colors
                    })
                    return true
                } else {
                    return false
                }
            }
            case 3: {
                setProductToAdd({
                    ...productToAdd,
                    patterns,
                    is_on: isOn,
                    is_sale: isSale,
                    price_standard: priceStandard,
                    price_sale: priceSale
                })
                return true
            }
            default: break
        }
    }

    const handleAddPattern = group => e => {
        switch (e.target.name) {
            case 'size': {
                if(errorMessage === '尺碼不可重複') dispatch(setErrorMessage(''))
                const obj = {size: ''}
                Object.keys(sizeMap[group]).map(ele => (
                    obj[ele] = (ele === 'waist' ? [0, 0] : 0)
                ))
                return setSizes([...sizes, obj])
            }
            case 'color': {
                if(errorMessage === '名稱不可重複') dispatch(setErrorMessage(''))
                return setColors([...colors, {name: '', code: '#000000'}])
            }
            default: break
        }
    }

    const handleDeletePattern = index => e => {
        switch (e.currentTarget.name) {
            case 'size': {
                if(sizes.length === 1) return
                if(errorMessage === '尺碼不可重複') dispatch(setErrorMessage(''))
                return setSizes(sizes.filter((size, i) => i !== index))
            }
            case 'color': {
                if(colors.length === 1) return
                if(errorMessage === '名稱不可重複') dispatch(setErrorMessage(''))
                return setColors(colors.filter((size, i) => i !== index))
            }
            default: break
        }
    }

    return {
        name, 
        gender, 
        category, 
        desc, 
        material, 
        washing, 
        images, 

        sizes, 
        setSizes, 
        colors, 
        setColors, 

        patterns, 
        setPatterns, 

        isOn, 
        setIsOn, 
        isSale, 
        setIsSale, 
        priceStandard, 
        setPriceStandard, 
        priceSale, 
        setPriceSale, 

        handleInputChange, 
        handleSetStep, 
        handleFormSubmit, 
        checkForm, 
        saveProduct, 
        handleAddPattern, 
        handleDeletePattern, 
    }
}