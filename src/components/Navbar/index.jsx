import { Link, useNavigate } from 'react-router-dom'
import { ConnectButton } from 'web3uikit'
import { TiWeatherPartlySunny } from "react-icons/ti";


export default function Navbar() {
  let navigate = useNavigate()
  return (
    <nav class="flex items-center justify-between flex-wrap bg-green-300 p-6">
      <div onClick={() => navigate('/')} class="flex items-center flex-shrink-0 text-white mr-6">
        <TiWeatherPartlySunny></TiWeatherPartlySunny>
        <span class="font-semibold text-xl tracking-tight"> Travel Time</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">

        <div class="text-sm lg:flex-grow">

          <ul class="menu menu-horizontal flex p-4">
            <li>

              <Link to='/blog/create' className='hover:text-green-700 hover:font-bold px-3'>
                Create a Blog
              </Link><t> </t>

              <Link to='/blog/view' className='hover:text-green-700 hover:font-bold hover:px-3'>
                View Blogs
              </Link> <t> </t>

              <Link to='/maps' className='hover:text-green-700 hover:font-bold px-3'>
                Maps
              </Link> <t></t>

              <Link to='/maps' className='hover:text-green-700 hover:font-bold px-3'>
                Leaderboard
              </Link> <t></t>

              <Link to='/nft' className='hover:text-green-700 hover:font-bold px-3'>
                NFTs
              </Link> <t> </t>

              <Link to='/parks' className='hover:text-green-700 hover:font-bold hover:px-3'>
                Parks
              </Link> <t> </t>
            </li>
          </ul>

        </div>
        <div>
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}