import './App.css'
import ActionButton from './ActionButton'
import { N } from './utils/namhai'
import React from 'react'

let scroll = {
  current: 0,
  target: 0,
  lerp: 0.05
}

let actionButtonCoord = {
  x: {
    current: 0,
    target: 0
  },
  y: {
    current: 0,
    target: 0
  }
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
    this.actionButtonWrapper = N.get('.ActionButton__wrapper')
    this.actionButton = N.get('.ActionButton')
    this.label = N.get('.label')
    this.scrollBounds = this.label.offsetWidth - window.innerWidth
    this.labelBounds = N.get('.label__container').getBoundingClientRect()
    document.addEventListener('wheel', this.onScroll.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
    new N.RafR(this.update.bind(this)).run()
  }
  update() {
    scroll.current = N.Lerp(scroll.current, scroll.target, scroll.lerp)
    N.T(this.label, -scroll.current, 0, 'px')
    actionButtonCoord.x.current = N.Lerp(actionButtonCoord.x.current, actionButtonCoord.x.target, 0.07)
    actionButtonCoord.y.current = N.Lerp(actionButtonCoord.y.current, actionButtonCoord.y.target, 0.07)
    N.T(this.actionButtonWrapper, actionButtonCoord.x.current, actionButtonCoord.y.current, 'px')
  }

  onResize() {
    this.scrollBounds = this.label.offsetWidth - window.innerWidth
  }

  onMouseMove(e) {
    let angle = N.Lerp(-15, 15, e.clientX / window.innerWidth)
    this.actionButton.style.transform = 'translate(-50%, -50%) rotate(' + angle + 'deg)'

    actionButtonCoord.x.target = e.clientX
    actionButtonCoord.y.target = e.clientY - this.labelBounds.y

    actionButtonCoord.y.target = Math.min(this.labelBounds.height, Math.max(0, actionButtonCoord.y.target))

  }

  render() {

    return (
      <div className='App' >
        <div className='label__container' onMouseMove={this.onMouseMove.bind(this)}>
          <div className='label'>
            Let’s work together
          </div>

          <div className='ActionButton__wrapper'>
            <ActionButton />
          </div>
        </div>
      </div>
    )
  }
}

export default App
