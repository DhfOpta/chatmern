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
        <Route path='/Regiter' element={<AuthRote />}>
          <Route path='/Regiter/' element={<Register />} />
          <Route path='/Regiter/Login' element={<Login />} />
          <Route path='/Regiter/UserDp' element={<UserDp />} />
        </Route>
        <Route path='/' element={<PublicRoute />}>
          <Route path='/userDashboard/' element={<UserDeshboard />}>
            <Route path='/userDashboard/' element={<SearchUser />} />
            <Route path='/userDashboard/UserSerchFolDetail/:id' element={<UserSerchFolDetail />} />

            <Route path='/userDashboard/UserDetail' element={<UserDetail />} />
            <Route path='/userDashboard/SettingUserPrfl' element={<ControlledAccordions />} />
            <Route path='/userDashboard/Chat/:id' element={<Chat />} />
            <Route path='/userDashboard/UserDp/:chngDp' element={<UserDp />} />
            <Route path='/userDashboard/PasswordChng' element={<PasswordChng />} />
<Route path='/userDashboard/Logout' element={<Logout/>}/>
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
