'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail, writeUserData } from '@/firebase/utils'
import { uploadIMG } from '@/firebase/storage'
import { Suspense } from 'react'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
// import Button from '@/components/Button'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import Input from '@/components/Input'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'
import TextEditor from '@/components/TextEditor'
import TextEditorSimple from '@/components/TextEditorSimple'
import InputFlotante from '@/components/InputFlotante'
// import { useSearchParams } from 'next/navigation'






export default function Home() {



    const Button = ({ children }) => {
        return <Suspense ><button className='bg-[#ffbd2f] w-[200px] p-2 rounded-[5px] inline'>
            {children}
        </button></Suspense>
    }
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()

    const [counter, setCounter] = useState([''])

    //    console.log(window.location.href.split('=')[1]) 
    const [textEditor, setTextEditor] = useState(undefined)
    const [textEditor2, setTextEditor2] = useState(undefined)

    // const searchParams = useSearchParams()
    const [query, setQuery] = useState('')

    const [option, setOption] = useState('Seccion')

    const [data, setData] = useState({})
    const [data2, setData2] = useState({})
    const [data3, setData3] = useState({})

    const [dataURL, setDataURL] = useState({})
    const [dataURL2, setDataURL2] = useState({})
    const [check, setCheck] = useState(false)

    function handlerOnChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    function handlerImage(e) {
        setDataURL({
            ...dataURL,
            [e.target.name]: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }



    // --------------------------mini tarjetas 2----------------------------------
    function handlerLess2() {
        let db = { ...data2 };
        delete db[`item${data2 !== undefined && Object.keys(data2).length - 1}`];
        return setData2(db)
    }

    function onChangeHandler2(e, index) {
        setData2({ ...data2, [`item${index}`]: { ...data2[`item${index}`], [e.target.name]: e.target.value } })
    }



    // --------------------------tarjetas 3----------------------------------
    function handlerImage3(e, index) {
        setData3({ ...data3, [`item${index}`]: { ...data3[`item${index}`], file: e.target.files[0] } })
    }
    function onChangeHandler3(e, index) {
        setData3({ ...data3, [`item${index}`]: { ...data3[`item${index}`], [e.target.name]: e.target.value } })
    }
    function onChangeHandler4(e, index) {
        setData3({ ...data3, [`item${index}`]: { ...data3[`item${index}`], paragraph: e } })
    }
    function handlerLess3() {
        let db = { ...data3 };
        delete db[`item${data3 !== undefined && Object.keys(data3).length - 1}`];
        return setData3(db)
    }





    function saveFrontPage(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        if (e.target[0].files[0]) {
            uploadIMG(`/Cliente/${query}`, '/', query, dataURL.file, { ...data, content: textEditor, miniTarjetas: data2 }, setUserSuccess)
        } else {
            writeUserData(`/Cliente/${query}`, { ...data, content: textEditor, miniTarjetas: data2 }, setUserSuccess)
        }
    }
    function saveFrontPage2(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        Object.entries(data3).map(i => {
            let db = { ...i[1] }
            delete db['file']
            if (i[1].file && i[1].file !== undefined) {
                uploadIMG(`/Cliente/${query}/tarjetas/${[i[0]]}`, '/', `/${query}/tarjetas/${[i[0]]}`, i[1].file, db, setUserSuccess)
            } else {
                writeUserData(`/Cliente/${query}/tarjetas`, { [i[0]]: db }, setUserSuccess)
            }
        })
    }


    function addContact(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        const obj = {
            [e.target[0].name]: e.target[0].value,
            [e.target[1].name]: e.target[1].value,
            [e.target[2].name]: e.target[2].value,
            [e.target[3].name]: e.target[3].value,
            [e.target[4].name]: e.target[4].value,
            [e.target[5].name]: e.target[5].value,
            [e.target[6].name]: e.target[6].value,
            [e.target[7].name]: e.target[7].value,
            [e.target[8].name]: e.target[8].value,
            [e.target[9].name]: e.target[9].value,
        }
        writeUserData(`Cliente/contactos/`, obj, setUserSuccess)
    }

    function close(e) {
        // setUserModal(false)
        // setCheck(false)
        router.back()
    }


    // function write () {
    //         userDB && userDB.priceFTL && Object.entries(userDB.priceFTL).map((i, index) => {       
    //             writeUserData(`/priceFTL/${i[0]}`, {['FLETE USD']: 1000})      
    //         })
    // }


    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente])


    useEffect(() => {

        if (Object.keys(data2).length === 0 && cliente && cliente[query] && cliente[query] && cliente[query].miniTarjetas) {
            setData2({ ...cliente[query].miniTarjetas, ...data2, })
        }
        if (Object.keys(data3).length === 0 && cliente && cliente[query] && cliente[query] && cliente[query].tarjetas) {
            setData3({ ...cliente[query].tarjetas, ...data2, })
        }
        if (textEditor == undefined && cliente && cliente[query] && cliente[query] && cliente[query].content) {
            console.log('text')
            setTextEditor(cliente[query].content)
        }
    }, [textEditor, data2, data3, query])

    return (

        <div className="min-h-full">


            <div className="fixed top-0 left-0 flex justify-center w-full h-auto bg-[#000000b4] p-0 z-40 " >

                <div className="relative w-[95%] h-screen overflow-y-scroll lg:w-[50%] bg-white border-b border-gray-900/10 pt-16 pb-16 lg:pb-4 px-5">
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                        X
                    </div>


                    {/* <div className='w-full flex justify-around'>
                        <button className={` py-2 w-full border-[#F1BA06] border-[2px] ${option === 'Seccion' ? 'bg-[#F1BA06]' : ''}`} onClick={() => setOption('Seccion')}>Seccion</button>
                        <button className={`py-2 w-full border-[#F1BA06] border-[2px] ${option === 'Tarjetas' ? 'bg-[#F1BA06]' : ''}`} onClick={() => setOption('Tarjetas')}>Tarjetas</button>
                    </div> */}


                    {option === 'Seccion' && <form className="relative  pt-5" onSubmit={saveFrontPage} >

                        {/* ---------------------------------TARJETAS 2---------------------------------------- */}

                        {/* <div class="inline-flex">
                            <button type='button' class="bg-red-500 text-white font-bold py-2 px-4 rounded-l" onClick={handlerLess2}>
                                -
                            </button>
                            <button type='button' class="bg-green-500 text-white font-bold py-2 px-4 rounded-r" onClick={() => setData2({ ...data2, [`item${data2 !== undefined && Object.keys(data2).length}`]: { ic: '', ip: '' } })} >
                                +
                            </button>
                        </div> */}



                        <div className="sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]">

                            {
                                userDB && userDB.priceFTL && Object.entries(userDB.priceFTL).map((i, index) => {
                                   return <div className='relative p-5 my-5 bg-white space-y-5 shadow-2xl'>
                                        < InputFlotante type="text" id="floating_5" onChange={handlerOnChange} defaultValue={i[1]['ORIGEN']} required label={'ORIGEN'} shadow='shadow-white'/>
                                        < InputFlotante type="text" id="floating_5" onChange={handlerOnChange} defaultValue={i[1]['DESTINO']} required label={'DESTINO'} shadow='shadow-white'/>
                                        < InputFlotante type="number" id="floating_5" onChange={handlerOnChange} defaultValue={i[1]['PESO (KG)']} required label={'PESO (KG)'} shadow='shadow-white'/>
                                        < InputFlotante type="number" id="floating_5" onChange={handlerOnChange} defaultValue={i[1]['VOLUMEN M3']} required label={'VOLUMEN M3'} shadow='shadow-white'/>
                                        < InputFlotante type="number" id="floating_5" onChange={handlerOnChange} defaultValue={i[1]['TIPO DE UNIDAD']} required label={'TIPO DE UNIDAD'} shadow='shadow-white'/>
                                        < InputFlotante type="text" id="floating_5" onChange={handlerOnChange} defaultValue={i[1]['MERCANCIA']} required label={'MERCANCIA'} shadow='shadow-white'/>
                                        < InputFlotante type="number" id="floating_5" onChange={handlerOnChange} defaultValue={i[1]['SERVICIO']} required label={'SERVICIO'} shadow='shadow-white'/>
                                        < InputFlotante type="number" id="floating_5" onChange={handlerOnChange} defaultValue={i[1]['FLETE USD']} required label={'FLETE USD'} shadow='shadow-white'/>
                                        < InputFlotante type="number" id="floating_5" onChange={handlerOnChange} defaultValue={i[1]['SERVICIOS LOGISTICOS USD']} required label={'SERVICIOS LOGISTICOS USD'} shadow='shadow-white'/>
                                        <Button type="submit" theme="Danger">Eliminar</Button>
                                        <Button type="submit" theme="Primary">Guardar</Button>

                                    </div>
                                })
                            }
                        </div>


                        {/* <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Item principal</label>
                                    <input type="text" name={`ip`} onChange={(e) => onChangeHandler2(e, index)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data2[`item${index}`][`ip`]} />
                                    <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Item contenido</label>
                                    <input type="text" name={`ic`} onChange={(e) => onChangeHandler2(e, index)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data2[`item${index}`][`ic`]} />
                               */}


                        {data2 && data2 !== undefined && Object.values(data2).map((i, index) => {
                            return <div className="sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]">
                                <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Origen</label>
                                <input type="text" name={`ip`} onChange={(e) => onChangeHandler2(e, index)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data2[`item${index}`][`ip`]} />
                                <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Destino</label>
                                <input type="text" name={`ic`} onChange={(e) => onChangeHandler2(e, index)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data2[`item${index}`][`ic`]} />










                            </div>
                        })
                        }
                        {/* ----------------------------------------------------------------------------------------- */}

                        <div className="mt-6 flex items-center justify-center gap-x-6">
                            <Button type="submit" theme="Primary">Guardar</Button>
                        </div>

                    </form>}





                </div>

            </div>




            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>



    )
}






