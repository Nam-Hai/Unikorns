import './App.css'
import ActionButton from './ActionButton'
import { N } from './utils/namhai'
import React from 'react'

let scroll = {
  current: 0,
  target: 0,
  lerp: 0.05
}



class App extends React.Component {
  constructor(props) {
    super(props)

  }
  onScroll(e) {
    scroll.target += e.deltaY
    scroll.target = Math.min(Math.max(0, scroll.target), this.scrollBounds)
  }

  componentDidMount() {
    this.actionButton = N.get('.ActionButton')
    this.label = N.get('.label')
    this.scrollBounds = this.label.offsetWidth - window.innerWidth
    document.addEventListener('wheel', this.onScroll.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
    new N.RafR(this.update.bind(this)).run()
  }
  update() {
    scroll.current = N.Lerp(scroll.current, scroll.target, scroll.lerp)
    N.T(this.label, -scroll.current, 0, 'px')
  }

  onResize() {
    this.scrollBounds = this.label.offsetWidth - window.innerWidth
  }

  onMouseMove(e) {
    let angle = N.Lerp(-15, 15, e.clientX / window.innerWidth)
    this.actionButton.style.transform = 'rotate(' + angle + 'deg)'

  }

  render() {

    return (
      <div className='App' >
        <div className='label__container' onMouseMove={this.onMouseMove.bind(this)}>
          <div className='label'>
            Let’s work together
          </div>
          <ActionButton />
        </div>
      </div>
    )
  }
}

export default App
