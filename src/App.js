import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
     BrowserRouter as Router,
     Routes,
     Route,
     Link
} from "react-router-dom"
export default class App extends Component {
     state = {
          progress: 10
     }
     setProgress=(progress)=>{
          this.setState({progress: progress})
     }
     render() {

          return (

               <div>
                    <Router>
                         <LoadingBar
                              color='#f11946'
                              progress={this.state.progress}
                              height= {4}
                         />
                         <Navbar />

                         <Routes>
                              <Route exact path="/"
                                   element={<News setProgress = {this.setProgress} key="general" pageSize={6} country="in" category="general" />}
                              />

                              <Route exact path="/Business"
                                   element={<News setProgress = {this.setProgress}key="business" pageSize={6} country="in" category="business" />}
                              />

                              <Route exact path="/Entertainment"
                                   element={<News setProgress = {this.setProgress}key="entertainment" pageSize={6} country="in" category="entertainment" />}
                              />

                              <Route exact path="/Health"
                                   element={<News setProgress = {this.setProgress}key="health" pageSize={6} country="in" category="health" />}
                              />

                              <Route exact path="/Science"
                                   element={<News setProgress = {this.setProgress}key="science" pageSize={6} country="in" category="science" />}
                              />

                              <Route exact path="/Sports"
                                   element={<News setProgress = {this.setProgress}key="sports" pageSize={6} country="in" category="sports" />}
                              />

                              <Route exact path="/Technology"
                                   element={<News setProgress = {this.setProgress}key="technology" pageSize={6} country="in" category="technology" />}
                              />
                         </Routes>
                    </Router>
               </div>
          )
     }
}
