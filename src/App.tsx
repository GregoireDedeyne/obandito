
import { Cards } from './components/Cards'
import { CreateAccountForm } from './components/CreateAccountForm'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm'
import { NavBar } from './components/NavBar'
import './styles/App.scss'

export default function App() {
  return (
    <div className='h-screen	' >
     <Header />
     <LoginForm onSubmit={""} />
     {/* <CreateAccountForm onSubmit={""}/> */}
     {/* <NavBar /> */}
     {/* <Cards /> */}
     <Footer />
    </div>
  )
}