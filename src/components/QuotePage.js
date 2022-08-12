import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { AiFillCopy, AiFillTwitterSquare } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";

const QuotePage = () => {
	const [quotes, setQuotes] = useState("");

	const getQuote = async () => {
		const data = await fetch("https://type.fit/api/quotes");
		const details = await data.json();
		let randomNum = Math.floor(Math.random() * details.length);
		setQuotes(details[randomNum]);
	};

	useEffect(() => {
		getQuote();
	}, []);

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
				</QuoteSection>
				<Author>
					<p>—— {quotes.author}</p>
				</Author>

				<BottomPart>
					<Icons>
						<CopyToClipboard text={quotes.text}>
							<AiFillCopy />
						</CopyToClipboard>
						<a
							href={`https://twitter.com/intent/tweet?text=${quotes.text} — ${quotes.author}`}
							target='_blank'
							rel='nooperner noreferrer'
						>
							<AiFillTwitterSquare />
						</a>
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
	height: 30rem;
	background-color: white;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding: 0rem 5rem;
	h1 {
		display: flex;
		justify-content: center;
	}
	@media (max-width: 1210px) {
		width: 25rem;
		padding: 0rem 3rem;
		h1 {
			text-align: center;
		}
	}
`;
const QuoteSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 10vh;

	p {
		font-size: 18px;
		svg {
			margin: 10px;
			font-size: 12px;
		}
	}
`;
const Author = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -4rem;
	@media (max-width: 1210px) {
		margin-top: -3rem;
	}
`;
const BottomPart = styled.div`
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
	/* a {
		color: red;
	} */
`;
export default QuotePage;
