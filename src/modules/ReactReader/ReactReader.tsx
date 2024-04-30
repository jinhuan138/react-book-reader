import React, { useState, useRef, useEffect } from "react";
import BookView from "../BookView/BookView.tsx";
import "./style.css";

let rendition = null;

const TocComponent: React.FC<any> = (props) => {
	const { toc = [], current = "", setLocation, isSubmenu = false } = props;
	return (
		<>
			{toc.map((item, index) => (
				<div key={index}>
					<button
						className={`tocAreaButton ${item.href === current ? "active" : ""}`}
						onClick={() => {
							if (item.subitems && item.subitems.length > 0) {
								item.expansion = !item.expansion;
								setLocation(item.href, false);
							} else {
								setLocation(item.href);
							}
						}}
					>
						{isSubmenu ? " ".repeat(4) + item.label : item.label}
						{
							// 展开
							item.subitems && item.subitems.length > 0 && (
								<div
									className={`expansion ${item.expansion ? "open" : ""}`}
								></div>
							)
						}
					</button>
					{
						//多级目录
						item.subitems && item.subitems.length > 0 && (
							<div v-show={item.expansion}>
								<TocComponent
									toc={item.subitems}
									current={current}
									setLocation={setLocation}
									isSubmenu={true}
								/>
							</div>
						)
					}
				</div>
			))}
		</>
	);
};

const ReactReader: React.FC<any> = (props) => {
	const { showToc = true, url, getRendition, ...attrs } = props;
	const bookRef = useRef(null);
	const [toc, setToc] = useState<any[]>([]);
	const [expandedToc, setExpandedToc] = useState<boolean>(false);
	const [bookName, setBookName] = useState<string>("");
	const [currentHref, setCurrentHref] = useState<string>("");
	const onGetRendition = (val) => {
		getRendition && getRendition(val);
		const { book } = val;
		rendition = val;
		const title = book.metadata?.title;
		setBookName(title || "");
	};

	const onTocChange = (_toc) => {
		setToc(_toc);
	};

	const pre = () => {
		bookRef.current!.nextPage();
	};
	const next = () => {
		bookRef.current!.nextPage();
	};
	const toggleToc = () => {
		setExpandedToc(!expandedToc);
	};

	const setLocation = (href: string, close = true) => {
		bookRef.current!.setLocation(href);
		setCurrentHref(href);
		setExpandedToc(!close);
	};
	return (
		<div className="container">
			<div className={`readerArea ${expandedToc ? "containerExpanded" : ""}`}>
				{/* 展开目录 */}
				{showToc && (
					<button
						className={`tocButton ${expandedToc ? "tocButtonExpanded" : ""}`}
						onClick={toggleToc}
					>
						<span className="tocButtonBar" style={{ top: "35%" }} />
						<span className="tocButtonBar" style={{ top: "66%" }} />
					</button>
				)}
				{/* 书名 */}
				<div className="titleArea" title={bookName}>
					{/* {slots.title ? slots.title?.() : title.value || bookName.value} */}
				</div>
				{/* 阅读区 */}
				<BookView
					ref={bookRef}
					url={url}
					onGetRendition={onGetRendition}
					tocChanged={onTocChange}
					{...attrs}
				></BookView>
				{/*  翻页 */}
				<button className="arrow pre" onClick={pre}>
					‹
				</button>
				<button className="arrow next" onClick={next}>
					›
				</button>
			</div>
			{/* 目录 */}
			{showToc && (
				<div>
					<div className="tocArea">
						<TocComponent
							toc={toc}
							current={currentHref}
							setLocation={setLocation}
						/>
					</div>
					{expandedToc && (
						//目录遮罩
						<div className="tocBackground" onClick={toggleToc}></div>
					)}
				</div>
			)}
		</div>
	);
};

export default ReactReader;
