import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import StoryEditFields from '../StoryEditFields/StoryEditFields'
import TimerDisplay from '../TimerDisplay/TimerDisplay'
import './StoryEditView.css'

class StoryEditView extends Component {
  // This was written with the assumption that the prompt / last sentence of
  // previous story will be passed in as props
  constructor(props) {
    super(props)
    this.state = {}
  }

  updateText = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  disableStoryInput = () => {
    this.setState({ disabled: true })
  }

  render() {
    return (
      <main id="story-edit-container">
        <StoryEditFields updateText={ this.updateText } disabled={ this.state.disabled }/>
        <section id="story-edit-footer">
          <TimerDisplay disableStoryInput={this.disableStoryInput} />
          <Link to="/">
            <button type="button" id="post-button">
              Pass it on
            </button>
          </Link>
          {this.props.isPublishable && (
            <Link to="/">
              <button type="button" id="publish-button">
                Publish it
              </button>
            </Link>
          )}
        </section>
      </main>
    );
  }
}

export default StoryEditView;