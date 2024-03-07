import React from 'react'
import { LiaUserCircle, LiaAngleRightSolid } from "react-icons/lia";

const Question = () => {
  return (
    <a href="#" className='text-decoration-none text-black'>
      <hr />
      <div className='d-flex  align-items-center  justify-content-between'>

        <div className='d-md-flex align-items-center gap-4'>
          {/* user */}
          <div className='d-flex flex-column align-items-center'>
            <div>
              <LiaUserCircle size={100} />
            </div>
            <div>Eliyas</div>
          </div>
          {/* question */}
          <div>
            <p>What is the best way to learn programming?</p>
          </div>
        </div>

        <div>
          <LiaAngleRightSolid size={30} />
        </div>

      </div>

    </a>
  )
}

export default Question