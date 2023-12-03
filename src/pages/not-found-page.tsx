import { Link } from 'react-router-dom';

function Notfoundpage() {
  return (
    <div>
      This page doesn&apos;t exist. Go <Link to="/">home</Link>
    </div>
  );
}

export default Notfoundpage;
