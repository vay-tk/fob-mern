import React from 'react'

const Videos = () => {
  return (
    <>
    <main class="video-container">
        <h1>Video Gallery</h1>
        <div class="video-grid">
            <div class="video-wrapper">
                <iframe src="https://www.youtube.com/embed/EgDmCbhmstU" 
                        title="Road Safety Video 1" 
                        allowfullscreen></iframe>
            </div>
            <div class="video-wrapper">
                <iframe src="https://www.youtube.com/embed/y5vgURdHEyU" 
                        title="Road Safety Video 2" 
                        allowfullscreen></iframe>
            </div>
            <div class="video-wrapper">
                <iframe src="https://www.youtube.com/embed/y5vgURdHEyU" 
                        title="Road Safety Video 3" 
                        allowfullscreen></iframe>
            </div>
        </div>
    </main>
    </>
  )
}

export default Videos