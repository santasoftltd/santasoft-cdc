import sideImage from './res/side-pic.png'
import Footer from './Footer'
import Form from './Form'
import './Login.css'

function Login({login, error}) {
  return (
    <div className='Main_Box'>
      <div className='Sider_L'>
        <img src={sideImage} alt="SantaSoft (Private) Limited" width='110%'/>
      </div>
      <Form className='Sider_R' login={login} error={error}/>
      <Footer/>
    </div>
  )
}

export default Login