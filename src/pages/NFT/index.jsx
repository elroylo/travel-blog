import React, { ReactNode, useState } from 'react';
import styles from './nft.module.scss'
import { useMoralis } from 'react-moralis'
import { BannerStrip } from 'web3uikit'

export default function NFTsMinter() {

    let [place, setPlace] = useState('')
    let [desc, setDesc] = useState('')
    let [file, setFile] = useState()
    let [banner, setBanner] = useState(<></>)
    let { Moralis, user } = useMoralis()


    async function handleSubmit(e) {
        e.preventDefault()
        let moralisNFTImage = new Moralis.File(file.name, file)
        await moralisNFTImage.saveIPFS()
        let NFTHash = await moralisNFTImage.getData()
        let imageHash = await moralisNFTImage.url()
        console.table({
            meta: NFTHash,
            imgURL: imageHash
        })

        let metadata = {
            name: place,
            description: desc,
            image: imageHash
        }

        const jsonFile = new Moralis.File(
            "metadata.json",
            { base64: btoa(JSON.stringify(metadata)) }
        )

        await jsonFile.saveIPFS()
        let metadataHash = await jsonFile.getData()
        let metadataURL = await jsonFile.url()
        console.log(metadataHash)


        let mintedNFT = await Moralis.Plugins.rarible.lazyMint({
            chain: 'rinkeby',
            userAddress: user?.get('ethAddress'),
            tokenType: 'ERC721',
            tokenUri: metadataURL,
        })

        let tokenAddress = mintedNFT.data.result.tokenAddress
        tokenAddress = String(tokenAddress).toLowerCase()
        let tokenID = mintedNFT.data.result.tokenId

        let url = `https://rinkeby.rarible.com/token/${tokenAddress}:${tokenID}?tab=details`
        setBanner(<BannerStrip text={`Visit your custom NFT at ${url}`} />)

        console.log(mintedNFT)
    }

    return (
        <div className={styles.container}>
            <div>
                <label className={styles.label}>
                    Place Name:
                </label>
                <input className={styles.input} value={place} onChange={e => setPlace(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>
                    Description:
                </label>
                <input className={styles.input} value={desc} onChange={e => setDesc(e.target.value)} />
            </div>
            <div>
                <label className={styles.label}>
                    Image:
                </label>
                <input style={{ marginTop: '20px', marginBottom: '20px' }} className={styles.file} type={'file'} onChange={e => setFile(e.currentTarget.files[0])} />
            </div>
            <button type='submit' className={styles.submit} onClick={e => handleSubmit(e)}>
                Submit
            </button>
            <div>
                {banner}
            </div>
        </div>
    )
}