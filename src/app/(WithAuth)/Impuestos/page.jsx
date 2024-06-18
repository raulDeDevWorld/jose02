'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail } from '@/firebase/utils'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Error from '@/components/Error'
import BottomNavigation from '@/components/BottomNavigation'
import InputEspecial from '@/components/InputEspecial'
import mercancias from '@/db/mercancias.json'
import { useRouter } from 'next/navigation';
import SelectSimple from '@/components/SelectSimple'
import InputFlotante from '@/components/InputFlotante.jsx'

export default function Home() {
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
    const [option, setOption] = useState('Seccion')
    const router = useRouter()
    const [data, setData] = useState({})
    const [selectValue, setSelectValue] = useState('Terrestre')
    const inputRef = useRef('')

    function onChangeHandler(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function formHandler(e) {
        e.preventDefault()
        console.log('hello')
        // console.log(inputRef.current)
    }

    function handlerClickSelect(name, i, uuid) {
        setSelectValue(i)
        let db = { transporte: i }
        setData(db)
    }
    function handlerSelect(i) {
        inputRef.current.value = i
        setData({ ...data, mercancia: i })
    }
    console.log(data)
    console.log(mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {}))
    // console.log(mercancias[data.mercancia])
    // useEffect(() => {
    //     setData({
    //         ['transporte porcentaje']: data[`Transporte ${data.transporte} valor`] * (25 / 100),
    //     })
    //     setData({
    //         ['CIF FRONTERA']: data[`Valor FOB`] * 1 + data['transpoete porcentaje'] + 10,
    //     })
    //     data.mercancia &&  setData({
    //         ['GA']: data['CIF FRONTERA'] * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100),
    //     })
    //     data.mercancia &&  setData({
    //         ['BASE IMPONIBLE IVA']: data['CIF FRONTERA'] + data['GA']
    //     })  
    //     data.mercancia && setData({
    //         ['IVA']: data['GA'] * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)
    //     })
    // }, [data])
    useEffect(() => {
        user === undefined && onAuth(setUserProfile)
        if (user !== undefined && user !== null) router.replace('/')
    }, [user])
    return (
        <div className="h-full "
            style={{
                backgroundImage: 'url(/gif.gif)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover'
            }}>

            <div className=' w-screen pt-[50px] min-h-screen bg-gradient-to-t from-[#00061860] to-[#000618d1] flex flex-col justify-center items-center  z-10'>

                <img src="/airplane-bg.jpg" className='fixed top-0 w-screen h-screen  object-cover ' alt="" />
                <div className='w-full text-center flex justify-center'>
                    <img src="/logo.svg" className='w-[300px] z-10' alt="User" />
                </div>

                <div className='relative bg-[#ffffff] rounded-[10px] p-10 m-[10px] min-h-[600px] md:min-h-[540px]'>

                    <form className={`relative space-y-6 w-[100%]  z-10 `} >
                        <h5 className="text-[16px] text-center font-bold text-[#636363] z-[50]">IMPUESTOS DE IMPORTACION</h5>
                        <InputEspecial data={mercancias} node={'MERCANCIA'} inputRef={inputRef} focusTxt='MERCANCIA' id='floating_1' select={handlerSelect}></InputEspecial>
                        <SelectSimple arr={['Terrestre', 'Maritimo', 'Aereo']} name='transporte' click={handlerClickSelect} defaultValue={selectValue} uuid='8768798'></SelectSimple>
                        <InputFlotante type="number" id="floating_3" onChange={onChangeHandler} defaultValue={data['Valor FOB']} required label={'Valor FOB'} />
                        {
                            data.transporte && <>
                                <InputFlotante type="number" id="floating_4" onChange={onChangeHandler} defaultValue={data.transporte} required label={`Transporte ${data.transporte} valor`} />
                            </>
                        }
                        <table>
                            <tbody>
                                <tr>
                                    <td>MERCANCIA</td>
                                    <td>{data.mercancia}</td>
                                </tr>
                                <tr>
                                    <td>TIPO DE TRANSPORTE</td>
                                    <td>{data.transporte}</td>
                                </tr>
                                <tr>
                                    <td>VALOR FOB</td>
                                    <td>{data['Valor FOB']}</td>
                                </tr>
                                <tr>
                                    <td>{(`Transporte ${data.transporte} valor`).toUpperCase()}</td>
                                    <td>{data[`Transporte ${data.transporte} valor`]}</td>
                                </tr>
                                <tr>
                                    <td>{(`Transporte ${data.transporte} valor %`).toUpperCase()}</td>
                                    <td>{data[`Transporte ${data.transporte} valor`] * (25 / 100)}</td>
                                </tr>
                                <tr>
                                    <td>SEGURO</td>
                                    <td>{data['transporte']}</td>
                                </tr>
                                <tr>
                                    <td>CIF FRONTERA</td>
                                    <td>{data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10}</td>
                                </tr>
                                <tr>
                                    <td>GA</td>
                                    <td>{data.mercancia && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100)}</td>
                                </tr>
                                <tr>
                                    <td>BASE IMPONIBLE IVA</td>
                                    <td>{data.mercancia && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100))}</td>
                                </tr>
                                <tr>
                                    <td>IVA</td>
                                    <td>{data.mercancia && ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100))) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)}</td>
                                </tr>
                                <tr>
                                    <td>USO DE SISTEMA</td>
                                    <td>15</td>
                                </tr>
                                <tr>
                                    <td>TOTAL IMPUESTOS</td>
                                    <td>{data.mercancia && ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100))) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)) + 15}</td>
                                </tr>
                                <tr>
                                    <td>ALMACENAJE 0,57%CIF</td>
                                    <td>{(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (.57 / 100)}</td>
                                </tr>
                                <tr>
                                    <td>COMISION AGENCIA</td>
                                    <td>
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 0 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 1001 && '20 USD'}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 1000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 10001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (2 / 100)}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 10000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 20001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (1.5 / 100)}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 20000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 30001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (1.25 / 100)}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 30000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 50001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (1 / 100)}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 50000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 100001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (0.75 / 100)}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 100000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 1000000000000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (0.5 / 100)}

                                    </td>
                                </tr>
                                <tr>
                                    <td>GASTOS DE DESPACHO</td>
                                    <td>50 USD</td>
                                </tr>
                                <tr>
                                    <td>TOTAL DESPACHO ADUANERO</td>
                                    <td>
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 0 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 1001 && 20 + 50}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 1000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 10001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (2 / 100) + 50}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 10000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 20001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (1.5 / 100) + 50}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 20000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 30001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (1.25 / 100) + 50}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 30000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 50001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (1 / 100) + 50}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 50000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 100001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (0.75 / 100) + 50}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 100000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 1000000000000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (0.5 / 100) + 50} USD


                                    </td>
                                </tr>
                                <tr>
                                    <td>TOTAL COSTOS IMPORTACION</td>
                                    <td>
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 0 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 1001 && 20 + 50 + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (.57 / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100))) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)) + 15)}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 1000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 10001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (2 / 100) + 50 + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (.57 / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100))) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)) + 15)}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 10000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 20001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (1.5 / 100) + 50 + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (.57 / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100))) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)) + 15)}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 20000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 30001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (1.25 / 100) + 50 + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (.57 / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100))) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)) + 15)}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 30000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 50001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (1 / 100) + 50 + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (.57 / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100))) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)) + 15)}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 50000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 100001 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (0.75 / 100) + 50 + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (.57 / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100))) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)) + 15)}
                                        {(data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) > 100000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) < 1000000000000 && (data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (0.5 / 100) + 50 + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (.57 / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100)) + (((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) + ((data[`Valor FOB`] * 1 + data[`Transporte ${data.transporte} valor`] * (25 / 100) + 10) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['G.A. %'] / 100))) * (mercancias.reduce((acc, i) => { return { ...acc, [i.MERCANCIA]: i } }, {})[data.mercancia]['IVA %'] / 100)) + 15)} USD

                                    </td>
                                </tr>
                            </tbody>
                        </table>

















                        {/* 
                        <InputFlotante type="number" id="floating_5" onChange={onChangeHandler} defaultValue={data['Transporte terrestre %']} required label={'Transporte terrestre %'} />
                        <InputFlotante type="number" id="floating_6" onChange={onChangeHandler} defaultValue={data['CIF frontera']} required label={'CIF frontera'} />
                        <InputFlotante type="number" id="floating_7" onChange={onChangeHandler} defaultValue={data['GA']} required label={'GA'} />
                        <InputFlotante type="number" id="floating_8" onChange={onChangeHandler} defaultValue={data['BASE IMPONIBLE IVA']} required label={'BASE IMPONIBLE IVA'} />
                        <InputFlotante type="number" id="floating_4" onChange={onChangeHandler} defaultValue={data['IVA']} required label={'IVA'} />
                        <InputFlotante type="number" id="floating_4" onChange={onChangeHandler} defaultValue={data['USO DE SISTEMA']} required label={'USO DE SISTEMA'} />
                        <InputFlotante type="number" id="floating_4" onChange={onChangeHandler} defaultValue={data['TOTAL IMPUESTOS']} required label={'TOTAL IMPUESTOS'} />
                        <InputFlotante type="number" id="floating_4" onChange={onChangeHandler} defaultValue={data['ALMACENAJE 0,57%CIF']} required label={'ALMACENAJE 0,57%CIF'} />
                        <InputFlotante type="number" id="floating_4" onChange={onChangeHandler} defaultValue={data['COMISION AGENCIA']} required label={'COMISION AGENCIA'} />
                        <InputFlotante type="number" id="floating_4" onChange={onChangeHandler} defaultValue={data['GASTOS DE DESPACHO']} required label={'GASTOS DE DESPACHO'} />
                        <InputFlotante type="number" id="floating_4" onChange={onChangeHandler} defaultValue={data['TOTAL DESPACHO ADUANERO']} required label={'TOTAL DESPACHO ADUANERO'} />
                        <InputFlotante type="number" id="floating_4" onChange={onChangeHandler} defaultValue={data['TOTAL COSTOS IMPORTACION']} required label={'TOTAL COSTOS IMPORTACION'} /> */}

                        <Button theme="Primary" click={formHandler} >CALCULAR</Button>
                    </form>
                </div>


            </div>

            {success == 'AccountNonExist' && <Error>Cuenta inexistente</Error>}
            {success == 'Complete' && <Error>Complete el formulario</Error>}
        </div >
    )
}





