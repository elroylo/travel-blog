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
                    // let uid = user.get('ethAddress')
                    // let headers = new Headers()
                    // headers.append('Content-Type', 'application/x-www-form-urlencoded')
                    // let formBody = new FormData()
                    // formBody.append("cover", cover)
                    // formBody.append("content", values.content)
                    // formBody.append("title", values.title)
                    // formBody.append("uid", uid)
                    // await fetch('https://travel-blog.epiccodewizard2.repl.co/blogs/add', {
                    //     body: formBody,
                    //     method: 'POST',
                    //     headers
                    // })
                    let PublicKey = "BC1YLgnBLqAtcZxNhOrWewTe9w25BaLpXQFAGtqpvcowDEGCUBnsffB";
                    let JWT = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTQ0MTE5OTEsImV4cCI6MTY1NDQxMjU5MX0.I01LQjCO0DdbAqO0M_p0ZaQmuF4AsPAflp7_YWvR5uukQkuo55yWhihF7-sfU4kl0kLUCVVrBaDQhYF742kqMQ.eyJpYXQiOjE2NTQOMTEOMzkslmV4CCI6MTY1NDQxMjAzOX0.8t|ZPC218CHIgNxKTtx8jimmi3wOfVUSSDDr2KsKahwJulSdsSLYRKSxGolxbCmlo_LvJNICOPRNeTfPcg";

                    var myHeaders = new Headers();
                    var formdata = new FormData();
                    formdata.append("UserPublicKeyBase58Check", PublicKey);
                    formdata.append("JWT", JWT);
                    formdata.append("file", cover, "[PROXY]");

                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                    };

                    let uid = user.get('ethAddress')
                    let coverImg = new Moralis.File(cover.name, cover)
                    await coverImg.saveIPFS()
                    let coverURL = await coverImg.ipfs()
                    let headers = new Headers()
                    headers.append('Content-Type', 'application/json')
                    let body = JSON.stringify({
                        cover: await fetch("https://node.deso.org/api/v0/upload-image", requestOptions).then(response => response.text()),
                        content: values.content,
                        title: values.title,
                        uid
                    })
                    console.log(body)
                    console.log(headers.get('Content-Type'))
                    await fetch('https://travel-blog.epiccodewizard2.repl.co/blogs/add', {
                        body,
                        method: 'POST',
                        headers
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
                            <textarea
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