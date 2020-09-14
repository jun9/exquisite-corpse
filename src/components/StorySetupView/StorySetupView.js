import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import StorySetup from '../StorySetup/StorySetup'
import ApiHelper from '../../ApiHelper/ApiHelper'
import './StorySetupView.css'

class StorySetupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      prompt: "",
      genre: "",
      submitOk: false,
      promptRequested: false,
      authorName: ""
    };
  }

  setGenre = (genre) => {
    this.setState({ genre: genre });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const genre = this.state.genre;
    let prompt;

    if (this.state.promptRequested) {
      try {
        prompt = await ApiHelper.getRandomPrompt(genre);
      } catch (error) {
        this.setState({ error: error.message });
      }
    }

    if (!this.props.error) {
      this.setState({
        genre: genre,
        prompt: prompt,
        submitOk: true
      });
    }
  };

  render() {
    if (this.state.submitOk) {
      return (
        <Redirect
          to={{
            pathname: "/story-edit",
            state: { prompt: this.state.prompt, genre: this.state.genre },
          }}
        />
      )
    }
    return (
      <section className="StorySetupView">
        {this.state.error && (
          <h2>
            I'm sorry, we could not retrieve a prompt. Error Status:{" "}
            {this.state.error}
          </h2>
        )}
        <StorySetup
          userName={"Bango Zango" /*this.props.username*/}
          setPrompt={this.setPrompt}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          genre={this.state.genre}
          promptRequested={this.state.promptRequested}
          prompt={this.state.prompt}
          error={this.state.error}
        />
      </section>
    );
  }
}

export default StorySetupView;