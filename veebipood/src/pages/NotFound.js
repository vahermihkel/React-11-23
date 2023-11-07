import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
      <div>Lehte ei leitud</div>
      <Link to="/avaleht">
        <button>Avalehele</button>
      </Link>
    </div>
  )
}

export default NotFound