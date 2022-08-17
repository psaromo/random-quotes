import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { AiFillCopy, AiFillTwitterSquare } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import toast from "react-hot-toast";

const QuotePage = () => {
	//State
	const [quotes, setQuotes] = useState("");

	//Fetch quotes api
	const getQuote = async () => {
		const data = await fetch("https://type.fit/api/quotes");
		const details = await data.json();
		let randomNum = Math.floor(Math.random() * details.length);
		setQuotes(details[randomNum]);
	};

	//useEffect
	useEffect(() => {
		getQuote();
	}, []);

	//Toast
	const notify = () => {
		toast.success("Copied!", { duration: 1500 });
	};

	return (
		<Wrapper>
			<QuoteCard>
				<h1>Quote of the Day</h1>
				<QuoteSection>
					<p>
						<FaQuoteLeft />
						{quotes.text}
						<FaQuoteRight />
					</p>
					<Author>—— {quotes.author}</Author>
				</QuoteSection>

				<BottomPart>
					<Icons>
						<button
							onClick={() => {
								notify();
							}}
						>
							<CopyToClipboard text={quotes.text}>
								<AiFillCopy />
							</CopyToClipboard>
						</button>
						<button>
							<a
								href={`https://twitter.com/intent/tweet?text=${quotes.text} — ${quotes.author}`}
								target='_blank'
								rel='nooperner noreferrer'
							>
								<AiFillTwitterSquare />
							</a>
						</button>
					</Icons>

					<Button onClick={getQuote}>New Quote</Button>
				</BottomPart>
			</QuoteCard>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	min-height: 100vh;
	background: linear-gradient(#7ee8fa, #eec0c6);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const QuoteCard = styled.div`
	width: 40%;
	background-color: white;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding: 0rem 5rem;
	position: relative;
	h1 {
		display: flex;
		justify-content: center;
		padding: 1.5rem;
		min-height: 10vh;
		text-align: center;
	}

	/* MOBILE */
	@media (min-width: 300px) {
		width: 23rem;
		padding: 0rem 3rem;
	}
	/* TABLET */
	@media (min-width: 768px) {
		width: 45rem;
	}
`;

const QuoteSection = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 10vh;
	p {
		font-size: 18px;
		svg {
			margin: 10px;
			font-size: 12px;
		}
	}
`;

const Author = styled.span`
	display: flex;
	justify-content: flex-end;
	padding: 2rem 0;
`;

const BottomPart = styled.div`
	padding: 1.5rem 0;
	display: flex;
	justify-content: space-between;
`;

const Button = styled.button`
	cursor: pointer;
	color: white;
	border-radius: 50px;
	border: none;
	padding: 0.7rem 1rem;
	background-color: #7ee8fa;
	font-size: 1rem;
	:hover {
		background: #eec0c6;
	}
`;

const Icons = styled.div`
	svg {
		cursor: pointer;
		font-size: 2rem;
		color: #333333;
	}
	button {
		background: none;
		border: none;
	}
`;

export default QuotePage;
