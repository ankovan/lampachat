import './Navbar.scss';
import ChatMenu from './ChatMenu';
function Navbar() {
  return(
    <div className="navbar-content">
      <div>lampachat</div>
      <ChatMenu/>
    </div>
  )
}
export default Navbar