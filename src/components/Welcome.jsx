import React from 'react'

const Welcome = (props) => {
  return (
    <>
      <div className='container d-flex flex-column justify-content-center align-items-center m-auto p-5'>
        <h1>Welcome User</h1>

        <h4>Press start to continue to the survey</h4>

        <button className='btn btn-success' onClick={() => props.setStart(true)}>
          Start
        </button>
      </div>
    </>
  );
}

export default Welcome