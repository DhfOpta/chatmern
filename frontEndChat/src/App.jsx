import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthRote from './Components/AuthRote'
import Chat from './Components/Chat'
import ControlledAccordions from './Components/ControlledAccordions'
import Login from './Components/Login'
import Logout from './Components/Logout'
import PasswordChng from './Components/PasswordChng'
import PublicRoute from './Components/PublicRoute'
import Register from './Components/Register'
import SearchUser from './Components/SearchUser'
import UserDeshboard from './Components/UserDeshboard'
import UserDetail from './Components/UserDetail'
import UserDp from './Components/UserDp'
import UserSerchFolDetail from './Components/UserSerchFolDetail'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<AuthRote />}>
          <Route path='/' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/UserDp' element={<UserDp />} />
        </Route>
        <Route path='/authDas/' element={<PublicRoute />}>
          <Route path='/authDas/userDashboard/' element={<UserDeshboard />}>
            <Route path='/authDas/userDashboard/' element={<SearchUser />} />
            <Route path='/authDas/userDashboard/UserSerchFolDetail/:id' element={<UserSerchFolDetail />} />

            <Route path='/authDas/userDashboard/UserDetail' element={<UserDetail />} />
            <Route path='/authDas/userDashboard/SettingUserPrfl' element={<ControlledAccordions />} />
            <Route path='/authDas/userDashboard/Chat/:id' element={<Chat />} />
            <Route path='/authDas/userDashboard/UserDp/:chngDp' element={<UserDp />} />
            <Route path='/authDas/userDashboard/PasswordChng' element={<PasswordChng />} />
<Route path='/authDas/userDashboard/Logout' element={<Logout/>}/>
          </Route>

        </Route>
        {/* <Route path='/' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/UserDp' element={<UserDp />} /> */}

        {/* <Route path='/userDashboarrd' element={<UserDeshboard />}>
          <Route path='/userDashboarrd' element={<SearchUser />} />
          <Route path='/userDashboarrd/UserSerchFolDetail/:id' element={<UserSerchFolDetail />} />

          <Route path='/userDashboarrd/UserDetail' element={<UserDetail />} />
          <Route path='/userDashboarrd/SettingUserPrfl' element={<SettingUserPrfl />} />
          <Route path='/userDashboarrd/Chat/:id' element={<Chat />} />

        </Route>
         */}


      </Routes>
      {/*  */}
    </>
  )
}

export default App
