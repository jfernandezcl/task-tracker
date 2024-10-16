import '../styles/Login.css'

function Login() {
  return (
    <section>
      <form className='container-form'>
        <h1 className='title-login'>Login Here</h1>
        <div>
          <label>Username
            <input className='input-form' type="text" placeholder="Enter your name" />
          </label>
        </div>

        <div>
          <label>Password
            <input className='input-form' type="text" placeholder="Enter your password" />
          </label>
        </div>

        <div>
          <button>Log In</button>
        </div>
        <div>
          <button>Register</button>
        </div>
      </form>
    </section>
  )
}

export default Login