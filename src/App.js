import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="container min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <Body />
      </div>
      <Footer />
    </div>
  )
}

export default App
