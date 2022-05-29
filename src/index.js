import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";

const quoteArray = [];

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: "#1a1c20",
		};
		this.handleChangeColor = this.handleChangeColor.bind(this);
	}

	handleChangeColor(color) {
		this.setState({
			color: color,
		});
	}
	render() {
		return (
			<div id={"container"} style={{ backgroundColor: this.state.color }}>
				<QuoteBox
					color={this.state.color}
					onAppChangeColor={this.handleChangeColor}
				/>
			</div>
		);
	}
}

class QuoteBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quoteText: "",
			quoteAuthor: "",
			tweetUrl: "",
			color: this.props.color,
		};
		this.getNewQuote();

		this.getNewQuote = this.getNewQuote.bind(this);
		this.handleNewQuote = this.handleNewQuote.bind(this);
	}
	getNewQuote() {
		fetch("https://type.fit/api/quotes")
			.then((response) => response.json())
			.then((data) => {
				quoteArray.push(...data);
				const randIndex = Math.floor(Math.random() * quoteArray.length);
				this.setState({
					quoteText: quoteArray[randIndex].text,
					quoteAuthor: quoteArray[randIndex].author,
					tweetUrl:
						"https://twitter.com/intent/tweet/?text=" +
						quoteArray[randIndex].text.replace(/ /g, "+") +
						"%0a" +
						"- " +
						quoteArray[randIndex].author,
				});
			});
	}

	handleNewQuote() {
		const colorArray = [
			"#2d5064",
			"#2c2f3a",
			"#ea6c51",
			"#ab7e6a",
			"#f39233",
			"#776d8a",
			"#335d2d",
			"#af2d2d",
		];
		const randIndex = Math.floor(Math.random() * quoteArray.length);
		const randIndexColor = Math.floor(Math.random() * colorArray.length);
		let color = colorArray[randIndexColor];
		while (color === this.state.color) {
			const randIndexColor = Math.floor(Math.random() * colorArray.length);
			color = colorArray[randIndexColor];
		}
		this.setState({
			quoteText: quoteArray[randIndex].text,
			quoteAuthor: quoteArray[randIndex].author,
			tweetUrl:
				"https://twitter.com/intent/tweet/?text=" +
				quoteArray[randIndex].text.replace(/ /g, "+") +
				"%0a" +
				"- " +
				quoteArray[randIndex].author,
			color: color,
		});
		this.props.onAppChangeColor(color);
	}

	render() {
		return (
			<div id={"quote-box"}>
				<div id={"content"} style={{ color: this.state.color }}>
					<p id={"text"}>
						<i className="fas fa-quote-left" />
						{this.state.quoteText}
					</p>
					<p id={"author"}>{this.state.quoteAuthor}</p>
				</div>
				<div id={"footer"}>
					<div>
						<a
							href={this.state.tweetUrl}
							target="_blank"
							rel="noreferrer"
							id={"tweet-quote"}
						>
							<i
								className="fab fa-twitter-square"
								style={{ color: this.state.color }}
							/>
						</a>
						<a href="#tumblr-quote" id={"tumblr-quote"}>
							<i
								className="fab fa-tumblr-square"
								style={{ color: this.state.color }}
							/>
						</a>
					</div>
					<div>
						<button
							id={"new-quote"}
							onClick={this.handleNewQuote}
							style={{ backgroundColor: this.state.color }}
						>
							new quote{" "}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
