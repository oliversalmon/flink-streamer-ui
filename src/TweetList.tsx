import React, { Component } from 'react';

interface Tweet {
    id_str : string;
    text : string;
}

interface RawTweet{

    raw: string;
}

interface TweetListProps {
}

interface TweetListState {
  tweets: Array<Tweet>;
  rawTweets: Array<RawTweet>;
  isLoading: boolean;
}

class TweetList extends Component<TweetListProps, TweetListState> {

  constructor(props: TweetListProps) {
    super(props);

    this.state = {
      tweets: [],
      rawTweets: [],
      isLoading: false
    };
  }

  async componentDidMount() {
      this.setState({isLoading: true});

//       const response = await fetch('http://localhost:3000/tweets');
//       const data = await response.json();
//       this.setState({tweets: data, isLoading: false});

      const eventSource = new EventSource('http://localhost:8082/sse/tweets');
      eventSource.onopen = (event: any) => console.log('open', event);
      eventSource.onmessage = (event: any) => {
        //console.log(event.data)
        //console.log(JSON.parse(event.data))
        const tweet = JSON.parse(event.data);
        console.log(tweet)
        this.state.rawTweets.push(tweet);

        this.setState({rawTweets: this.state.rawTweets});
       };
      eventSource.onerror = (event: any) => console.log('error', event);


    }

  render() {
    const {rawTweets, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (

      <div>
              <h2>raw tweets List</h2>
              {rawTweets.map((rawTweet: RawTweet) =>
                <div >
                  {rawTweet.raw}<br/>
                </div>
              )}
       </div>
    );
  }
}

export default TweetList;