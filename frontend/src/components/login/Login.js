// import sideImage from './res/side-pic.png'

// import sideImage2 from './res/Santasoft-logo-black.png'

// import Footer from './Footer'
import Form from './Form'
import './Login.css'

function Login({ login, error, setError, onChangePasswordClick }) {

  return (
    <div className='Main_Box'>

      {/* <div></div> */}

      <div className='Sub_Box'>
        {/* <div className='Sider_L'>
          <img src={sideImage} alt="SantaSoft (Private) Limited" className='Sider_L_Image'/>
        </div> */}
        <div className='Sider_R'>
          <Form login={login} error={error} setError={setError} onChangePasswordClick={onChangePasswordClick}/>
        </div>
        
      </div>

      {/* <div></div> */}

      {/* <Footer/> */}
    </div>
  )
}

export default Login