import Image from "next/image";
import { PageAsideWrapper } from "./PageAside.style";
import thumbnail from "public/thumbnail.png";
import Link from "next/link";
import config from "config/config.json";

export default function PageAside() {
  const homePageID = process.env.NOTION_HOMEPAGE_ID as string;

  return (
    <PageAsideWrapper>
      {/* 여기에 배너를 넣으면 됩니다 */}
      <Link href={`/${homePageID}`}>
        {/* <Image alt={"thumb"} src={thumbnail} width={220} /> */}
      </Link>
    </PageAsideWrapper>
  );
}
