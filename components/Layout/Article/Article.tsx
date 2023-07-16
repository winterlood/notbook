import {
  ArticleWrapper,
  NavWrapper,
  StyledNotionRenderer,
} from "./Article.style";
import { useContext, useMemo } from "react";
import { Section } from "types/content";
import dynamic from "next/dynamic";
import { CodeBlock } from "../../../types/notion";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import NearPageButton from "./NearPageButton/index";
import EmptyArticle from "./EmptyArticle";
import { PageContext } from "../../../pages/[[...slug]]";
import PageAside from "./PageAside";

const Code = dynamic(() => import("./Code"), {
  loading: () => <>코드를 불러오는 중 입니다 ...</>,
  ssr: false,
});

// const Code = dynamic(() =>
//   import('react-notion-x/build/third-party/code').then(async (m) => {
//     // add / remove any prism syntaxes here
//     await Promise.allSettled([
//       import('prismjs/components/prism-markup-templating.js'),
//       import('prismjs/components/prism-markup.js'),
//       import('prismjs/components/prism-bash.js'),
//       import('prismjs/components/prism-c.js'),
//       import('prismjs/components/prism-cpp.js'),
//       import('prismjs/components/prism-csharp.js'),
//       import('prismjs/components/prism-docker.js'),
//       import('prismjs/components/prism-java.js'),
//       import('prismjs/components/prism-js-templates.js'),
//       import('prismjs/components/prism-coffeescript.js'),
//       import('prismjs/components/prism-diff.js'),
//       import('prismjs/components/prism-git.js'),
//       import('prismjs/components/prism-go.js'),
//       import('prismjs/components/prism-graphql.js'),
//       import('prismjs/components/prism-handlebars.js'),
//       import('prismjs/components/prism-less.js'),
//       import('prismjs/components/prism-makefile.js'),
//       import('prismjs/components/prism-markdown.js'),
//       import('prismjs/components/prism-objectivec.js'),
//       import('prismjs/components/prism-ocaml.js'),
//       import('prismjs/components/prism-python.js'),
//       import('prismjs/components/prism-reason.js'),
//       import('prismjs/components/prism-rust.js'),
//       import('prismjs/components/prism-sass.js'),
//       import('prismjs/components/prism-scss.js'),
//       import('prismjs/components/prism-solidity.js'),
//       import('prismjs/components/prism-sql.js'),
//       import('prismjs/components/prism-stylus.js'),
//       import('prismjs/components/prism-swift.js'),
//       import('prismjs/components/prism-wasm.js'),
//       import('prismjs/components/prism-yaml.js')
//     ])
//     return m.Code
//   })
// )

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => {
      m.Modal.setAppElement('.notion-viewport')
      return m.Modal
    }),
  {
    ssr: false
  }
)

function getNearChapters(pageID: string, currentSection: Section) {
  const curChapterIdx = currentSection.chapters.findIndex(
    (chapter) => chapter.id === pageID
  );
  if (curChapterIdx === -1) {
    return {
      prevChapter: undefined,
      nextChapter: undefined,
    };
  }
  return {
    prevChapter:
      curChapterIdx !== 0
        ? currentSection.chapters.at(curChapterIdx - 1)
        : undefined,
    nextChapter:
      curChapterIdx !== currentSection.chapters.length - 1
        ? currentSection.chapters.at(curChapterIdx + 1)
        : undefined,
  };
}

export default function Article() {
  const router = useRouter();

  const { pageID, recordMap, currentSection } = useContext(PageContext);

  const components = useMemo(
    () => ({
      Code,
      Collection,
      Equation,
      Pdf,
      Modal,
    }),
    []
  )

  const { prevChapter, nextChapter } = useMemo(() => {
    if (!currentSection) {
      return {
        prevChapter: undefined,
        nextChapter: undefined,
      };
    }
    return getNearChapters(pageID, currentSection);
  }, [currentSection]);

  return (
    <ArticleWrapper>
      {recordMap ? (
        <StyledNotionRenderer
          pageAside={<PageAside />}
          darkMode={true}
          disableHeader={true}
          fullPage={true}
          showCollectionViewDropdown={true}
          showTableOfContents={true}
          recordMap={recordMap}
          components={components}
        />
      ) : router.isFallback ? (
        <CircularProgress />
      ) : (
        <EmptyArticle />
      )}
      <NavWrapper>
        {prevChapter && <NearPageButton type={"PREV"} {...prevChapter} />}
        {nextChapter && <NearPageButton type={"NEXT"} {...nextChapter} />}
      </NavWrapper>
    </ArticleWrapper>
  );
}
