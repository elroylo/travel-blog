import { Formik } from 'formik'
import { useMoralis } from 'react-moralis'
import { useState } from 'react'
import styles from './create_blog.module.scss'

export default function CreateBlogPage() {
    let { user, Moralis } = useMoralis()
    let [cover, setCover] = useState()

    return (
        <Formik
            initialValues={{
                content: '',
                title: ''
            }}
            validator={() => ({})}
            onSubmit={async (values, helpers) => {
                // helpers.setSubmitting(true)
                // let uid = user.get('ethAddress')
                // let coverImg = new Moralis.File(cover.name, cover)
                // coverImg.saveIPFS()
                // let coverURL = coverImg.url()
                // let headers = new Headers()
                // headers.append('Content-Type', 'application/json')
                // let body = await JSON.stringify({
                //     cover: coverURL,
                //     content: values.content,
                //     title: values.title,
                //     uid
                // })
                // console.table(body)
                // console.table(headers)
                // await fetch('', {
                //     body,
                //     method: 'POST'
                // })
                // helpers.setSubmitting(false)
            }}
        >
            {({ handleSubmit, handleChange, onSubmit, values }) => {
                async function submit() {
                    let uid = user.get('ethAddress')
                    let coverImg = new Moralis.File(cover.name, cover)
                    await coverImg.saveIPFS()
                    let coverURL = await coverImg.ipfs()
                    let headers = new Headers()
                    headers.append('Content-Type', 'application/json')
                    let body = JSON.stringify({
                        cover: coverURL,
                        content: values.content,
                        title: values.title,
                        uid
                    })
                    console.log(body)
                    console.log(headers.get('Content-Type'))
                    await fetch('', {
                        body,
                        method: 'POST'
                    })
                }
                return (
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div
                            className={styles.group}
                        >
                            <label htmlFor='title'>
                                Title:
                            </label>
                            <input
                                type='text'
                                onChange={handleChange}
                                values={values.title}
                                name='title'
                            />
                        </div>
                        <div
                            className={styles.group}
                        >
                            <label htmlFor='content'>
                                Content:
                            </label>
                            <input
                                type='text'
                                onChange={handleChange}
                                name='content'
                                value={values.content}
                            />
                        </div>
                        <div
                            className={styles.group}
                        >
                            <label htmlFor='cover'>
                                Cover:
                            </label>
                            <input
                                type='file'
                                onChange={e => setCover(e.target.files[0])}
                                name='cover'
                            />
                        </div>
                        <button className={styles.submit} type='submit' onClick={() => submit()} >
                            Submit
                        </button>
                    </form>
                )
            }}
        </Formik>
    )
}