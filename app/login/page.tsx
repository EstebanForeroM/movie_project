const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex relative my-10 w-[800px] h-96 border-2 border-pink-500
        flex-col rounded-2xl p-5">

        <h4 className="h4 mb-5">
          Login to ... 
        </h4>

        <h5 className="h5 relative">UserName</h5>
        <input type="text" className="border border-border rounded-xl bg-gray-950 relative py-2 px-2 mt-5 mb-5 outline-none
          text-gray-400 placeholder:text-gray-900" placeholder="put your username"/>

        <h5 className="h5 relative">password</h5>
        <input type="text" className="border border-border rounded-xl bg-gray-950 relative py-2 px-2 mt-5 mb-5 outline-none 
          text-gray-400 placeholder:text-gray-900" placeholder="put your password"/>

        <button className="">
          Submit
        </button>
      </div>
    </div>
  )
}

export default Login
