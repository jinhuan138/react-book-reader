import React, {
	useState,
	useRef,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";
import '../utils/foliate-js/vendor/pdfjs/pdf.worker.js'
import '../utils/foliate-js/vendor/pdfjs/pdf.js'
import { getView } from "../utils/reader";
import {
	clickListener,
	swipListener,
	wheelListener,
	keyListener,
} from "../utils/listener/listener";
import './style.css'

const BookView: React.FC<any> = forwardRef((props, ref) => {
	const { url , getRendition, tocChanged } = props;
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const viewer = useRef<HTMLDivElement | null>(null);
	const [view, setView] = useState<any>(null);

	const getCSS = ({ spacing, justify, hyphenate }) => `
    @namespace epub "http://www.idpf.org/2007/ops";
    html {
        color-scheme: light dark;
    }
    /* https://github.com/whatwg/html/issues/5426 */
    @media (prefers-color-scheme: dark) {
        a:link {
            color: lightblue;
        }
    }
    p, li, blockquote, dd {
        line-height: ${spacing};
        text-align: ${justify ? "justify" : "start"};
        -webkit-hyphens: ${hyphenate ? "auto" : "manual"};
        hyphens: ${hyphenate ? "auto" : "manual"};
        -webkit-hyphenate-limit-before: 3;
        -webkit-hyphenate-limit-after: 2;
        -webkit-hyphenate-limit-lines: 2;
        hanging-punctuation: allow-end last;
        widows: 2;
    }
    /* prevent the above from overriding the align attribute */
    [align="left"] { text-align: left; }
    [align="right"] { text-align: right; }
    [align="center"] { text-align: center; }
    [align="justify"] { text-align: justify; }

    pre {
        white-space: pre-wrap !important;
    }
    aside[epub|type~="endnote"],
    aside[epub|type~="footnote"],
    aside[epub|type~="note"],
    aside[epub|type~="rearnote"] {
        display: none;
    }
`;

	const initBook = async () => {
		if (url) {
			view && view.close();
			if (typeof url === "string") {
				fetch(url)
					.then((res) => res.blob())
					.then(async (blob) => {
						const arr = url.split("/");
						const newView = await getView(
							new File([blob], arr[arr.length - 1]),
							viewer.current
						);
						setView(newView);
						initReader();
					})
					.catch((e) => console.error(e));
			} else {
				const newView = await getView(url, viewer.current);
				setView(newView);
				initReader();
			}
		}
	};

	const initReader = () => {
		if (!view) return;
		setIsLoaded(true);
		const { book } = view;
		view.renderer.setStyles?.(
			getCSS({
				spacing: 1.4,
				justify: true,
				hyphenate: true,
			})
		);
		registerEvents();
		getRendition && getRendition(view);
		tocChanged && tocChanged(book.toc);
		view.renderer.next();
	};

	const flipPage = (direction: string) => {
		if (direction === "next") nextPage();
		else if (direction === "prev") prevPage();
	};

	const registerEvents = () => {
		view.addEventListener("load", onLoad);
		view.addEventListener("relocate", onRelocate);
	};

	const onLoad = ({ detail: { doc } }) => {
		wheelListener(doc, flipPage);
		swipListener(doc, flipPage);
		keyListener(doc, flipPage);
	};

	const onRelocate = ({ detail }) => {};

	const nextPage = () => view?.next();

	const prevPage = () => view?.prev();

	const setLocation = (href: string | number) => view?.goTo(href);

	useImperativeHandle(ref, () => ({ prevPage, nextPage, setLocation }));

	useEffect(() => {
		initBook();
	}, []);

	useEffect(() => {
		view && initReader();
	}, [view]);

	return (
		<div className="reader">
			<div className="viewHolder">
				<div
					ref={viewer}
					id="viewer"
					style={{ display: isLoaded ? "" : "none" }}
				></div>
				{isLoaded && (
					<div>
						<slot name="loadingView"> </slot>
					</div>
				)}
			</div>
		</div>
	);
}, []);

export default BookView;
