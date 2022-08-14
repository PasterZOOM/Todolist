import {Navigate, Route, Routes} from 'react-router-dom'
import {Body} from 'common/components/Body/Body'
import React from 'react'
import {Login} from 'features/Auth/Login'

export const RoutPages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Body/>}/>
      <Route path={'/login'} element={<Login/>}/>

      <Route path="/404"
             element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
      <Route path="*" element={<Navigate to={'/404'}/>}/>
    </Routes>)
}