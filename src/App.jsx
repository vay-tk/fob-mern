import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import SuccessStory from './components/SuccessStory'
import Footer from './components/Footer'
import Report from './components/Report'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
      <main>
        <section class="hero">
            <div class="slideshow">
                <div class="slide active">
                    <img src="https://media.istockphoto.com/id/1464033994/vector/pedestrian-bridge-over-the-road-in-the-city.jpg?s=612x612&w=0&k=20&c=4sXjrCrVqy48kPNddJQlP6oxWfRAxkTfW3t8BoJr6j8=" alt="FOB Image 1"/>
                </div>
                <div class="slide">
                    <img src="https://i0.wp.com/indiairf.com/wp-content/uploads/2021/04/2.jpg?fit=800%2C485&ssl=1" alt="FOB Image 2"/>
                </div>
                <div class="slide">
                    <img src="https://i0.wp.com/indiairf.com/wp-content/uploads/2021/04/22.jpg?fit=800%2C483&ssl=1" alt="FOB Image 3"/>
                </div>
                <button class="slide-btn prev" aria-label="Previous slide">❮</button>
                <button class="slide-btn next" aria-label="Next slide">❯</button>
            </div>
        </section>

        <section class="quick-actions">
            <div class="action-card">
                <h3>Report an Issue</h3>
                <p>Found a problem? Report here and we'll take care of it.</p>
                <a href="/report.html" class="btn">Report Now</a>
            </div>
           
            <div class="action-card">
                <h3>Make Suggestions</h3>
                <p>Help us improve FOB facilities with your suggestions.</p>
                <a href="/suggestions.html" class="btn">Suggest Now</a>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="section">
                    <div class="letters">F</div>
                    <div class="card">Ensuring safer pedestrian movement across busy roads and railway tracks, Foot Over Bridges (FOBs) serve as essential infrastructure for urban mobility.</div>
                </div>
                <div class="section o-reverse">
             
                    <div class="card">Our platform enables optimized issue reporting, allowing citizens to easily report problems related to cleanliness, lighting, safety, and accessibility.</div>
                  <div class="letters">O</div>
                </div>
                <div class="section">
                    <div class="letters">B</div>
                    <div class="card">By bridging the gap between citizens and authorities, we strive to create better infrastructure, making FOBs safer and more accessible for everyone.</div>
                </div>
            </div>
        </section>
    </main>

    <SuccessStory />

    <Report />

    <Footer />
    </>
  )
}

export default App
