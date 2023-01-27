import { Outlet } from 'react-router-dom'
import Header from '../components/user/Header/Header'
import './HomePage.css'

function HomePage() {
  return (
    <div className='home-container'>
        <Header/>
        <Outlet></Outlet>
    </div>
  )
}

export default HomePage
