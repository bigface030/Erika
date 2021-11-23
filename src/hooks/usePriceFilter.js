import { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router";

import { LocationContext } from "../pages/ListPage/ListPage";

export default function usePriceFilter() {

  const { pathname, search } = useContext(LocationContext);
  
  const minimum = 300;
  const maximum = 1200;

  const [min, setMin] = useState(minimum);
  const [max, setMax] = useState(maximum);
  const [isDragging, setIsDragging] = useState(false)

  const X = useRef(null);
  const direction = useRef(null);

  const WR = useRef(null);
  const WL = useRef(null);
  const perLeft = useRef(100);
  const perRight = useRef(100);

  const bar = useRef();
  const barSelected = useRef();
  const knobLeft = useRef();
  const knobRight = useRef();

  let newSearch = new URLSearchParams(search);
  const priceParam = newSearch.get('price') || `${minimum}-${maximum}`
  useEffect(() => {
    const minTemp = parseInt(priceParam.split('-')[0])
    const maxTemp = parseInt(priceParam.split('-')[1])
    setMin(minTemp)
    setMax(maxTemp)
    perLeft.current = 100 - (100*(maximum-maxTemp)/(maximum-minimum))
    perRight.current = 100 - (100*(minTemp-minimum)/(maximum-minimum))
    WR.current = perLeft.current * bar.current.offsetWidth / 100
    WL.current = perRight.current * bar.current.offsetWidth / 100
    barSelected.current.style.right = `${100 - perLeft.current}%`;
    barSelected.current.style.left = `${100 - perRight.current}%`;
    knobLeft.current.style.right = `${perRight.current}%`;
    knobRight.current.style.left = `${perLeft.current}%`;
  }, [priceParam])

  const history = useHistory()

  const handleMouseDown = e => {
    X.current = e.pageX;
    if(e.target === knobRight.current){
      direction.current = 'R';
    } else if(e.target === knobLeft.current){
      direction.current = 'L';
    }
    if(WR.current === null){
      WR.current = bar.current.offsetWidth;
    }
    if(WL.current === null){
      WL.current = bar.current.offsetWidth;
    }
    setIsDragging(true)
  }

  const handleMouseMove = e => {
    if(X.current && isDragging){
      e.preventDefault();
      if(direction.current === 'R'){
        let per = ((WR.current - X.current + e.pageX)/bar.current.offsetWidth * 100);
        if(per > 100) per = 100;
        if(per < 100 - perRight.current) per = 100 - perRight.current;
        knobRight.current.style.left = `${per}%`;
        barSelected.current.style.right = `${100 - per}%`;
        perLeft.current = per;
        setMax(Number((maximum - (maximum - minimum) * (100 - per) / 100).toFixed(0)));
      }
      if(direction.current === 'L'){
        let per = ((WL.current + X.current - e.pageX)/bar.current.offsetWidth * 100);
        if(per > 100) per = 100;
        if(per < 100 - perLeft.current) per = 100 - perLeft.current;
        knobLeft.current.style.right = `${per}%`;
        barSelected.current.style.left = `${100 - per}%`;
        perRight.current = per;
        setMin(Number((minimum + (maximum - minimum) * (100 - per) / 100).toFixed(0)));
      }
    }
  }

  const handleMouseUp = e => {
    if(isDragging) {
      if(direction.current === 'R'){
        if(!barSelected.current.offsetWidth){
          WR.current = knobRight.current.offsetLeft
        }else{
          WR.current = WR.current - X.current + e.pageX;
        }
        if(WR.current > bar.current.offsetWidth){
          WR.current = bar.current.offsetWidth
        }
      }
      if(direction.current === 'L'){
        if(!barSelected.current.offsetWidth){
          WL.current = bar.current.offsetWidth - knobRight.current.offsetLeft
        }else{
          WL.current = WL.current + X.current - e.pageX;
        }
        if(WL.current > bar.current.offsetWidth){
          WL.current = bar.current.offsetWidth
        }
      }
      setIsDragging(false)

      let newSearch = new URLSearchParams(search);
      const priceParam = newSearch.get('price');
    
      if (priceParam) {
        newSearch.set('price', `${min}-${max}`)
      } else {
        newSearch.append('price', `${min}-${max}`)
      }

      if (newSearch.has('page')) {
        newSearch.delete('page')
      }
    
      const priceURL = `${pathname}?${newSearch}`

      history.push(priceURL)
    }
  }

  const handleMouseLeave = e => {
    if(isDragging) {
      if(direction.current === 'R'){
        if(!barSelected.current.offsetWidth){
          WR.current = knobRight.current.offsetLeft
        }else{
          WR.current = WR.current - X.current + e.pageX;
        }
        if(WR.current > bar.current.offsetWidth){
          WR.current = bar.current.offsetWidth
        }
      }
      if(direction.current === 'L'){
        if(!barSelected.current.offsetWidth){
          WL.current = bar.current.offsetWidth - knobRight.current.offsetLeft
        }else{
          WL.current = WL.current + X.current - e.pageX;
        }
        if(WL.current > bar.current.offsetWidth){
          WL.current = bar.current.offsetWidth
        }
      }
      setIsDragging(false)

      let newSearch = new URLSearchParams(search);
      const priceParam = newSearch.get('price');
    
      if (priceParam) {
        newSearch.set('price', `${min}-${max}`)
      } else {
        newSearch.append('price', `${min}-${max}`)
      }

      if (newSearch.has('page')) {
        newSearch.delete('page')
      }
    
      const priceURL = `${pathname}?${newSearch}`

      history.push(priceURL)
    }
  }

  return {
    bar,
    barSelected,
    knobLeft,
    knobRight,

    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,

    min,
    max,
    isDragging
  };
}