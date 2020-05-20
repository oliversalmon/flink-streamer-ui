import React, { Component } from 'react';

interface Tweet {
    id_str : string;
    text : string;
}

interface TweetListProps {
}

interface TweetListState {
  tweets: Array<Tweet>;
  isLoading: boolean;
}

class TweetList extends Component<TweetListProps, TweetListState> {

  constructor(props: TweetListProps) {
    super(props);

    this.state = {
      tweets: [],
      isLoading: false
    };
  }

  async componentDidMount() {
      this.setState({isLoading: true});
      const response = await fetch('http://localhost:3000/tweets');
      const data = await response.json();
      this.setState({tweets: data, isLoading: false});

      const eventSource = new EventSource('http://localhost:8081/sse/tweets');
      eventSource.onopen = (event: any) => console.log('open', event);
      eventSource.onmessage = (event: any) => {
        const tweet = JSON.parse(event.data).source;
        this.state.tweets.push(tweet);
        this.setState({tweets: this.state.tweets});
      };
      eventSource.onerror = (event: any) => console.log('error', event);
    }

  render() {
    const {tweets, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>Tweet List</h2>
        {tweets.map((tweet: Tweet) =>
          <div key={tweet.id_str}>
            {tweet.text}<br/>
          </div>
        )}
      </div>
    );
  }
}

export default TweetList;