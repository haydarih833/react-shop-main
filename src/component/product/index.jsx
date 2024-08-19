import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import Slider from '@mui/material/Slider';
import Card from '../card';
import Browse from '../browse';
import { useNavigate, useParams } from 'react-router-dom';
import imageLoading from '../../img/Spinner@1x-1.0s-200px-200px.gif'

export default function Product({ category }) {
    const { id } = useParams();
    const navigate = useNavigate()
    const [hasLoading, setHasLoading] = useState()
    useEffect(() => {
        setHasLoading(true)
        fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`)
            .then(res => res.json())
            .then(json => {
                setCategory(json)
                setHasLoading(false)
            });
    }, [id]);
    const [Category, setCategory] = useState([])
    const [value, setValue] = useState([0, 200])
    const handlerange = (event, newValue) => {
        setValue(newValue)

    }
    let range = Category.filter(item => item.price >= value[0] && item.price <= value[1]);
    const handleclick = () => {
        navigate('/')
    }
    return (
        <div className='container-fluid mx-auto' id='width'>
            <div className='d-flex mt-3'><a className='text-decoration-none text-dark' onClick={handleclick}>Home</a> <span className='px-2'> {'>'}  </span><p>{category[id - 1] === undefined ? 1 : category[id - 1].name}</p></div>
            <div className='d-flex justify-content-between'>
                <div className='d-none w-25 d-lg-block'>
                    <div><p className='fs-4'>Browse by</p></div>
                    <hr className='w-50' />
                    <div className='row '>
                        {
                            category.map(item => {
                                return <Browse {...item} />

                            })
                        }
                    </div>
                    <div><p className='fs-4'>Filter by</p></div>
                    <hr className='w-50' />
                    <div>
                        <div className='w-50'>
                            <Slider
                                getAriaLabel={() => 'price range'}
                                value={value}
                                onChange={handlerange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={200}
                            />

                        </div>
                        <div className='w-50 d-flex justify-content-between'>
                           ${value[0]}
                            <div>${value[1]}</div>
                        </div>
                    </div>
                </div>

                <div className='w-75 mx-auto'>
                    {hasLoading ?
                        <div className=' d-flex justify-content-center '> <img src={imageLoading} /></div>
                        :
                        <>
                            <div className='fs-1 fw-bold' ><p>{category[id - 1] !== undefined && category[id - 1].name}</p></div>
                            <div className='d-flex text-secondary justify-content-between'><p>{Category.length} product</p> <p className='f-underline'>Filter & Sort</p></div>

                            <div className="row row-cols-2 row-cols-lg-4 h-75">
                                {
                                    range.map((product) => {
                                        return <Card key={product.id} {...product} />

                                    })
                                }
                            </div>
                        </>
                    }
                </div>

            </div>
        </div>
    )
}


