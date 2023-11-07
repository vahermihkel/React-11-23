import React from 'react'
import { Link } from 'react-router-dom'

function Ostukorv() {
  return (
    <div>
      <div>Ostukorv on tühi</div>
      <Link to="/avaleht">
        <button>Tooteid lisama</button>
      </Link>
    </div>
  )
}

export default Ostukorv