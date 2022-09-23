import React, { useState } from 'react'
import Login from "./Login"
import Signup from './Signup'

function AuthRender() {
    const [page, setPage] = useState("login")
  return (
    <>
        {page === "login" ? <Login setPage={setPage}/> : <Signup setPage={setPage} />}
    </>
  )
}

export default AuthRender