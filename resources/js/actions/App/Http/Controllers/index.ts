import Auth from './Auth'
import ClientsController from './ClientsController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    ClientsController: Object.assign(ClientsController, ClientsController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers