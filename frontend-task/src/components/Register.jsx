function Register() {
  return (
    <section className='container'>
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form className='container-form'>
        <h1 className='title-login'>Register</h1>
        <label className='title-label'>Username</label>

        <div className='input-name'>
          <input className='input-form' type="text" placeholder="Enter your name" />
        </div>

        <label className='title-label'>Password</label>
        <div>
          <input className='input-form' type="text" placeholder="Enter your password" />
        </div>

        <div className='container-buttons'>
          <button className='form-buttons'>Log In</button>
        </div>
        <div className='container-buttons'>
          <button className='form-buttons'>Register</button>
        </div>
      </form>
    </section>
  )
}

export default Register